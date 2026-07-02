import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkShowcase.css';

gsap.registerPlugin(ScrollTrigger);

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
    <div className="work-counter" aria-label={`Project ${index + 1} of ${total}`}>
      <span className="work-counter-current">{String(index + 1).padStart(2, '0')}</span>
      <span className="work-counter-total">/{String(total).padStart(2, '0')}</span>
    </div>
    <h3 className="work-project-title">{project.title}</h3>
    <div className="work-actions">
      <a
        className="work-btn"
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
    <p className="work-project-desc">{project.shortDescription}</p>
  </>
);

const WorkShowcase = ({ projects, onDetails }) => {
  const sectionRef = useRef(null);
  const indexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [staticMode] = useState(prefersReducedMotion);

  useLayoutEffect(() => {
    if (staticMode) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * projects.length}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            projects.length - 1,
            Math.floor(self.progress * projects.length)
          );
          if (idx !== indexRef.current) {
            indexRef.current = idx;
            setActiveIndex(idx);
          }
        },
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
        <div className="work-showcase-media">
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
        <div className="work-showcase-info">
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
