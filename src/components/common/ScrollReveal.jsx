import React from 'react';
import { useEffect, useRef, useMemo } from 'react';
import './ScrollReveal.css';

const ScrollReveal = ({
  children,
  // Tag semantyczny wrappera — domyślnie neutralny div; nagłówki (h2/h3)
  // przekazywać tylko tam, gdzie tekst faktycznie pełni rolę nagłówka
  as: Tag = 'div',
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  // Offset (px od góry viewportu), przy którym reveal jest w 100% ukończony.
  // Domyślnie null = oryginalne zachowanie (koniec, gdy element opuszcza viewport)
  completeAt = null,
  // Mnożnik tempa reveal — mniejsza wartość = słowa pojawiają się przez dłuższy
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

    // Opóźnienie między słowami skalowane tak, aby OSTATNIE słowo osiągnęło
    // pełną widoczność zanim scrollProgress dojdzie do 1 — przy długim tekście
    // i niskim speed stały krok 0.01 zostawiał końcowe słowa rozmazane
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
          // Blur znika nieco szybciej niż rośnie opacity (proporcja 4:3 jak w oryginale)
          const blur = blurStrength * (1 - Math.min(1, wordProgress * speed * (4 / 3)));
          word.style.filter = `blur(${blur}px)`;
        }
      });
    };

    // rAF-throttle: max jeden update na klatkę zamiast na każde zdarzenie scroll
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