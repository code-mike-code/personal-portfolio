import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

export default function LanguageToggle({ className = '', compact = false }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage === 'pl' ? 'pl' : 'en';
  const next = current === 'pl' ? 'en' : 'pl';

  if (compact) {
    // Wariant kompaktowy: okrągły przycisk z kodem języka docelowego
    return (
      <button
        type="button"
        className={`lang-toggle lang-toggle--compact ${className}`.trim()}
        onClick={() => i18n.changeLanguage(next)}
        aria-label={t('language.switchAria')}
      >
        {next.toUpperCase()}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`lang-toggle ${className}`.trim()}
      onClick={() => i18n.changeLanguage(next)}
      aria-label={t('language.switchAria')}
    >
      <span className={`lang-toggle__option${current === 'pl' ? ' lang-toggle__option--active' : ''}`}>
        PL
      </span>
      <span className="lang-toggle__separator" aria-hidden="true">/</span>
      <span className={`lang-toggle__option${current === 'en' ? ' lang-toggle__option--active' : ''}`}>
        EN
      </span>
    </button>
  );
}
