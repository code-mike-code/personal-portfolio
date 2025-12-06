import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* <span className='footer__copyright'>{new Date().getFullYear()} | &copy; Code Mike - Modern Web Development</span> */}
      <div className="footer-content">
        <span 
          className='footer__copyright'
          onClick={scrollToTop}
        >
          {new Date().getFullYear()} | &copy; Code Mike - Modern Web Development
        </span>
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
