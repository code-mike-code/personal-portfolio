import React, { useEffect, useRef, useState } from 'react';
import './RepoOrbs.css';

// Paleta koral (#d96a55) + morski (#2b9dad) + ecru — spójna z resztą strony
const PALETTE = ['orb-coral', 'orb-teal', 'orb-olive'];

// Kolory poświaty obwodu przy zderzeniu (rgba bez kanału alpha)
const GLOW = ['rgba(217, 106, 85, ', 'rgba(43, 157, 173, ', 'rgba(179, 173, 142, '];

// Czas życia poświaty po zderzeniu (s) — miękkie narastanie i długie wygasanie
const FLASH_DURATION = 1.4;
const FLASH_ATTACK = 0.18; // część czasu na narastanie

// Powiększenie na hover (desktop) i docelowa średnica po tapnięciu (mobile)
const HOVER_SCALE = 1.3;
const TAP_DIAMETER_VW = 0.45;
const TAP_COLLAPSE_MS = 3000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function RepoOrbs({ repos }) {
  const containerRef = useRef(null);
  const orbRefs = useRef([]);
  const orbsRef = useRef([]);
  const [staticMode] = useState(prefersReducedMotion);
  // Kula rozwinięta tapnięciem (mobile): stan do klasy CSS, ref do handlerów
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const expandedRef = useRef(-1);
  const collapseTimerRef = useRef(null);

  useEffect(() => {
    if (staticMode || !repos.length) return undefined;

    const container = containerRef.current;
    let bounds = container.getBoundingClientRect();

    const isMobile = bounds.width < 900;
    const orbs = repos.map((repo, i) => {
      const base = isMobile
        ? 36 + Math.random() * 14
        : 68 + Math.random() * 36;
      // Mobile: element ma od razu rozmiar rozwiniętej kuli (45vw), a stan
      // spoczynkowy to skala <1. Downscale rastruje ostro; upscale małego
      // layoutu dawał piksele na krawędzi po tapnięciu
      const k = isMobile
        ? Math.max(1, (window.innerWidth * TAP_DIAMETER_VW) / (base * 2))
        : 1;
      const vx = (24 + Math.random() * 32) * (Math.random() < 0.5 ? -1 : 1);
      const vy = (24 + Math.random() * 32) * (Math.random() < 0.5 ? -1 : 1);
      return {
        el: orbRefs.current[i],
        base,
        k,
        r: base,
        x: 0,
        y: 0,
        vx,
        vy,
        // Docelowa (stała) szybkość — zderzenia zmieniają tylko kierunek
        speed: Math.hypot(vx, vy),
        phase: Math.random() * Math.PI * 2,
        oscSpeed: 0.3 + Math.random() * 0.4,
        frozen: false,
        hoverT: 0,
        targetScale: 1,
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
      orb.el.style.width = `${orb.base * 2 * orb.k}px`;
      orb.el.style.height = `${orb.base * 2 * orb.k}px`;
    });

    orbsRef.current = orbs;

    let raf = null;
    let last = performance.now();
    let running = false;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      // Pulsowanie rozmiaru + płynny wzrost do targetScale (hover/tap).
      // Wzrost wchodzi do o.r, więc fizyka (zderzenia, ściany) widzi
      // powiększoną kulę i sąsiadki są odpychane zamiast nachodzić
      orbs.forEach((o) => {
        o.hoverT += ((o.frozen ? 1 : 0) - o.hoverT) * Math.min(1, dt * 8);
        const grow = 1 + (o.targetScale - 1) * o.hoverT;
        o.r = o.base * (1 + 0.12 * Math.sin(t * o.oscSpeed + o.phase)) * grow;
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

      // Normalizacja szybkości do wartości startowej. Masa ~ r², a r pulsuje,
      // więc impulsy zderzeń nie zachowują energii między klatkami — bez tego
      // kule stopniowo się rozpędzają. Zderzenia zmieniają tylko kierunek.
      orbs.forEach((o) => {
        const s = Math.hypot(o.vx, o.vy);
        if (s > 0) {
          const k = o.speed / s;
          o.vx *= k;
          o.vy *= k;
        }
      });

      // Render
      orbs.forEach((o) => {
        // Skala względem powiększonego layoutu (base*2*k) — środek kuli
        // zostaje w (x, y), transform-origin domyślnie 50% 50%
        const scale = o.r / (o.base * o.k);
        o.el.style.transform = `translate3d(${o.x - o.base * o.k}px, ${o.y - o.base * o.k}px, 0) scale(${scale})`;
        // Kontr-skala dla tekstu w rozwiniętej kuli — tekst nie rośnie
        // razem z transformem (ostry render, stały rozmiar)
        o.el.style.setProperty('--orb-scale', scale.toFixed(4));

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

  // Timer zwijania nie może przeżyć odmontowania (np. zmiana języka)
  useEffect(() => () => clearTimeout(collapseTimerRef.current), []);

  const collapseOrb = () => {
    clearTimeout(collapseTimerRef.current);
    collapseTimerRef.current = null;
    orbsRef.current.forEach((o) => {
      o.frozen = false;
      o.targetScale = 1;
    });
    expandedRef.current = -1;
    setExpandedIndex(-1);
  };

  const expandOrb = (index) => {
    clearTimeout(collapseTimerRef.current);
    orbsRef.current.forEach((o, i) => {
      o.frozen = i === index;
      // Docelowa średnica 35vw — targetScale przelicza ją na mnożnik bazy
      o.targetScale = i === index
        ? Math.max(1, (window.innerWidth * TAP_DIAMETER_VW) / (o.base * 2))
        : 1;
    });
    expandedRef.current = index;
    setExpandedIndex(index);
    collapseTimerRef.current = setTimeout(collapseOrb, TAP_COLLAPSE_MS);
  };

  const freeze = (index, value) => {
    const orb = orbsRef.current[index];
    if (!orb) return;
    // Blur rozwiniętej kuli (tap poza nią) = wcześniejsze zwinięcie
    if (!value && expandedRef.current === index) {
      collapseOrb();
      return;
    }
    orb.frozen = value;
    if (value && orb.targetScale === 1) orb.targetScale = HOVER_SCALE;
    if (!value) orb.targetScale = 1;
  };

  const handleOrbClick = (event, index) => {
    if (staticMode) return;
    if (!window.matchMedia('(max-width: 900px)').matches) return;
    if (expandedRef.current === index) {
      // Drugi tap: nawigacja do repo (default) + natychmiastowe zwinięcie
      collapseOrb();
      return;
    }
    // Pierwszy tap: tylko podgląd — powiększenie i info zamiast nawigacji
    event.preventDefault();
    expandOrb(index);
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
          className={`repo-orb ${PALETTE[index % PALETTE.length]} ${expandedIndex === index ? 'repo-orb--expanded' : ''}`}
          onMouseEnter={() => freeze(index, true)}
          onMouseLeave={() => freeze(index, false)}
          onFocus={() => freeze(index, true)}
          onBlur={() => freeze(index, false)}
          onClick={(e) => handleOrbClick(e, index)}
        >
          <span className="repo-orb-glow" aria-hidden="true"></span>
          {/* Mobile/tablet: domyślnie ikona GitHuba, nazwa + technologia po hover/focus */}
          <span className="repo-orb-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
          </span>
          <span className="repo-orb-label">
            <span className="repo-orb-name">{repo.name}</span>
            {repo.primaryLanguage && (
              <span className="repo-orb-lang">{repo.primaryLanguage.name}</span>
            )}
          </span>
        </a>
      ))}
    </div>
  );
}
