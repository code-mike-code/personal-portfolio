import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <button
          type="button"
          className='footer__copyright'
          onClick={scrollToTop}
          aria-label={t('footer.topAria')}
        >
          {new Date().getFullYear()} | &copy; {t('footer.copyright')}
        </button>
        <div className="footer-links">
          <Link
            to="/privacy-policy"
            className="footer-link"
            target='_blank'
            rel='noopener noreferrer'
            >{t('footer.privacyLink')}</Link>
        </div>
      </div>
    </footer>
  );
}
