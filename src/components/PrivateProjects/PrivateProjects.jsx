import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
        >Transforming Ideas
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          containerClassName="section-closure-title"
          textClassName="section-closure-title-part2"
        >into Digital Reality
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          textClassName="section-closure-text"
        >The projects above demonstrate my commitment to building high-performance web applications with a focus on clean code and user experience. If you are looking for a reliable developer to bring your vision to life or optimize your current digital presence, I am ready to help. Let's connect and discuss how we can build something exceptional for your business.
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
