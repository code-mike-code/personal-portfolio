import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
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
          {/* <a 
          onClick={() => scrollToSection('about')} 
          aria-label="Scroll to about section"
          role="button"
          >
            Code Mike
          </a> */}
          <a 
            onClick={() => scrollToSection('about')} 
            aria-label="Scroll to about section"
            className="header__logo-button"  // TODO: styling w CSS
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
            aria-label="GitHub Profile"
            >
              <span className="menu-text">GitHub</span>
            </a>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a 
            onClick={() => scrollToSection('projects')}
            aria-label="Scroll to projects section"
            >
              <span className="menu-text">Work</span>
            </a>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a 
            onClick={() => scrollToSection('contact')}
            aria-label="Scroll to contact section"
            >
              <span className="menu-text">Contact</span>
            </a>
          </li>
        </ul>
        <button 
          className="header__burger" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;