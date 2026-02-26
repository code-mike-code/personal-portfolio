import React, { useEffect, useState, useRef } from 'react';
import './Hero.css';
import Button from '../common/Button';

export function AnimatedHeadlinePart({ text, start }) {
  const [revealed, setRevealed] = useState(() => Array(text.length).fill(false));
  const timeoutsRef = useRef([]);

  useEffect(() => {
    // clear previous timeouts and reset state
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
    setRevealed(Array(text.length).fill(false));

    if (!start || !text) return;

    const chars = text.split('');
    const indices = Array.from({ length: chars.length }, (_, i) => i);
   
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const baseDelay = 20;
    const step = 28;

    indices.forEach((idx, order) => {
      const jitter = Math.floor(Math.random() * 25);
      const delay = baseDelay + order * step + jitter;
      const t = setTimeout(() => {
        setRevealed(prev => {
          const copy = prev.slice();
          copy[idx] = true;
          return copy;
        });
      }, delay);
      timeoutsRef.current.push(t);
    });

    // fallback 
    const finalTimeout = setTimeout(() => {
      setRevealed(Array(chars.length).fill(true));
    }, baseDelay + indices.length * step + 200);
    timeoutsRef.current.push(finalTimeout);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [text, start]);

  return (
    <span className="hero-title-part">
      {text.split('').map((char, i) => (
        <span
          className={
            'hero-title__char' + (revealed[i] ? ' hero-title__char--visible' : '')
          }
          key={i}
          aria-hidden={!revealed[i]}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSecond(true), 450);
    // Start third line animation after the second one begins
    const t2 = setTimeout(() => setShowThird(true), 850);
    const t3 = setTimeout(() => setShowButtons(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);


   const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        <div className="hero-title-container hero-title-container--left">
          <h1 className="hero-title hero-title--left">
            <div><AnimatedHeadlinePart text="Code Mike" start={true} /></div>
            <div><AnimatedHeadlinePart text="Modern Web" start={showSecond} /></div>
            <div><AnimatedHeadlinePart text="Development" start={showThird} /></div>
          </h1>
          <div className="hero-buttons hero-buttons--left">
            <Button
              onClick={() => scrollToSection('private-projects')}
              variant="primary"
              className={`hero-btn-fade ${showButtons ? 'hero-btn--visible' : ''}`}
              tabIndex={showButtons ? 0 : -1}
              aria-hidden={!showButtons}
            >
              Projects
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              variant="secondary" 
              className={`hero-btn-fade ${showButtons ? 'hero-btn--visible' : ''}`} tabIndex={showButtons ? 0 : -1} aria-hidden={!showButtons}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
