import { ui as es } from './es';
import { ui as en } from './en';
import type { Locale } from './config';

const translations = { es, en } as const;

export function useTranslations(locale: Locale | string | undefined) {
  const lang: Locale = locale === 'en' ? 'en' : 'es';
  return translations[lang];
}
