import React from 'react';
import { useEffect, useRef, useMemo } from 'react';
import './ScrollReveal.css';

const ScrollReveal = ({
  children,
  // Semantic wrapper tag — a neutral div by default; pass headings (h2/h3)
  // only where the text actually acts as a heading
  as: Tag = 'div',
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  // Offset (px from the top of the viewport) at which the reveal is 100% complete.
  // Default null = original behavior (ends when the element leaves the viewport)
  completeAt = null,
  // Reveal pace multiplier — a smaller value = words appear over a longer
  // odcinek scrolla (3 = dotychczasowe zachowanie)
  speed = 3,
  // rotationEnd = 'bottom bottom', // TODO: Implement custom rotation end
  // wordAnimationEnd = 'bottom bottom' // TODO: Implement custom word animation end
}) => {
  const containerRef = useRef(null);
  
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordElements = el.querySelectorAll('.word');

    // Delay between words scaled so the LAST word reaches
    // full visibility before scrollProgress reaches 1 — with long text
    // and low speed a fixed 0.01 step left the trailing words blurred
    const maxTotalDelay = Math.max(0, 1 - 1 / speed) * 0.9;
    const staggerStep = wordElements.length > 1
      ? Math.min(0.01, maxTotalDelay / (wordElements.length - 1))
      : 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // calculate scroll progress
      const denominator = completeAt == null
        ? windowHeight + rect.height
        : Math.max(1, windowHeight - completeAt);
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / denominator));
      
      // apply rotation
      const rotation = baseRotation * (1 - scrollProgress);
      el.style.transform = `rotate(${rotation}deg)`;
      el.style.transformOrigin = '0% 50%';
      
      // apply opacity and blur to words
      wordElements.forEach((word, index) => {
        const wordProgress = Math.max(0, scrollProgress - (index * staggerStep));
        const opacity = baseOpacity + (1 - baseOpacity) * Math.min(1, wordProgress * speed);

        word.style.opacity = opacity;

        if (enableBlur) {
          // Blur clears slightly faster than opacity grows (4:3 ratio, as in the original)
          const blur = blurStrength * (1 - Math.min(1, wordProgress * speed * (4 / 3)));
          word.style.filter = `blur(${blur}px)`;
        }
      });
    };

    // rAF-throttle: at most one update per frame instead of per scroll event
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update(); // initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableBlur, baseRotation, baseOpacity, blurStrength, completeAt, speed]);

  return (
    <Tag ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </Tag>
  );
};

export default ScrollReveal;