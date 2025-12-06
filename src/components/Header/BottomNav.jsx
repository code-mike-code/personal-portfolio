import React, { useEffect, useState, useRef } from 'react';
import './BottomNav.css';

export default function BottomNav() {
  const [visible, setVisible] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);
  const [overTechBanner, setOverTechBanner] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Show nav if scrolling down past the initial viewport
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(true);
      } else if (currentY <= 80) { // Hide only when at the top of the page
        setVisible(false);
      }
      lastScrollY.current = currentY;

      // Hide nav if near footer
      const footer = document.querySelector('.footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (footerRect.top < windowHeight && footerRect.top > 0) {
          setHideForFooter(true);
        } else {
          setHideForFooter(false);
        }
      }


      // Check if nav overlaps with tech banner
      const techBanner = document.querySelector('.tech-banner');
      if (techBanner) {
        const bannerRect = techBanner.getBoundingClientRect();
        const navHeight = 60; // przybliżona wysokość nav
        const navBottom = window.innerHeight - 60;
        
        if (bannerRect.bottom > navBottom && bannerRect.top < navBottom) {
          setOverTechBanner(true);
        } else {
          setOverTechBanner(false);
        }
      }



    };
    window.addEventListener('scroll', handleScroll);
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
      aria-label="Mobile Navigation">
      <ul className="bottom-nav__menu">
        <li><a href="https://github.com/code-mike-code"
          target="_blank"
          rel="noopener noreferrer">GitHub</a></li>
        <li><a onClick={() => scrollToSection('projects')}>Work</a></li>
        <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
      </ul>
    </nav>
  );
}