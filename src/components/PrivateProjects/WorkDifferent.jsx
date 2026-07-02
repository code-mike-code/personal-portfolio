import React, { useEffect, useRef } from 'react';
import './WorkDifferent.css';

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
    tags: ['Figma', 'React', 'CSS'],
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
    tags: ['GSAP', 'ScrollTrigger', 'Lenis'],
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
    tags: ['Lighthouse', 'Core Web Vitals', 'SEO'],
  },
];

export default function WorkDifferent() {
  const rowsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -120px 0px', threshold: 0 }
    );

    rowsRef.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="work-different">
      <h2 className="work-different-title">What makes my work different.</h2>
      <div className="work-different-rows">
        {items.map((item, index) => (
          <div
            className="work-different-row"
            key={item.number}
            ref={(el) => (rowsRef.current[index] = el)}
          >
            <span className="work-different-number">{item.number}</span>
            <div className={`work-different-blob ${item.blob}`}>{item.icon}</div>
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
