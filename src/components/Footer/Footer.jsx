import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

export default function Footer() {
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
          aria-label="Scroll back to top"
        >
          {new Date().getFullYear()} | &copy; Code Mike - Modern Web Development
        </button>
        <div className="footer-links">
          <Link 
            to="/privacy-policy" 
            className="footer-link"
            target='_blank'
            rel='noopener noreferrer'
            >Privacy Policy & Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
