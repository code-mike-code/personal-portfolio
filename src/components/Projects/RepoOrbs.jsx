import React, { useEffect, useRef, useState } from 'react';
import './RepoOrbs.css';

// Paleta koral (#d96a55) + morski (#2b9dad) + ecru — spójna z resztą strony
const PALETTE = ['orb-coral', 'orb-teal', 'orb-olive'];

// Kolory poświaty obwodu przy zderzeniu (rgba bez kanału alpha)
const GLOW = ['rgba(217, 106, 85, ', 'rgba(43, 157, 173, ', 'rgba(179, 173, 142, '];

// Czas życia poświaty po zderzeniu (s) — miękkie narastanie i długie wygasanie
const FLASH_DURATION = 1.4;
const FLASH_ATTACK = 0.18; // część czasu na narastanie

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function RepoOrbs({ repos }) {
  const containerRef = useRef(null);
  const orbRefs = useRef([]);
  const orbsRef = useRef([]);
  const [staticMode] = useState(prefersReducedMotion);

  useEffect(() => {
    if (staticMode || !repos.length) return undefined;

    const container = containerRef.current;
    let bounds = container.getBoundingClientRect();

    const isMobile = bounds.width < 700;
    const orbs = repos.map((repo, i) => {
      const base = isMobile
        ? 44 + Math.random() * 16
        : 68 + Math.random() * 36;
      return {
        el: orbRefs.current[i],
        base,
        r: base,
        x: 0,
        y: 0,
        vx: (24 + Math.random() * 32) * (Math.random() < 0.5 ? -1 : 1),
        vy: (24 + Math.random() * 32) * (Math.random() < 0.5 ? -1 : 1),
        phase: Math.random() * Math.PI * 2,
        oscSpeed: 0.3 + Math.random() * 0.4,
        frozen: false,
        glow: GLOW[i % GLOW.length],
        glowEl: orbRefs.current[i].querySelector('.repo-orb-glow'),
        flash: -1,
        flashAngle: 0,
      };
    });

    // Rozmieszczenie startowe bez nakładania (losowe próby)
    orbs.forEach((orb) => {
      let placed = false;
      for (let attempt = 0; attempt < 60 && !placed; attempt++) {
        orb.x = orb.base + Math.random() * Math.max(1, bounds.width - orb.base * 2);
        orb.y = orb.base + Math.random() * Math.max(1, bounds.height - orb.base * 2);
        placed = orbs
          .filter((o) => o !== orb && o.x !== 0)
          .every((o) => Math.hypot(o.x - orb.x, o.y - orb.y) > o.base + orb.base + 8);
      }
    });

    orbs.forEach((orb) => {
      orb.el.style.width = `${orb.base * 2}px`;
      orb.el.style.height = `${orb.base * 2}px`;
    });

    orbsRef.current = orbs;

    let raf = null;
    let last = performance.now();
    let running = false;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      // Pulsowanie rozmiaru
      orbs.forEach((o) => {
        o.r = o.base * (1 + 0.12 * Math.sin(t * o.oscSpeed + o.phase));
      });

      // Ruch + odbicia od ścian
      orbs.forEach((o) => {
        if (!o.frozen) {
          o.x += o.vx * dt;
          o.y += o.vy * dt;
        }
        if (o.x - o.r < 0) { o.x = o.r; o.vx = Math.abs(o.vx); o.flash = t; o.flashAngle = Math.PI; }
        if (o.x + o.r > bounds.width) { o.x = bounds.width - o.r; o.vx = -Math.abs(o.vx); o.flash = t; o.flashAngle = 0; }
        if (o.y - o.r < 0) { o.y = o.r; o.vy = Math.abs(o.vy); o.flash = t; o.flashAngle = -Math.PI / 2; }
        if (o.y + o.r > bounds.height) { o.y = bounds.height - o.r; o.vy = -Math.abs(o.vy); o.flash = t; o.flashAngle = Math.PI / 2; }
      });

      // Zderzenia sprężyste (masa ~ r^2)
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const a = orbs[i];
          const b = orbs[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.r + b.r;
          if (dist > 0 && dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;

            // Rozdzielenie nakładających się okręgów
            const overlap = (minDist - dist) / 2;
            if (!a.frozen) { a.x -= nx * overlap; a.y -= ny * overlap; }
            if (!b.frozen) { b.x += nx * overlap; b.y += ny * overlap; }

            // Impuls wzdłuż normalnej
            const dvx = a.vx - b.vx;
            const dvy = a.vy - b.vy;
            const vn = dvx * nx + dvy * ny;
            if (vn > 0) {
              const m1 = a.r * a.r;
              const m2 = b.r * b.r;
              const impulse = (2 * vn) / (m1 + m2);
              a.vx -= impulse * m2 * nx;
              a.vy -= impulse * m2 * ny;
              b.vx += impulse * m1 * nx;
              b.vy += impulse * m1 * ny;
              a.flash = t;
              b.flash = t;
              // Punkt uderzenia: dla a w stronę b, dla b w stronę a
              a.flashAngle = Math.atan2(ny, nx);
              b.flashAngle = Math.atan2(-ny, -nx);
            }
          }
        }
      }

      // Render
      orbs.forEach((o) => {
        o.el.style.transform = `translate3d(${o.x - o.base}px, ${o.y - o.base}px, 0) scale(${o.r / o.base})`;

        // Poświata rozchodząca się po obwodzie od punktu uderzenia:
        // łuk conic-gradient rośnie wokół kuli, jasność wg obwiedni smoothstep
        const p = o.flash >= 0 ? (t - o.flash) / FLASH_DURATION : 1;
        if (p < 1) {
          const raw = p < FLASH_ATTACK ? p / FLASH_ATTACK : 1 - (p - FLASH_ATTACK) / (1 - FLASH_ATTACK);
          const ease = raw * raw * (3 - 2 * raw);

          const spreadT = Math.min(1, p / 0.7);
          const spread = 40 + 320 * (spreadT * spreadT * (3 - 2 * spreadT));
          const fromDeg = 90 + (o.flashAngle * 180) / Math.PI - spread / 2;
          const alpha = (0.85 * ease).toFixed(3);

          o.glowEl.style.background = `conic-gradient(from ${fromDeg}deg, ${o.glow}0) 0deg, ${o.glow}${alpha}) ${spread / 2}deg, ${o.glow}0) ${spread}deg, ${o.glow}0) 360deg)`;
          o.glowEl.style.opacity = 1;
        } else if (o.glowEl.style.opacity !== '0') {
          o.glowEl.style.opacity = 0;
        }
      });

      if (running) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    // Animacja tylko gdy sekcja w viewport
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(container);

    // Aktualizacja granic przy resize
    const ro = new ResizeObserver(() => {
      bounds = container.getBoundingClientRect();
      orbs.forEach((o) => {
        o.x = Math.min(Math.max(o.x, o.base), Math.max(o.base, bounds.width - o.base));
        o.y = Math.min(Math.max(o.y, o.base), Math.max(o.base, bounds.height - o.base));
      });
    });
    ro.observe(container);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [repos, staticMode]);

  const freeze = (index, value) => {
    const orb = orbsRef.current[index];
    if (orb) orb.frozen = value;
  };

  return (
    <div
      className={`repo-orbs ${staticMode ? 'repo-orbs-static' : ''}`}
      ref={containerRef}
    >
      {repos.map((repo, index) => (
        <a
          key={repo.id}
          ref={(el) => (orbRefs.current[index] = el)}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`repo-orb ${PALETTE[index % PALETTE.length]}`}
          onMouseEnter={() => freeze(index, true)}
          onMouseLeave={() => freeze(index, false)}
          onFocus={() => freeze(index, true)}
          onBlur={() => freeze(index, false)}
        >
          <span className="repo-orb-glow" aria-hidden="true"></span>
          <span className="repo-orb-name">{repo.name}</span>
          {repo.primaryLanguage && (
            <span className="repo-orb-lang">{repo.primaryLanguage.name}</span>
          )}
        </a>
      ))}
    </div>
  );
}
