import './globals.css'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import CookieConsent from '@/components/CookieConsent'
import { I18nProvider } from '@/i18n/I18nContext'
import { Inter } from 'next/font/google'

// Load custom fonts
const impact = localFont({
  src: '../../public/fonts/impact.ttf',
  variable: '--font-impact',
  display: 'swap',
})

const akrobat = localFont({
  src: '../../public/fonts/Akrobat-Regular.otf',
  variable: '--font-akrobat',
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smash&Fun - Rage Room #1 in Warsaw',
  description: 'Release stress and emotions in the most exciting way! Visit our rage room in Warsaw.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    alternateLocale: 'en_US',
    url: 'https://smashandfun.pl',
    title: 'Smash&Fun - Rage Room #1 in Warsaw',
    description: 'Release stress and emotions in the most exciting way! Visit our rage room in Warsaw.',
    siteName: 'Smash&Fun',
    images: [
      {
        url: '/og/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smash&Fun - Rage Room',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smash&Fun - Rage Room #1 in Warsaw',
    description: 'Release stress and emotions in the most exciting way! Visit our rage room in Warsaw.',
    images: ['/og/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${impact.variable} ${akrobat.variable} ${inter.className}`}>
      <body className="bg-[#231f20]">
        <I18nProvider>
          {children}
          <CookieConsent />
        </I18nProvider>
      </body>
    </html>
  )
}
