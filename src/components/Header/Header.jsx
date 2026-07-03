import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
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
        <ul className={`header__menu ${menuOpen ? 'header__menu--open' : ''}`} onClick={handleLinkClick}>
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
          className="header__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('header.menuAria')}
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
