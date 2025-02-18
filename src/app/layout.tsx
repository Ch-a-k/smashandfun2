import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import CookieConsent from '@/components/CookieConsent'
import { I18nProvider } from '@/i18n/I18nContext'

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

export const metadata: Metadata = {
  title: 'Smash&Fun',
  description: 'Wyjątkowe miejsce na mapie Warszawy, gdzie możesz uwolnić swoje emocje i świetnie się bawić!',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${impact.variable} ${akrobat.variable}`}>
      <body className="bg-[#231f20]">
        <I18nProvider>
          {children}
          <CookieConsent />
        </I18nProvider>
      </body>
    </html>
  )
}
