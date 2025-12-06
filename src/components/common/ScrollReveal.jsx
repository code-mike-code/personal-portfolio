import React from 'react';
import { useEffect, useRef, useMemo } from 'react';
import './ScrollReveal.css';

const ScrollReveal = ({
  children,
  // scrollContainerRef, // TODO: Implement custom scroll container
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
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
    
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // calculate scroll progress
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      
      // apply rotation
      const rotation = baseRotation * (1 - scrollProgress);
      el.style.transform = `rotate(${rotation}deg)`;
      el.style.transformOrigin = '0% 50%';
      
      // apply opacity and blur to words
      wordElements.forEach((word, index) => {
        const wordProgress = Math.max(0, scrollProgress - (index * 0.01));
        const opacity = baseOpacity + (1 - baseOpacity) * Math.min(1, wordProgress * 3);
        
        word.style.opacity = opacity;
        word.style.willChange = 'opacity';
        
        if (enableBlur) {
          const blur = blurStrength * (1 - Math.min(1, wordProgress * 4));
          word.style.filter = `blur(${blur}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;