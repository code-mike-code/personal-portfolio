import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
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

// Prevents animation jumps on mobile when the address bar hides
ScrollTrigger.config({ ignoreMobileResize: true });

export default function PrivateProjects({ limit }) {
  const { t } = useTranslation();
  const lenisRef = useRef(null);
  const [expandedProject, setExpandedProject] = useState(null);

  // On home we show a teaser (3 projects) + a link to the full list;
  // the full list lives at /realizacje
  const shownProjects =
    typeof limit === 'number' ? privateProjects.slice(0, limit) : privateProjects;

  // Initialize Lenis (Smooth Scroll)
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

  // Pause Lenis while the modal is open so its content can scroll
  useEffect(() => {
    if (expandedProject) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [expandedProject]);

  return (
    <section id="private-projects" className="private-projects-section">
      {/* First the value (what sets it apart), then the project proof:
          the "Every project..." heading + description stay TOGETHER with the project list */}
      <WorkDifferent />

      <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>

      <WorkHeader />

      <WorkShowcase
        projects={shownProjects}
        onDetails={(project) => setExpandedProject(project)}
      />

      {typeof limit === 'number' && privateProjects.length > limit && (
        <div className="work-view-all">
          <Button as={Link} to="/realizacje" variant="secondary">
            {t('work.viewAll')} <span aria-hidden="true">→</span>
          </Button>
        </div>
      )}

      {/* Closure */}
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

        {/* completeAt: full reveal before the heading reaches the top —
            24px of slack + the height of the two headings above the text (~264px).
            speed: slower pace so the reveal effect is visible */}
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

      {/* Project Modal - Popover for the selected project */}
      <ProjectModal
        isOpen={expandedProject !== null}
        project={expandedProject}
        onClose={() => setExpandedProject(null)}
      />
    </section>
  );
}
