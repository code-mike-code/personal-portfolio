import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

export default function PrivateProjects() {
  const { t } = useTranslation();
  const lenisRef = useRef(null);
  const [expandedProject, setExpandedProject] = useState(null);

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
      <WorkHeader />

      <WorkShowcase
        projects={privateProjects}
        onDetails={(project) => setExpandedProject(project)}
      />

      <WorkDifferent />

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
            24px zapasu + wysokość dwóch nagłówków nad tekstem (~264px) */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          completeAt={320}
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
