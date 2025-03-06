/**
 * Скрипт для тестирования вебхука Telegram
 * Эмулирует запрос от Telegram для проверки обработки вебхука
 * 
 * Запуск: node scripts/test-telegram-webhook.js
 */

// Загружаем переменные окружения из .env.local
import 'dotenv/config';
import fetch from 'node-fetch';

// URL вашего локального или развернутого API
const API_URL = process.env.WEBHOOK_TEST_URL || 'http://localhost:3000/api/telegram-webhook';

// Пример данных обновления от Telegram
const mockUpdate = {
  update_id: 123456789,
  message: {
    message_id: 123,
    from: {
      id: 987654321,
      is_bot: false,
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser',
      language_code: 'ru'
    },
    chat: {
      id: 987654321, // Это будет имитировать ID чата пользователя
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser',
      type: 'private'
    },
    date: Math.floor(Date.now() / 1000),
    text: '/start', // Тестируем команду /start
  }
};

async function testWebhook() {
  console.log(`🚀 Тестирование вебхука по адресу: ${API_URL}`);
  console.log(`📨 Отправка тестового обновления: ${JSON.stringify(mockUpdate, null, 2)}`);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockUpdate),
    });

    const data = await response.json();
    
    console.log(`📥 Статус ответа: ${response.status}`);
    console.log(`📄 Тело ответа:`, data);
    
    if (response.ok) {
      console.log('✅ Тест успешно завершен!');
    } else {
      console.log('❌ Тест не прошел - сервер вернул ошибку');
    }
  } catch (error) {
    console.error('❌ Ошибка при выполнении запроса:', error);
  }
}

testWebhook();

// Тест с другими типами сообщений (раскомментируйте, чтобы протестировать)
/*
setTimeout(() => {
  mockUpdate.message.text = 'Привет, бот!';
  testWebhook();
}, 3000);

setTimeout(() => {
  mockUpdate.message.text = '/help';
  testWebhook();
}, 6000);

setTimeout(() => {
  mockUpdate.message.text = '/info';
  testWebhook();
}, 9000);
*/ 