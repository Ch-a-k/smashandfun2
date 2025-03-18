#!/bin/bash

# Скрипт для тестирования API контактной формы
# Запустите скрипт командой: bash test-contact-api.sh

# Обычная контактная форма
echo "Testing regular contact form..."
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123456789",
    "message": "This is a test message from the regular contact form."
  }'

echo -e "\n\n"

# B2B контактная форма
echo "Testing B2B contact form..."
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "B2B Test User",
    "email": "b2b@example.com",
    "phone": "123456789",
    "message": "This is a test message from the B2B form.",
    "service": "Corporate Event",
    "people": "50",
    "date": "2025-04-15",
    "subject": "B2B Request"
  }'

echo -e "\n" 