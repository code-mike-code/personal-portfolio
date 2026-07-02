import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkShowcase.css';

gsap.registerPlugin(ScrollTrigger);

// Długość fazy intro (grow + slide) w wysokościach viewportu
const INTRO_VIEWPORTS = 1.6;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ProjectMedia = ({ project, index }) => {
  const videoSrc = project.fullVideo || project.tabletVideo || project.thumbnailVideo;

  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="work-media-video"
      />
    );
  }

  return (
    <div className={`work-media-placeholder work-media-placeholder-${index % 5}`}>
      <span className="work-media-placeholder-label">{project.title}</span>
    </div>
  );
};

const ProjectInfo = ({ project, index, total, onDetails }) => (
  <>
    <div className="work-info-head">
      <div className="work-counter" aria-label={`Project ${index + 1} of ${total}`}>
        <span className="work-counter-current">{String(index + 1).padStart(2, '0')}</span>
        <span className="work-counter-total">/{String(total).padStart(2, '0')}</span>
      </div>
      <h3 className="work-project-title">{project.title}</h3>
    </div>
    <p className="work-project-desc">{project.shortDescription}</p>
    <div className="work-actions">
      <a
        className="work-btn work-btn-live"
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View live
      </a>
      <button
        type="button"
        className="work-btn work-btn-details"
        onClick={() => onDetails(project)}
      >
        Details
      </button>
    </div>
  </>
);

const WorkShowcase = ({ projects, onDetails }) => {
  const sectionRef = useRef(null);
  const mediaWrapRef = useRef(null);
  const infoWrapRef = useRef(null);
  const indexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [staticMode] = useState(prefersReducedMotion);

  useLayoutEffect(() => {
    if (staticMode) return undefined;

    const ctx = gsap.context(() => {
      const mediaEl = mediaWrapRef.current;
      const infoEl = infoWrapRef.current;
      const total = projects.length;
      const introFraction = INTRO_VIEWPORTS / (INTRO_VIEWPORTS + total);

      // Pin całej sekcji: intro + 1 viewport na każdy projekt
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (INTRO_VIEWPORTS + total)}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const idx =
            p <= introFraction
              ? 0
              : Math.min(
                  total - 1,
                  Math.floor(((p - introFraction) / (1 - introFraction)) * total)
                );
          if (idx !== indexRef.current) {
            indexRef.current = idx;
            setActiveIndex(idx);
          }
        },
      });

      // Intro: karta startuje wyżej jako płaski prostokąt rozpięty między
      // liniami gridu (25vw–75vw), rośnie do pełnego rozmiaru, potem zjeżdża
      // w lewo, a panel info wsuwa się z prawej z niewidoczności
      const createIntroTl = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * INTRO_VIEWPORTS}`,
            scrub: 0.5,
            onUpdate: () => {
              infoEl.style.pointerEvents = tl.progress() > 0.9 ? 'auto' : 'none';
            },
          },
        });
        return tl;
      };

      const mm = gsap.matchMedia();

      mm.add('(min-width: 901px)', () => {
        const introTl = createIntroTl();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const startWidth = vw * 0.5; // od linii 25vw do 75vw
        const startHeight = Math.min(vh * 0.28, 320);
        const endWidth = vw * 0.48; // docelowo do linii 50vw
        const endHeight = Math.min(vh * 0.56, 600);

        // Pozycja layoutowa liczona przed nałożeniem transformów.
        // Dwa shifty trzymają kartę idealnie na środku podczas wzrostu
        // (szerokość rośnie od lewej krawędzi, więc x musi kompensować)
        const mediaRect = mediaEl.getBoundingClientRect();
        const centerShiftStart = vw / 2 - (mediaRect.left + startWidth / 2);
        const centerShiftEnd = vw / 2 - (mediaRect.left + endWidth / 2);

        gsap.set(mediaEl, {
          x: centerShiftStart,
          y: -vh * 0.1,
          width: startWidth,
          height: startHeight,
        });

        introTl
          // Faza 1: wzrost do pełnego rozmiaru, karta nie rusza się ze środka
          .to(mediaEl, {
            x: centerShiftEnd,
            y: 0,
            width: endWidth,
            height: endHeight,
            duration: 1,
            ease: 'none',
          })
          // Faza 2: dopiero po pełnym wzroście (plus pauza) zjazd w lewo
          .to(mediaEl, { x: 0, duration: 1, ease: 'none' }, '>+0.25')
          .fromTo(
            infoEl,
            { x: vw * 0.12, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'none' },
            '<'
          );
      });

      mm.add('(max-width: 900px)', () => {
        const introTl = createIntroTl();
        const vh = window.innerHeight;

        gsap.set(mediaEl, { scale: 0.7, y: -vh * 0.05, transformOrigin: '50% 50%' });

        introTl
          .to(mediaEl, { scale: 1, y: 0, duration: 1, ease: 'none' })
          .fromTo(
            infoEl,
            { x: () => window.innerWidth * 0.12, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'none' },
            '>'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length, staticMode]);

  // Fallback bez pinowania dla prefers-reduced-motion
  if (staticMode) {
    return (
      <section className="work-showcase work-showcase-static">
        {projects.map((project, index) => (
          <div className="work-showcase-inner" key={project.id}>
            <div className="work-showcase-media">
              <div className="work-media-card active">
                <ProjectMedia project={project} index={index} />
              </div>
            </div>
            <div className="work-showcase-info">
              <div className="work-info-panel active">
                <ProjectInfo
                  project={project}
                  index={index}
                  total={projects.length}
                  onDetails={onDetails}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="work-showcase" ref={sectionRef}>
      <div className="work-showcase-inner">
        <div className="work-showcase-media" ref={mediaWrapRef}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`work-media-card ${index === activeIndex ? 'active' : ''}`}
              aria-hidden={index !== activeIndex}
            >
              <ProjectMedia project={project} index={index} />
            </div>
          ))}
        </div>
        <div className="work-showcase-info" ref={infoWrapRef}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`work-info-panel ${index === activeIndex ? 'active' : ''}`}
              aria-hidden={index !== activeIndex}
            >
              <ProjectInfo
                project={project}
                index={index}
                total={projects.length}
                onDetails={onDetails}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;
