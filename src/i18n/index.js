import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import pl from './locales/pl.json';

export const LANGUAGE_STORAGE_KEY = 'devmike_lang';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
    // pl-PL z przeglądarki ma trafiać w 'pl'
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
    interpolation: {
      // React sam escapuje wartości
      escapeValue: false,
    },
  });

// Meta + atrybut lang podążają za językiem (guard: testy działają w node)
const applyDocumentLanguage = (lng) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lng;
  document.title = i18n.t('meta.title');
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', i18n.t('meta.description'));
  }
};

i18n.on('languageChanged', applyDocumentLanguage);
applyDocumentLanguage(i18n.resolvedLanguage);

export default i18n;
