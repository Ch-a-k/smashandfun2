import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN,
    telegram_chat_id: process.env.TELEGRAM_CHAT_ID,
    has_bot_token: !!process.env.TELEGRAM_BOT_TOKEN,
    has_chat_id: !!process.env.TELEGRAM_CHAT_ID,
    node_env: process.env.NODE_ENV,
    current_time: new Date().toISOString()
  });
} 