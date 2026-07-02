import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';
import Button from '../common/Button';
import AnimatedHeadlinePart from '../common/AnimatedHeadlinePart';

export default function Hero() {
  const { t } = useTranslation();
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
      {/* Subtelny element graficzny — orbitujące punkty w palecie strony */}
      <div className="hero-orbit" aria-hidden="true">
        <span className="hero-orbit-ring hero-orbit-ring--outer">
          <span className="hero-orbit-dot hero-orbit-dot--coral"></span>
        </span>
        <span className="hero-orbit-ring hero-orbit-ring--inner">
          <span className="hero-orbit-dot hero-orbit-dot--teal"></span>
        </span>
        <span className="hero-orbit-core"></span>
      </div>
      <div className="hero-content-wrapper">
        <div className="hero-title-container hero-title-container--left">
          {/* aria-label: czytniki dostają pełny tekst od razu, animacja liter jest czysto wizualna */}
          <h1
            className="hero-title hero-title--left"
            aria-label={`${t('hero.line1')} — ${t('hero.line2')} ${t('hero.line3')}`}
          >
            <div aria-hidden="true"><AnimatedHeadlinePart text={t('hero.line1')} start={true} /></div>
            <div aria-hidden="true"><AnimatedHeadlinePart text={t('hero.line2')} start={showSecond} /></div>
            <div aria-hidden="true"><AnimatedHeadlinePart text={t('hero.line3')} start={showThird} /></div>
          </h1>
          <div className="hero-buttons hero-buttons--left">
            <Button
              onClick={() => scrollToSection('private-projects')}
              variant="primary"
              className={`hero-btn-fade ${showButtons ? 'hero-btn--visible' : ''}`}
              tabIndex={showButtons ? 0 : -1}
              aria-hidden={!showButtons}
            >
              {t('hero.projects')}
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              variant="secondary" 
              className={`hero-btn-fade ${showButtons ? 'hero-btn--visible' : ''}`} tabIndex={showButtons ? 0 : -1} aria-hidden={!showButtons}
            >
              {t('hero.contact')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
