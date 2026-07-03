import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../common/LanguageToggle';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

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
    // Twardy scroll-lock: samo overflow:hidden iOS ignoruje przy dotyku.
    // position:fixed na body blokuje wszystko; top kompensuje pozycję,
    // żeby tło nie skakało do góry strony.
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
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    // Scroll dopiero po zamknięciu menu — przy otwartym menu body ma
    // overflow:hidden i scrollIntoView nie zadziała
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleMouseEnter = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${mouseX}px`);
    target.style.setProperty('--mouse-y', `${mouseY}px`);
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
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            aria-label={t('header.logoAria')}
            className="header__logo-button"
          >
            Code Mike
          </a>
        </div>
        <ul className="header__menu" onClick={handleLinkClick}>
          <li
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
            <a
            href="https://github.com/code-mike-code"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('header.githubAria')}
            >
              <span className="menu-text">{t('header.github')}</span>
            </a>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
            href="#private-projects"
            onClick={(e) => { e.preventDefault(); scrollToSection('private-projects'); }}
            aria-label={t('header.workAria')}
            >
              <span className="menu-text">{t('header.work')}</span>
            </a>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
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
          {/* Dwa labele w pionowym tracku — przełączenie roluje je jak na wideo */}
          <span className="header__menu-toggle-track" aria-hidden="true">
            <span className="header__menu-toggle-label">{t('header.menuOpen')}</span>
            <span className="header__menu-toggle-label">{t('header.menuClose')}</span>
          </span>
          {/* Jeden wspólny znak: "+" obrócony o 135° czyta się jak "×" */}
          <span className="header__menu-toggle-icon" aria-hidden="true">+</span>
        </button>
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          <ul className="mobile-menu__list">
            <li className="mobile-menu__item">
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                aria-label={t('header.aboutAria')}
              >
                <span className="mobile-menu__item-inner">
                  {t('header.about')}<sup className="mobile-menu__num">01</sup>
                </span>
              </a>
            </li>
            <li className="mobile-menu__item">
              <a
                href="#private-projects"
                onClick={(e) => { e.preventDefault(); scrollToSection('private-projects'); }}
                aria-label={t('header.workAria')}
              >
                <span className="mobile-menu__item-inner">
                  {t('header.work')}<sup className="mobile-menu__num">02</sup>
                </span>
              </a>
            </li>
            <li className="mobile-menu__item">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                aria-label={t('header.contactAria')}
              >
                <span className="mobile-menu__item-inner">
                  {t('header.contact')}<sup className="mobile-menu__num">03</sup>
                </span>
              </a>
            </li>
          </ul>
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
