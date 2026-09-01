import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../common/LanguageToggle';
import './BottomNav.css';

// Sections tracked for highlighting the active link (order = order on the page)
const TRACKED_SECTIONS = ['offer', 'contact'];

export default function BottomNav() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);
  const [overTechBanner, setOverTechBanner] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Approximate nav height — for detecting overlap with the banner
    const NAV_OFFSET = 60;
    // DOM refs cached once — no querySelector on every scroll
    const footer = document.querySelector('.footer');
    const techBanner = document.querySelector('.tech-banner');
    const sections = TRACKED_SECTIONS
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter(({ el }) => el);

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

      // Active section: the one crossing the middle of the viewport
      const marker = window.innerHeight / 2;
      let current = null;
      for (const { id, el } of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    // rAF-throttle: at most one update per frame
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
      {/* On mobile the language toggle drops off the bar — a separate circle next to the pill */}
      <LanguageToggle compact className="bottom-nav__lang-circle" />
      <ul className="bottom-nav__menu">
        <li><a href="#offer"
          className={activeSection === 'offer' ? 'is-active' : undefined}
          aria-current={activeSection === 'offer' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollToSection('offer'); }}>{t('header.offer')}</a></li>
        <li><Link to="/realizacje">{t('header.work')}</Link></li>
        <li><a href="#contact"
          className={activeSection === 'contact' ? 'is-active' : undefined}
          aria-current={activeSection === 'contact' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('header.contact')}</a></li>
        <li className="bottom-nav__lang-item"><LanguageToggle className="bottom-nav__lang-toggle" /></li>
      </ul>
    </nav>
  );
}