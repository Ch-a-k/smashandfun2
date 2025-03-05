import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Функция для чтения переменных из файла .env.local, если системные не работают
function getEnvVariables() {
  try {
    // Сначала проверяем системные переменные
    let botToken = process.env.TELEGRAM_BOT_TOKEN;
    let chatId = process.env.TELEGRAM_CHAT_ID;

    // Если системные переменные содержат placeholder или не определены, 
    // попробуем прочитать из .env.local напрямую
    if (!botToken || botToken.includes('your_bot_token_here') || !chatId) {
      console.log('Системные переменные не найдены, читаем из файла .env.local');
      
      // Путь к файлу .env.local
      const envPath = path.resolve(process.cwd(), '.env.local');
      
      // Проверяем, существует ли файл
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const envLines = envContent.split('\n');
        
        // Ищем переменные в файле
        envLines.forEach(line => {
          if (line.startsWith('TELEGRAM_BOT_TOKEN=')) {
            botToken = line.split('=')[1].trim();
          }
          if (line.startsWith('TELEGRAM_CHAT_ID=')) {
            chatId = line.split('=')[1].trim();
          }
        });
        
        console.log('Прочитаны переменные из .env.local:', { 
          hasToken: !!botToken, 
          hasId: !!chatId 
        });
      } else {
        console.error('Файл .env.local не найден');
      }
    }
    
    return { botToken, chatId };
  } catch (error) {
    console.error('Ошибка при чтении переменных окружения:', error);
    return { 
      botToken: process.env.TELEGRAM_BOT_TOKEN, 
      chatId: process.env.TELEGRAM_CHAT_ID 
    };
  }
}

// Получаем переменные
const { botToken: TELEGRAM_BOT_TOKEN, chatId: TELEGRAM_CHAT_ID } = getEnvVariables();

export async function POST(req: Request) {
  // Более детальный лог переменных окружения для отладки
  console.log('Полная проверка переменных окружения:', {
    rawBotToken: TELEGRAM_BOT_TOKEN,
    rawChatId: TELEGRAM_CHAT_ID,
    hasBotToken: typeof TELEGRAM_BOT_TOKEN === 'string' && TELEGRAM_BOT_TOKEN.length > 0,
    hasChatId: typeof TELEGRAM_CHAT_ID === 'string' && TELEGRAM_CHAT_ID.length > 0,
    botTokenLength: TELEGRAM_BOT_TOKEN?.length,
    chatIdLength: TELEGRAM_CHAT_ID?.length,
    botTokenFirstChars: TELEGRAM_BOT_TOKEN?.substring(0, 3),
    isPlaceholder: TELEGRAM_BOT_TOKEN?.includes('your_bot_token_here')
  });

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Отсутствуют переменные окружения:', {
      hasBotToken: !!TELEGRAM_BOT_TOKEN,
      hasChatId: !!TELEGRAM_CHAT_ID
    });
    return NextResponse.json(
      { error: 'Configuration error: Missing environment variables' },
      { status: 500 }
    );
  }

  try {
    const data = await req.json();
    const { name, phone, email, subject, message } = data;

    console.log('Отправка сообщения в Telegram:', {
      name,
      phone,
      email,
      subject,
      messageLength: message?.length
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
    console.log('URL Telegram API (проверьте токен):', telegramUrl);

    try {
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
      });

      const responseData = await response.json();
      console.log('Ответ Telegram API:', responseData);

      if (!response.ok) {
        console.error('Детали ошибки API:', {
          status: response.status,
          statusText: response.statusText,
          responseData
        });
        throw new Error(`Failed to send message: ${response.status} ${response.statusText} - ${JSON.stringify(responseData)}`);
      }

      return NextResponse.json({ 
        success: true,
        message: 'Wiadomość została wysłana pomyślnie!'
      });
    } catch (fetchError) {
      console.error('Ошибка при запросе к Telegram API:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    );
  }
}
