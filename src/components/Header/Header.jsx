import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../common/LanguageToggle';
import { CALENDLY_URL } from '../../constants';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        document.body.classList.add('hide-header-grid');
      } else {
        document.body.classList.remove('hide-header-grid');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Sekcje żyją na stronie głównej. Z podstrony (/o-mnie) najpierw wracamy
  // na home, potem przewijamy do sekcji.
  const goToSection = (sectionId) => {
    setMenuOpen(false);
    const doScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 120);
    } else {
      setTimeout(doScroll, 0);
    }
  };

  const handleMouseEnter = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    target.classList.add('is-hovered');
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.classList.remove('is-hovered');
  };

  return (
    <header className={`header ${menuOpen ? 'header--menu-open' : ''}`}>
      <nav className="header__nav">
        <div
          className="header__logo"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/o-mnie"
            onClick={() => setMenuOpen(false)}
            aria-label={t('header.aboutAria')}
            className="header__logo-button"
          >
            {/* Desktop: tekst "O mnie". Mobile: monogram M (jak w favicon) */}
            <span className="header__logo-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 48V16h7l11 18 11-18h7v32h-8V31l-10 16-10-16v17z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="header__logo-text">{t('header.about')}</span>
          </Link>
        </div>
        <ul className="header__menu">
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a
              href="#oferta"
              onClick={(e) => { e.preventDefault(); goToSection('oferta'); }}
            >
              <span className="menu-text">{t('header.offer')}</span>
            </a>
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a
              href="#private-projects"
              onClick={(e) => { e.preventDefault(); goToSection('private-projects'); }}
              aria-label={t('header.workAria')}
            >
              <span className="menu-text">{t('header.work')}</span>
            </a>
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); goToSection('contact'); }}
              aria-label={t('header.contactAria')}
            >
              <span className="menu-text">{t('header.contact')}</span>
            </a>
          </li>
        </ul>
        <button
          className="header__menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('header.menuAria')}
          aria-expanded={menuOpen}
        >
          <span className="header__menu-toggle-track" aria-hidden="true">
            <span className="header__menu-toggle-label">{t('header.menuOpen')}</span>
            <span className="header__menu-toggle-label">{t('header.menuClose')}</span>
          </span>
          <span className="header__menu-toggle-icon" aria-hidden="true">+</span>
        </button>
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          <ul className="mobile-menu__list">
            <li className="mobile-menu__item">
              <Link
                to="/o-mnie"
                onClick={() => setMenuOpen(false)}
                aria-label={t('header.aboutAria')}
              >
                <span className="mobile-menu__item-inner">
                  {t('header.about')}<sup className="mobile-menu__num">01</sup>
                </span>
              </Link>
            </li>
            <li className="mobile-menu__item">
              <a
                href="#oferta"
                onClick={(e) => { e.preventDefault(); goToSection('oferta'); }}
              >
                <span className="mobile-menu__item-inner">
                  {t('header.offer')}<sup className="mobile-menu__num">02</sup>
                </span>
              </a>
            </li>
            <li className="mobile-menu__item">
              <a
                href="#private-projects"
                onClick={(e) => { e.preventDefault(); goToSection('private-projects'); }}
                aria-label={t('header.workAria')}
              >
                <span className="mobile-menu__item-inner">
                  {t('header.work')}<sup className="mobile-menu__num">03</sup>
                </span>
              </a>
            </li>
            <li className="mobile-menu__item">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); goToSection('contact'); }}
                aria-label={t('header.contactAria')}
              >
                <span className="mobile-menu__item-inner">
                  {t('header.contact')}<sup className="mobile-menu__num">04</sup>
                </span>
              </a>
            </li>
          </ul>
          <a
            className="mobile-menu__cta"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {t('header.bookCall')}
          </a>
          <div className="mobile-menu__socials">
            <span className="mobile-menu__socials-label">{t('header.socials')}</span>
            <div className="mobile-menu__socials-links">
              <a
                href="https://github.com/code-mike-code"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('header.githubAria')}
              >
                {t('header.github')}
              </a>
              <a
                href="https://www.linkedin.com/in/michal-majewski-front-end-developer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('header.linkedinAria')}
              >
                LinkedIn
              </a>
              <LanguageToggle className="mobile-menu__lang-toggle" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
