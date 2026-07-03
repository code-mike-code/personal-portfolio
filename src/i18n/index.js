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

const setMeta = (selector, content) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
};

// Ten sam build serwowany z codemike.pl i codemike.eu — canonical i og:url
// muszą wskazywać domenę, z której strona jest faktycznie otwarta
const applyCanonicalDomain = () => {
  if (typeof window === 'undefined') return;
  const { hostname, pathname } = window.location;
  if (!/(^|\.)codemike\.(pl|eu)$/.test(hostname)) return;
  const origin = `https://${hostname.replace(/^www\./, '')}`;
  const url = `${origin}${pathname === '/' ? '/' : pathname}`;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[name="twitter:url"]', url);
  setMeta('meta[property="og:image"]', `${origin}/og-image.png`);
  setMeta('meta[name="twitter:image"]', `${origin}/og-image.png`);
};

// Meta + atrybut lang podążają za językiem (guard: testy działają w node)
const applyDocumentLanguage = (lng) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lng;
  document.title = i18n.t('meta.title');
  setMeta('meta[name="description"]', i18n.t('meta.description'));
  setMeta('meta[name="keywords"]', i18n.t('meta.keywords'));
  setMeta('meta[property="og:title"]', i18n.t('meta.title'));
  setMeta('meta[property="og:description"]', i18n.t('meta.description'));
  setMeta('meta[name="twitter:title"]', i18n.t('meta.title'));
  setMeta('meta[name="twitter:description"]', i18n.t('meta.description'));
  setMeta('meta[property="og:locale"]', lng === 'pl' ? 'pl_PL' : 'en_US');
  setMeta('meta[property="og:locale:alternate"]', lng === 'pl' ? 'en_US' : 'pl_PL');
  applyCanonicalDomain();
};

i18n.on('languageChanged', applyDocumentLanguage);
applyDocumentLanguage(i18n.resolvedLanguage);

export default i18n;
