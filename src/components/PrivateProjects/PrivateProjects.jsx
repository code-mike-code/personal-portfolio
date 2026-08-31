import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollReveal from '../common/ScrollReveal';
import WorkHeader from './WorkHeader';
import WorkShowcase from './WorkShowcase';
import WorkDifferent from './WorkDifferent';
import ProjectModal from './ProjectModal';
import { privateProjects } from './private-projects';
import './PrivateProjects.css';

gsap.registerPlugin(ScrollTrigger);

// Zapobiega skokom animacji na mobile gdy chowa się pasek adresu
ScrollTrigger.config({ ignoreMobileResize: true });

export default function PrivateProjects({ limit }) {
  const { t } = useTranslation();
  const lenisRef = useRef(null);
  const [expandedProject, setExpandedProject] = useState(null);

  // Na home pokazujemy skrót (3 realizacje) + link do pełnej listy;
  // pełna lista żyje na /realizacje
  const shownProjects =
    typeof limit === 'number' ? privateProjects.slice(0, limit) : privateProjects;

  // Inicjalizacja Lenis (Smooth Scroll)
  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Zatrzymywanie Lenis gdy modal jest otwarty, aby umożliwić przewijanie jego zawartości
  useEffect(() => {
    if (expandedProject) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [expandedProject]);

  return (
    <section id="private-projects" className="private-projects-section">
      {/* Najpierw wartość (co wyróżnia), potem jednostka realizacji:
          nagłówek "Każdy projekt..." + opis zostają RAZEM z listą projektów */}
      <WorkDifferent />

      <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>

      <WorkHeader />

      <WorkShowcase
        projects={shownProjects}
        onDetails={(project) => setExpandedProject(project)}
      />

      {typeof limit === 'number' && privateProjects.length > limit && (
        <div className="work-view-all">
          <Link to="/realizacje" className="work-view-all-link">
            {t('work.viewAll')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}

      {/* Domknięcie */}
      <div className="section-closure">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          containerClassName="section-closure-title"
          textClassName="section-closure-title-part1"
        >{t('work.closure.line1')}
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          containerClassName="section-closure-title"
          textClassName="section-closure-title-part2"
        >{t('work.closure.line2')}
        </ScrollReveal>

        {/* completeAt: pełny reveal zanim heading dojedzie do góry —
            24px zapasu + wysokość dwóch nagłówków nad tekstem (~264px).
            speed: wolniejsze tempo, żeby efekt pojawiania był widoczny */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          completeAt={320}
          speed={1.2}
          textClassName="section-closure-text"
        >{t('work.closure.text')}
        </ScrollReveal>
      </div>

      {/* Project Modal - Popover dla wybranego projektu */}
      <ProjectModal
        isOpen={expandedProject !== null}
        project={expandedProject}
        onClose={() => setExpandedProject(null)}
      />
    </section>
  );
}
