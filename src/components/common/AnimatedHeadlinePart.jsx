import React, { useEffect, useRef, useState } from 'react';

// Shared animated headline (letter by letter).
// mode="shuffle"    — letters reveal in random order (Hero)
// mode="sequential" — letters reveal left to right (Contact)
// The headline container should carry an aria-label with the full text,
// and this component wrapper is aria-hidden — the animation is purely visual.
export default function AnimatedHeadlinePart({ text, start, mode = 'shuffle' }) {
  const [revealed, setRevealed] = useState(() => Array(text.length).fill(false));
  const timeoutsRef = useRef([]);

  useEffect(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    setRevealed(Array(text.length).fill(false));

    if (!start || !text) return undefined;

    const indices = Array.from({ length: text.length }, (_, i) => i);

    if (mode === 'shuffle') {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    }

    const baseDelay = 20;
    const step = mode === 'shuffle' ? 28 : 38;

    indices.forEach((idx, order) => {
      const jitter = mode === 'shuffle' ? Math.floor(Math.random() * 25) : 0;
      const delay = baseDelay + order * step + jitter;
      const t = setTimeout(() => {
        setRevealed((prev) => {
          const copy = prev.slice();
          copy[idx] = true;
          return copy;
        });
      }, delay);
      timeoutsRef.current.push(t);
    });

    // Fallback: everything visible once the sequence finishes
    const finalTimeout = setTimeout(() => {
      setRevealed(Array(text.length).fill(true));
    }, baseDelay + indices.length * step + 200);
    timeoutsRef.current.push(finalTimeout);

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [text, start, mode]);

  return (
    <span className="hero-title-part">
      {text.split('').map((char, i) => (
        <span
          className={'hero-title__char' + (revealed[i] ? ' hero-title__char--visible' : '')}
          key={i}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
