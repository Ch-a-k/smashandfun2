import { NextResponse } from 'next/server';

// Получаем переменные напрямую из переменных окружения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Добавим таймаут для fetch
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 8000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export async function POST(req: Request) {
  // Проверяем наличие переменных окружения
  console.log('Sprawdzanie zmiennych środowiskowych:', {
    hasBotToken: !!TELEGRAM_BOT_TOKEN,
    hasChatId: !!TELEGRAM_CHAT_ID,
  });

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Brak zmiennych środowiskowych dla Telegram API');
    return NextResponse.json(
      { error: 'Błąd konfiguracji: Brak wymaganych zmiennych środowiskowych' },
      { status: 500 }
    );
  }

  try {
    // Проверяем, что запрос содержит JSON
    let data;
    try {
      data = await req.json();
    } catch (parseError) {
      console.error('Błąd podczas analizy JSON z żądania:', parseError);
      return NextResponse.json(
        { error: 'Nieprawidłowe dane wejściowe: oczekiwano formatu JSON' },
        { status: 400 }
      );
    }
    
    // Валидация данных формы
    const { name, phone, email, subject, message } = data;
    
    if (!name || !email || !subject || !message) {
      console.error('Niepełne dane formularza:', { name, email, subject });
      return NextResponse.json(
        { error: 'Brak wymaganych pól' },
        { status: 400 }
      );
    }

    console.log('Otrzymane dane formularza:', {
      name,
      email,
      subject,
    });

    const text = `
📨 Nowa wiadomość ze strony:

👤 Imię i nazwisko: ${name}
📱 Telefon: ${phone || 'Nie podano'}
📧 Email: ${email}
📝 Temat: ${subject}

💬 Wiadomość:
${message}
    `;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    // Добавляем больше информации об отправке запроса
    console.log('Wysyłanie żądania do Telegram API');
    
    // Используем fetchWithTimeout вместо обычного fetch
    try {
      const response = await fetchWithTimeout(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
        cache: 'no-store',
      }, 8000);
      
      // Проверяем ответ в виде текста, прежде чем пытаться преобразовать его в JSON
      const responseText = await response.text();
      console.log('Odpowiedź od Telegram API (text):', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Odpowiedź Telegram API (JSON):', responseData);
      } catch (jsonError) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', jsonError);
        responseData = { text: responseText };
      }

      if (!response.ok) {
        const errorMessage = `Nie udało się wysłać wiadomości: ${response.status} ${response.statusText}`;
        console.error(errorMessage, responseData);
        
        return NextResponse.json(
          { 
            error: errorMessage,
            details: responseData
          },
          { status: response.status }
        );
      }

      return NextResponse.json({ 
        success: true,
        message: 'Wiadomość została wysłana pomyślnie!' 
      });
    } catch (fetchError) {
      console.error('Błąd podczas komunikacji z Telegram API:', fetchError);
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      
      // Проверяем, было ли превышение времени ожидания
      if (errorMessage.includes('abort')) {
        return NextResponse.json(
          { error: 'Przekroczono limit czasu żądania - API Telegram nie odpowiada' },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Błąd wysyłania wiadomości', 
          details: errorMessage 
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Błąd wysyłania wiadomości:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Nie udało się wysłać wiadomości' },
      { status: 500 }
    );
  }
}
