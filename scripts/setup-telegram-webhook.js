/**
 * Утилита для настройки вебхука Telegram
 * 
 * Запуск: node scripts/setup-telegram-webhook.js [команда]
 * 
 * Команды:
 *  - set: Установить вебхук (по умолчанию)
 *  - get: Получить информацию о текущем вебхуке
 *  - delete: Удалить вебхук
 * 
 * Пример: node scripts/setup-telegram-webhook.js set
 */

// Загружаем переменные окружения из .env.local
import 'dotenv/config';
import fetch from 'node-fetch';
import readline from 'readline';

// Получаем токен бота из переменных окружения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Проверяем наличие токена
if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ Ошибка: TELEGRAM_BOT_TOKEN не найден в .env.local');
  console.log('Создайте файл .env.local и добавьте TELEGRAM_BOT_TOKEN=ваш_токен');
  process.exit(1);
}

// Создаем интерфейс для чтения ввода пользователя
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Получаем команду из аргументов командной строки
const command = process.argv[2] || 'set';

// Основные URL для работы с API Telegram
const getWebhookInfoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`;
const deleteWebhookUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook`;

/**
 * Получает информацию о текущем вебхуке
 */
async function getWebhookInfo() {
  try {
    console.log('🔍 Получение информации о текущем вебхуке...');
    const response = await fetch(getWebhookInfoUrl);
    const data = await response.json();
    
    if (data.ok) {
      console.log('\n📋 Информация о вебхуке:');
      console.log(JSON.stringify(data.result, null, 2));
      
      if (data.result.url) {
        console.log(`\n✅ Вебхук активен: ${data.result.url}`);
      } else {
        console.log('\n⚠️ Вебхук не установлен');
      }
    } else {
      console.error('❌ Ошибка получения информации:', data.description);
    }
  } catch (error) {
    console.error('❌ Ошибка запроса:', error);
  }
}

/**
 * Удаляет текущий вебхук
 */
async function deleteWebhook() {
  try {
    console.log('🗑️ Удаление вебхука...');
    const response = await fetch(deleteWebhookUrl);
    const data = await response.json();
    
    if (data.ok) {
      console.log('✅ Вебхук успешно удален');
    } else {
      console.error('❌ Ошибка удаления вебхука:', data.description);
    }
  } catch (error) {
    console.error('❌ Ошибка запроса:', error);
  }
}

/**
 * Устанавливает новый вебхук
 */
async function setWebhook(url) {
  try {
    // Формируем URL для установки вебхука
    const setWebhookUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${encodeURIComponent(url)}`;
    console.log(`🔧 Установка вебхука для URL: ${url}`);
    
    const response = await fetch(setWebhookUrl);
    const data = await response.json();
    
    if (data.ok) {
      console.log('✅ Вебхук успешно установлен');
      console.log('\nℹ️ Для проверки отправьте боту сообщение в Telegram');
    } else {
      console.error('❌ Ошибка установки вебхука:', data.description);
    }
  } catch (error) {
    console.error('❌ Ошибка запроса:', error);
  }
}

// Запускаем нужную команду
switch (command.toLowerCase()) {
  case 'get':
    getWebhookInfo().finally(() => rl.close());
    break;
    
  case 'delete':
    deleteWebhook().finally(() => rl.close());
    break;
    
  case 'set':
  default:
    // Запрашиваем URL для вебхука
    rl.question('Введите URL для вебхука (например, https://smashandfun.vercel.app/api/telegram-webhook): ', (webhookUrl) => {
      if (!webhookUrl) {
        console.error('❌ URL не может быть пустым');
        rl.close();
        return;
      }
      
      if (!webhookUrl.startsWith('https://')) {
        console.error('❌ URL должен начинаться с https://');
        rl.close();
        return;
      }
      
      if (!webhookUrl.includes('/api/telegram-webhook')) {
        console.warn('⚠️ URL должен заканчиваться на /api/telegram-webhook');
        rl.question('Продолжить с текущим URL? (y/n): ', (answer) => {
          if (answer.toLowerCase() === 'y') {
            setWebhook(webhookUrl).finally(() => rl.close());
          } else {
            console.log('❌ Операция отменена');
            rl.close();
          }
        });
      } else {
        setWebhook(webhookUrl).finally(() => rl.close());
      }
    });
    break;
} 