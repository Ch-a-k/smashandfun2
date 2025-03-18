import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Схема валидации для общей контактной формы
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().optional(),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
  subject: z.string().optional(),
});

// Расширенная схема для B2B запросов
const b2bFormSchema = contactFormSchema.extend({
  service: z.string().min(2, { message: 'Service is required' }),
  people: z.string().min(1, { message: 'Number of people is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
});

// Настройка транспорта для nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // Не требовать валидный сертификат
    rejectUnauthorized: false
  }
});

// Проверяем подключение при запуске сервера
transporter.verify()
  .then(() => {
    // SMTP сервер готов к отправке сообщений
  })
  .catch(() => {
    // Ошибка верификации SMTP
  });

export async function POST(request: Request) {
  try {
    // Получаем данные формы
    const data = await request.json();
    
    // Определяем, какая это форма - B2B или обычная
    const isB2BForm = data.service !== undefined;
    
    // Проверка captcha (если включена)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      // Код для проверки recaptcha
    }
    
    // Проверяем данные по схеме
    try {
      if (isB2BForm) {
        b2bFormSchema.parse(data);
      } else {
        contactFormSchema.parse(data);
      }
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Validation failed', 
        errors: error
      }, { status: 400 });
    }
    
    // Формируем тему письма
    const emailSubject = data.subject || (isB2BForm 
      ? `B2B Request from ${data.name}`
      : `Contact form message from ${data.name}`);
    
    // Формируем содержимое письма с красивым HTML-шаблоном
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
          }
          .header {
            background-color: #f36e21;
            color: white;
            padding: 15px;
            border-radius: 5px 5px 0 0;
            margin: -20px -20px 20px;
          }
          .logo {
            text-align: center;
            margin-bottom: 15px;
          }
          .section {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .section:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .footer {
            font-size: 12px;
            color: #777;
            margin-top: 30px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">${isB2BForm ? 'B2B Request' : 'Contact Form Message'}</h2>
          </div>
          
          <div class="section">
            <p><span class="label">Name:</span> ${data.name}</p>
            <p><span class="label">Email:</span> ${data.email}</p>
            ${data.phone ? `<p><span class="label">Phone:</span> ${data.phone}</p>` : ''}
          </div>
          
          ${isB2BForm ? `
          <div class="section">
            <p><span class="label">Service:</span> ${data.service}</p>
            <p><span class="label">Number of people:</span> ${data.people}</p>
            <p><span class="label">Date:</span> ${data.date}</p>
          </div>
          ` : ''}
          
          <div class="section">
            <p class="label">Message:</p>
            <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
          </div>
          
          <div class="footer">
            <p>This email was sent from Smash&Fun website contact form.</p>
            <p>© ${new Date().getFullYear()} Smash&Fun. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Отправляем письмо
    await transporter.sendMail({
      from: {
        name: 'Smash&Fun Contact',
        address: process.env.EMAIL_FROM || ''
      },
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC || undefined,
      subject: emailSubject,
      html: emailContent,
      replyTo: data.email,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
    
  } catch {
    // Ошибка отправки email
    return NextResponse.json(
      { message: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.' },
      { status: 500 }
    );
  }
} 