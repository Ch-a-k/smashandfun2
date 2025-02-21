"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { pl } from './locales/pl';
import { en } from './locales/en';
import { Translations } from './types';

type Locale = 'pl' | 'en';

interface I18nContextType {
  locale: Locale;
  translations: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Locale, Translations> = {
  pl,
  en,
};

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pl';

  // Check localStorage
  const savedLocale = localStorage.getItem('locale') as Locale;
  if (savedLocale && ['pl', 'en'].includes(savedLocale)) {
    return savedLocale;
  }

  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('pl')) {
    return 'pl';
  }
  if (browserLang.startsWith('en')) {
    return 'en';
  }

  // Default to Polish
  return 'pl';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pl'); // Default to pl initially

  useEffect(() => {
    // Set the initial locale after mounting
    setLocaleState(getInitialLocale());
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale; // Update HTML lang attribute
  }, []);

  return (
    <I18nContext.Provider
      value={{
        locale,
        translations: translations[locale],
        setLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
