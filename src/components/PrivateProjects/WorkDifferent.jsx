import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../common/ScrollReveal';
import './WorkDifferent.css';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    number: '01',
    blob: 'blob-warm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />
      </svg>
    ),
    title: 'Custom digital experiences',
    tagline: 'No templates — tailored, custom websites',
    description:
      'Every project starts with understanding the business and its audience, then building a UX and visual system that feels specific, intentional, and alive.',
    tags: ['Figma', 'React', 'CSS', 'TailwindCSS'],
  },
  {
    number: '02',
    blob: 'blob-cool',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 17c4-1 5-8 9-8" />
        <circle cx="17" cy="8" r="2.5" />
      </svg>
    ),
    title: 'Motion & interaction',
    tagline: 'Responsive websites that feel multidimensional',
    description:
      'I use animation and scroll-based interaction to guide attention, tell stories, and bring interfaces to life — from subtle transitions to more expressive, immersive moments.',
    tags: ['GSAP', 'ScrollTrigger', 'Lenis', 'MUI'],
  },
  {
    number: '03',
    blob: 'blob-green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 19V10M12 19V5M19 19v-7" />
      </svg>
    ),
    title: 'Performance & SEO',
    tagline: 'Fast, visible, measurable',
    description:
      'Clean, semantic code and performance budgets from day one — websites that load fast, rank well, and score high in Core Web Vitals.',
    tags: ['Lighthouse', 'Core Web Vitals', 'SEO', 'WCAG'],
  },
];

export default function WorkDifferent() {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  // Animacje sprzężone ze scrollem (scrub), jak reszta sekcji
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        const blob = row.querySelector('.work-different-blob');
        const heading = row.querySelector('.work-different-heading');
        const body = row.querySelector('.work-different-body');
        const tags = row.querySelectorAll('.work-different-tag');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(row, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none' })
          .fromTo(
            blob,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, ease: 'none' },
            '<0.1'
          )
          .fromTo(
            heading,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, ease: 'none' },
            '<0.1'
          )
          .fromTo(
            body,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, ease: 'none' },
            '<0.1'
          )
          .fromTo(
            tags,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, stagger: 0.08, ease: 'none' },
            '<0.1'
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-different" ref={containerRef}>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={10}
        containerClassName="work-different-title-container"
        textClassName="work-different-title"
      >What makes my work different.
      </ScrollReveal>
      <div className="work-different-rows">
        {items.map((item, index) => (
          <div
            className="work-different-row"
            key={item.number}
            ref={(el) => (rowsRef.current[index] = el)}
          >
            <div className="work-different-meta">
              <span className="work-different-number">{item.number}</span>
              <div className={`work-different-blob ${item.blob}`}>{item.icon}</div>
            </div>
            <div className="work-different-heading">
              <h3>{item.title}</h3>
              <p>{item.tagline}</p>
            </div>
            <div className="work-different-body">
              <p>{item.description}</p>
              <div className="work-different-tags">
                {item.tags.map((tag) => (
                  <span className="work-different-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
