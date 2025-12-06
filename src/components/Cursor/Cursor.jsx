import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Cursor.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const prevLitRef = useRef(null);
  const prevAccentRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }

      setVisible(true);

      const elem = document.elementFromPoint(x, y);
  //     const accentEl = elem && elem.closest('.contact-submit');
  //     const headerEl = elem && elem.closest('.header__menu a, .header__logo a, .menu-text, .pill');
      
  //     if (prevAccentRef.current !== accentEl) {
  //       if (prevAccentRef.current) prevAccentRef.current.classList.remove('accent-lit');
  //       if (accentEl) accentEl.classList.add('accent-lit');
  //       prevAccentRef.current = accentEl;
  //     }

  //     if (cursorRef.current) {
  //       cursorRef.current.classList.add('custom-cursor--invert');
  //       cursorRef.current.classList.remove('custom-cursor--accent');
  //       if (accentEl) cursorRef.current.classList.add('custom-cursor--accent');
  //     }
      
  //     // header bottom-light highlight
  //     if (prevLitRef.current !== headerEl) {
  //       if (prevLitRef.current) prevLitRef.current.classList.remove('header-lit');
  //       if (headerEl) headerEl.classList.add('header-lit');
  //       prevLitRef.current = headerEl;
  //     }

  //   };

  //   document.addEventListener('mousemove', moveCursor, { passive: true });
  //   return () => {
  //     document.removeEventListener('mousemove', moveCursor);
  //     if (prevLitRef.current) prevLitRef.current.classList.remove('header-lit');
  //     if (prevAccentRef.current) prevAccentRef.current.classList.remove('accent-lit');
  //     if (cursorRef.current) cursorRef.current.classList.remove('custom-cursor--invert', 'custom-cursor--accent');
  //   };
  // }, []);


      const accentEl = elem?.closest('.contact-submit, .contact-form button');
      const headerEl = elem?.closest('.header__menu a, .header__logo a, .menu-text, .pill');
      
      // update accent-lit
      if (prevAccentRef.current !== accentEl) {
        prevAccentRef.current?.classList.remove('accent-lit');
        accentEl?.classList.add('accent-lit');
        prevAccentRef.current = accentEl;
      }

      // update cursor style
      if (cursorRef.current) {
        cursorRef.current.classList.add('custom-cursor--invert');
        if (accentEl) {
          cursorRef.current.classList.add('custom-cursor--accent');
        } else {
          cursorRef.current.classList.remove('custom-cursor--accent');
        }
      }
      
      // update header-lit
      if (prevLitRef.current !== headerEl) {
        prevLitRef.current?.classList.remove('header-lit');
        headerEl?.classList.add('header-lit');
        prevLitRef.current = headerEl;
      }
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      prevLitRef.current?.classList.remove('header-lit');
      prevAccentRef.current?.classList.remove('accent-lit');
      cursorRef.current?.classList.remove('custom-cursor--invert', 'custom-cursor--accent');
    };
  }, []);

  useEffect(() => {
    const clearHighlight = () => {
      if (prevLitRef.current) { prevLitRef.current.classList.remove('header-lit'); prevLitRef.current = null; }
      if (prevAccentRef.current) { prevAccentRef.current.classList.remove('accent-lit'); prevAccentRef.current = null; }
      setVisible(false);
      if (cursorRef.current) cursorRef.current.classList.remove('custom-cursor--invert', 'custom-cursor--accent');
    };
    window.addEventListener('mouseout', clearHighlight);
    window.addEventListener('blur', clearHighlight);
    return () => {
      window.removeEventListener('mouseout', clearHighlight);
      window.removeEventListener('blur', clearHighlight);
    };
  }, []);

  const cursorEl = (
    <div
      ref={cursorRef}
      className={`custom-cursor ${visible ? 'custom-cursor--visible' : ''}`}
      aria-hidden="true"
    />
  );

  // render as portal to document.body to avoid stacking-context issues
  return typeof document !== 'undefined' ? ReactDOM.createPortal(cursorEl, document.body) : cursorEl;
}