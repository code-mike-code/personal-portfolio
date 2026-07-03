import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../common/LanguageToggle';
import './BottomNav.css';

export default function BottomNav() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);
  const [overTechBanner, setOverTechBanner] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Przybliżona wysokość nav — do detekcji nakładania z banerem
    const NAV_OFFSET = 60;
    // Refy DOM cachowane raz — bez querySelector przy każdym scrollu
    const footer = document.querySelector('.footer');
    const techBanner = document.querySelector('.tech-banner');

    const update = () => {
      const currentY = window.scrollY;

      // Show nav if scrolling down past the initial viewport
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(true);
      } else if (currentY <= 80) { // Hide only when at the top of the page
        setVisible(false);
      }
      lastScrollY.current = currentY;

      // Hide nav if near footer
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setHideForFooter(footerRect.top < window.innerHeight && footerRect.top > 0);
      }

      // Check if nav overlaps with tech banner
      if (techBanner) {
        const bannerRect = techBanner.getBoundingClientRect();
        const navBottom = window.innerHeight - NAV_OFFSET;
        setOverTechBanner(bannerRect.bottom > navBottom && bannerRect.top < navBottom);
      }
    };

    // rAF-throttle: max jeden update na klatkę
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`bottom-nav${visible && !hideForFooter ? ' bottom-nav--visible' : ''}${overTechBanner ? ' bottom-nav--over-banner' : ''}`} 
      aria-label={t('header.mobileNavAria')}>
      <ul className="bottom-nav__menu">
        <li><a href="https://github.com/code-mike-code"
          target="_blank"
          rel="noopener noreferrer">{t('header.github')}</a></li>
        <li><a href="#private-projects" onClick={(e) => { e.preventDefault(); scrollToSection('private-projects'); }}>{t('header.work')}</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('header.contact')}</a></li>
        <li><LanguageToggle className="bottom-nav__lang-toggle" /></li>
      </ul>
    </nav>
  );
}