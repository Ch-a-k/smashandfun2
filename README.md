This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# smashandfun2

## Локализация / Localization

Проект поддерживает многоязычность (Polish / English) с использованием i18n. Все тексты должны быть добавлены в файлы локализации:

- `src/i18n/locales/pl.ts` - для польского языка
- `src/i18n/locales/en.ts` - для английского языка

Для доступа к переводам в компонентах используйте хук `useTranslations()`.

## Изображения / Images

### Декоративные элементы / Decorative elements
- `1.png`, `2o.png`, `3o.png`, `4o.png`, `5o.png`, `6o.png` - стеклянные осколки для анимированных элементов
- `glass-shard-1.png` - `glass-shard-6.png` - альтернативные версии стеклянных осколков
- `noise.png` - текстура шума для фона

### Иконки и логотипы / Icons and logos
- `logo.png` - логотип компании
- `partner1.png`, `partner2.png` - логотипы партнеров

### Основные изображения / Main images
- `corporate.png` - изображение для корпоративных клиентов (Team Building)
- `party.png` - изображение для корпоративных мероприятий
- `smile.png` - изображение для интеграционных мероприятий
- `kids.png` - изображение для детских мероприятий
- `heart.png` - изображение для мероприятий для пар
- `round.png` - круглое декоративное изображение
- `voucher.png` - изображение для подарочных сертификатов

### Навигационные элементы / Navigation elements
- `down.png` - стрелка вниз
- `turn-left.png`, `turn-right.png` - стрелки поворота
