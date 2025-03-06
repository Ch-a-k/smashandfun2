import { NextResponse } from 'next/server';

// Получаем переменные напрямую из переменных окружения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
  // Проверяем наличие переменных окружения
  console.log('Проверка переменных окружения:', {
    hasBotToken: !!TELEGRAM_BOT_TOKEN,
    hasChatId: !!TELEGRAM_CHAT_ID,
  });

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Отсутствуют переменные окружения для Telegram API');
    return NextResponse.json(
      { error: 'Configuration error: Missing environment variables for Telegram API' },
      { status: 500 }
    );
  }

  try {
    const data = await req.json();
    const { name, phone, email, subject, message } = data;

    console.log('Получены данные формы:', {
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
    console.log('Отправка запроса к Telegram API');
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
      // Добавляем таймаут и другие опции для надежности
      cache: 'no-store',
    });

    // Проверяем ответ в виде текста, прежде чем пытаться преобразовать его в JSON
    const responseText = await response.text();
    console.log('Ответ от Telegram API (text):', responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Ответ Telegram API (JSON):', responseData);
    } catch (jsonError) {
      console.error('Ошибка преобразования ответа в JSON:', jsonError);
      responseData = { text: responseText };
    }

    if (!response.ok) {
      const errorMessage = `Failed to send message: ${response.status} ${response.statusText}`;
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
    
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    );
  }
}
