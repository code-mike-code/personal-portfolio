import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './ScrollCards.css'; 
// import cardFrontImg from '../../assets/card-front.png';
// import '../Hero/Hero.css';
import AnimatedCardBackground from '../common/AnimatedCardBackground';
import ScrollReveal from '../common/ScrollReveal';
import ProjectModal from './ProjectModal';
import { privateProjects } from './private-projects';




gsap.registerPlugin(ScrollTrigger);

// Zapobiega skokom animacji na mobile gdy chowa się pasek adresu
ScrollTrigger.config({ ignoreMobileResize: true });


const ScrollCards = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const closingRef = useRef(null);
  const [showClosing, setShowClosing] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [touchedCard, setTouchedCard] = useState(null);

  // Intersection Observer dla sekcji Domknięcie
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowClosing(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -300px 0px', threshold: 0 }
    );

    if (closingRef.current) observer.observe(closingRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    // Inicjalizacja Lenis (Smooth Scroll)
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Kontekst GSAP dla łatwego czyszczenia
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const totalScrollHeight = window.innerHeight * 3;

      // 1. Przypięcie sekcji (Pinning) - wspólne dla wszystkich widoków
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      // Użycie matchMedia do responsywnych animacji
      let mm = gsap.matchMedia();

      // --- DESKTOP (min-width: 901px) ---
      mm.add("(min-width: 901px)", () => {
        const positions = [20, 40, 60, 80]; // Szerszy rozstaw
        const rotations = [-15, -7.5, 7.5, 15];

        cards.forEach((card, index) => {
          // 2. Rozsuwanie kart (Spread)
          gsap.to(card, {
            left: `${positions[index]}%`,
            // top: '50%', // USUNIĘTE: Redundantne, top jest już 50% w CSS. Zapobiega skokom.
            rotation: rotations[index],
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });

          // 3. Obrót i flip kart (Rotate & Flip)
          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const staggerOffset = index * 0.05;
          const startOffset = 1 / 3 + staggerOffset;
          const endOffset = 2 / 3 + staggerOffset;

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalScrollHeight}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress >= startOffset && progress <= endOffset) {
                const animationProgress = (progress - startOffset) / (1 / 3);
                const frontRotation = -180 * animationProgress;
                const backRotation = 180 - 180 * animationProgress;
                const cardRotation = rotations[index] * (1 - animationProgress);

                if (frontEl) frontEl.style.transform = `rotateY(${frontRotation}deg)`;
                if (backEl) backEl.style.transform = `rotateY(${backRotation}deg)`;
                card.style.transform = `translate(-50%, -50%) rotate(${cardRotation}deg)`;
              }
            },
          });
        });
      });

      // --- TABLET (601px to 900px) ---
      mm.add("(max-width: 900px) and (min-width: 601px)", () => {
        const positions = [
          { top: '35%', left: '30%' },
          { top: '35%', left: '70%' },
          { top: '65%', left: '30%' },
          { top: '65%', left: '70%' },
        ];
        const rotations = [-5, 5, -5, 5];

        cards.forEach((card, index) => {
          gsap.to(card, {
            left: positions[index].left,
            top: positions[index].top,
            rotation: rotations[index],
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });

          // Flip logic is the same, just uses the new rotations array
          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const staggerOffset = index * 0.05;
          const startOffset = 1 / 3 + staggerOffset;
          const endOffset = 2 / 3 + staggerOffset;

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalScrollHeight}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress >= startOffset && progress <= endOffset) {
                const animationProgress = (progress - startOffset) / (1 / 3);
                const frontRotation = -180 * animationProgress;
                const backRotation = 180 - 180 * animationProgress;
                const cardRotation = rotations[index] * (1 - animationProgress);

                if (frontEl) frontEl.style.transform = `rotateY(${frontRotation}deg)`;
                if (backEl) backEl.style.transform = `rotateY(${backRotation}deg)`;
                card.style.transform = `translate(-50%, -50%) rotate(${cardRotation}deg)`;
              }
            },
          });
        });
      });

      // --- MOBILE (max-width: 600px) ---
      mm.add("(max-width: 600px)", () => {
        // Jawne ustawienie stanu początkowego, aby uniknąć konfliktów z animacjami
        gsap.set(cards, { opacity: 1, yPercent: 0, top: '15%', left: '50%', rotation: 0 });

        const positions = [7, 55, 105, 155]; // Korekta pozycji: niżej, aby pierwsza karta nie była ucięta
        
        // Używamy Timeline dla pełnej kontroli sekwencji (Rozsuwanie -> Czyszczenie)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalScrollHeight}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        });

        cards.forEach((card, index) => {
          // 1. Rozsuwanie (Spread) - dodajemy do timeline w czasie 0
          tl.to(card, {
            top: `${positions[index]}%`,
            ease: "none",
            duration: 1 // Skrócenie relatywnego czasu rozsuwania (50% timeline'u)
          }, 0);

          // Flip logic without card rotation
          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const staggerOffset = index * 0.05;
          const startOffset = 1 / 3 + staggerOffset;
          const endOffset = 2 / 3 + staggerOffset;

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalScrollHeight}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress >= startOffset && progress <= endOffset) {
                const animationProgress = (progress - startOffset) / (1 / 3);
                const frontRotation = -180 * animationProgress;
                const backRotation = 180 - 180 * animationProgress;

                if (frontEl) frontEl.style.transform = `rotateY(${frontRotation}deg)`;
                if (backEl) backEl.style.transform = `rotateY(${backRotation}deg)`;
              }
            },
          });
        });

        // 2. Animacja czyszcząca (Clean) - dodajemy na końcu timeline
        tl.to(cards, {
          yPercent: -460, // Przesuń w górę
          opacity: 0,     // Ukryj
          ease: "power1.in",
          duration: 1     // Krótsza faza końcowa (25% timeline'u)
        }, ">+2");        // Dłuższa pauza (50% timeline'u), aby karty zdążyły się w pełni obrócić
      });
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="scroll-cards-wrapper">
      <section className="cards-container" ref={containerRef}>
        {privateProjects.map((project, index) => (
          <div
            key={project.id}
            className={`card ${touchedCard === project.id ? 'is-touched' : ''}`}
            id={`card-${project.id}`}
            ref={(el) => (cardsRef.current[index] = el)}
            onClick={() => setExpandedCard(project)}
            onTouchStart={() => setTouchedCard(project.id)}
            onTouchEnd={() => setTouchedCard(null)}
          >
            <div className="card-wrapper">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <AnimatedCardBackground index={index} />
                </div>
                <div className="flip-card-back">
                  <div className="card-back-video-container">
                    <video 
                      src={project.thumbnailVideo} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="card-back-video"
                    />
                    <div className="card-back-overlay"></div>
                  </div>
                  <div className="card-back-content">
                    <p>{project.title}</p>
                    <p className="card-desc">{project.shortDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      
      {/* Domknięcie */}
      <div ref={closingRef} className="section-closure" >

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          containerClassName = 'section-closure-title'
          textClassName = 'section-closure-title-part1'
        >Transforming Ideas
        </ScrollReveal>
        
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          containerClassName = 'section-closure-title'
          textClassName = 'section-closure-title-part2'
        >into Digital Reality
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={20}
          
          textClassName = 'section-closure-text'
        >The projects above demonstrate my commitment to building high-performance web applications with a focus on clean code and user experience. If you are looking for a reliable developer to bring your vision to life or optimize your current digital presence, I am ready to help. Let's connect and discuss how we can build something exceptional for your business.
        </ScrollReveal>
      </div>

      {/* Project Modal - Popover dla wybranego projektu */}
      <ProjectModal 
        isOpen={expandedCard !== null}
        project={expandedCard}
        onClose={() => setExpandedCard(null)}
      />
    </div>
  );
};

export default ScrollCards;