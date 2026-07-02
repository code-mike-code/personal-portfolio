import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../common/ScrollReveal';
import './WorkHeader.css';

gsap.registerPlugin(ScrollTrigger);

export default function WorkHeader() {
  const headerRef = useRef(null);
  const titleRef = useRef(null);

  // Tytuł zmniejsza się wędrując w górę — od 60% wysokości okna do góry
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        scale: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 60%',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-header" ref={headerRef}>
      <div className="work-header-blob" aria-hidden="true"></div>
      <h2 className="work-header-title" ref={titleRef}>Selected Work</h2>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={8}
        containerClassName="work-header-subtitle-container"
        textClassName="work-header-subtitle"
      >Every project is shaped around the client — not a template — with a focus on clarity, performance, and craft.
      </ScrollReveal>
    </div>
  );
}
