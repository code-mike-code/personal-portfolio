import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';
import Button from '../common/Button';
import AnimatedHeadlinePart from '../common/AnimatedHeadlinePart';
import { CALENDLY_URL } from '../../constants';

export default function Hero() {
  const { t } = useTranslation();
  const rawLines = t('hero.titleLines', { returnObjects: true });
  const titleLines = Array.isArray(rawLines) ? rawLines : [];
  const [showSecond, setShowSecond] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [drawUnderline, setDrawUnderline] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSecond(true), 450);
    const t2 = setTimeout(() => setShowButtons(true), 1200);
    // Podkreślenie rysuje się dopiero, gdy cała treść hero jest już widoczna
    const t3 = setTimeout(() => setDrawUnderline(true), 1500);
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
          <p className="hero-kicker">{t('hero.kicker')}</p>
          {/* aria-label: czytniki dostają pełny tekst od razu, animacja liter jest czysto wizualna.
              Ostatnia linia (np. "szyte pod Ciebie") podkreślona w kolorze morskim */}
          <h1
            className="hero-title hero-title--left"
            aria-label={titleLines.join(' ')}
          >
            {titleLines.map((line, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={
                  i === titleLines.length - 1
                    ? `hero-title-underline ${drawUnderline ? 'hero-title-underline--drawn' : ''}`
                    : undefined
                }
              >
                <AnimatedHeadlinePart text={line} start={i === 0 ? true : showSecond} />
              </div>
            ))}
          </h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <div className="hero-buttons hero-buttons--left">
            <Button
              as="a"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className={`hero-btn-fade ${showButtons ? 'hero-btn--visible' : ''}`}
              tabIndex={showButtons ? 0 : -1}
              aria-hidden={!showButtons}
            >
              {t('hero.ctaCall')}
            </Button>
            <Button
              as="button"
              type="button"
              onClick={() => scrollToSection('private-projects')}
              variant="secondary"
              className={`hero-btn-fade ${showButtons ? 'hero-btn--visible' : ''}`}
              tabIndex={showButtons ? 0 : -1}
              aria-hidden={!showButtons}
            >
              {t('hero.ctaWork')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
