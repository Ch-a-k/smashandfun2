'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'XXXXXXXX';

interface ClarityFunction {
  (method: string, ...args: unknown[]): void;
  q?: unknown[];
}

interface CustomWindow extends Window {
  dataLayer?: unknown[];
  clarity?: ClarityFunction;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends CustomWindow {}
}

export default function GoogleTagManager() {
  useEffect(() => {
    // Отладочная информация
    if (typeof window !== 'undefined') {
      // Выводим текущие значения для отладки
      const debugInfo = {
        environment: process.env.NODE_ENV,
        gtmId: GTM_ID,
        clarityId: CLARITY_ID,
        hasDataLayer: typeof window.dataLayer !== 'undefined',
      };
      
      console.log('GTM Debug Info:', debugInfo);
    }

    // Инициализация только в production или если есть ID
    if (process.env.NODE_ENV === 'production' || (GTM_ID !== 'GTM-XXXXXXX')) {
      // GTM initialization
      const w = window as CustomWindow;
      w.dataLayer = w.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        w.dataLayer?.push(args);
      };
      gtag('js', new Date());
      gtag('config', GTM_ID);
      
      // Отправляем тестовое событие для проверки
      gtag('event', 'gtm_test_event', {
        'event_category': 'testing',
        'event_label': 'GTM Test',
      });

      // Clarity initialization только если указан ID
      if (CLARITY_ID !== 'XXXXXXXX') {
        (function(w: CustomWindow, d: Document) {
          w.clarity = w.clarity || function(...args: unknown[]) {
            const q = w.clarity?.q || [];
            q.push(args);
            if (w.clarity) w.clarity.q = q;
          };
          const scriptElement = d.createElement('script');
          scriptElement.async = true;
          scriptElement.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
          const firstScript = d.getElementsByTagName('script')[0];
          firstScript?.parentNode?.insertBefore(scriptElement, firstScript);
        })(window as CustomWindow, document);
      }
    }
  }, []);

  if (process.env.NODE_ENV !== 'production' && (GTM_ID === 'GTM-XXXXXXX')) {
    console.log('GTM not initialized: missing ID or dev environment');
    return null;
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
        onLoad={() => {
          console.log('GTM script loaded successfully');
        }}
        onError={() => {
          console.error('Failed to load GTM script');
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
} 