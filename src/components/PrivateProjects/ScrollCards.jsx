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

const ScrollCards = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const closingRef = useRef(null);
  const [showClosing, setShowClosing] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

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
      const positions = [25, 41, 59, 75];
      const rotations = [-15, -7.5, 7.5, 15];

      // 1. Przypięcie sekcji (Pinning)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // 2. Rozsuwanie kart (Spread)
      cards.forEach((card, index) => {
        gsap.to(card, {
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
            id: `spread-${index}`,
          },
        });
      });

      // 3. Obrót i flip kart (Rotate & Flip)
      cards.forEach((card, index) => {
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
          id: `rotate-flip-${index}`,
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
            className="card"
            id={`card-${project.id}`}
            ref={(el) => (cardsRef.current[index] = el)}
            onClick={() => setExpandedCard(project)}
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