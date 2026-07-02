import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { technologies } from './techIcons';
import './TechBanner.css';

const TechBanner = () => {
  const carouselRef = useRef(null);
  const bannerRef = useRef(null);


  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    const banner = bannerRef.current;
    if (!carousel || !banner) return;

    // Obliczamy szerokość połowy zawartości (jednego zestawu ikon)
    const loopWidth = carousel.scrollWidth / 2;

    // Ustawiamy stan początkowy na piksele (x), a nie procenty, aby uniknąć konfliktu z dragiem
    gsap.set(carousel, { x: 0, xPercent: 0 });

    const tween = gsap.to(carousel, {
      x: -loopWidth, // Animujemy do ujemnej wartości szerokości pętli w pikselach
      duration: 30, // Czas trwania jednego cyklu
      ease: 'none',
      repeat: -1,
    });

    let startX = 0;
    let startX_tween = 0;
    let isDragging = false;

    const onDragStart = (e) => {
      isDragging = true;
      banner.classList.add('is-dragging');
      // e.preventDefault(); // Zakomentowane, aby nie blokować scrollowania strony na mobile, jeśli gest jest pionowy
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      startX = x;
      startX_tween = gsap.getProperty(carousel, 'x');
      // Animacja jest już pauzowana przez najechanie myszą (mouseenter), ale dla touch musimy zadbać o pauzę
      tween.pause();
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const walk = x - startX;
      gsap.set(carousel, { x: startX_tween + walk });
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      banner.classList.remove('is-dragging');
      
      // Po zakończeniu przeciągania, synchronizujemy postęp animacji
      const currentX = gsap.getProperty(carousel, 'x');
      
      // Obliczamy progress (0 do 1) na podstawie przesunięcia w pikselach
      // Ponieważ ruch jest w lewo (ujemny x), dzielimy -currentX przez loopWidth
      let progress = (-currentX / loopWidth) % 1;

      // Obsługa przypadku, gdy użytkownik przeciągnął w prawo (dodatni x)
      if (progress < 0) {
        progress += 1;
      }
      
      // Aktualizujemy postęp tweenera i wznawiamy. 
      // Ponieważ tween operuje teraz na 'x' (pikselach), automatycznie nadpisze pozycję z draga, zachowując ciągłość.
      tween.progress(progress).resume();
    };

    // Pauzowanie animacji przy najechaniu
    const handleMouseEnter = () => tween.pause();
    const handleMouseLeave = () => {
      if (!isDragging) tween.resume();
    };

    // Dodajemy event listenery
    banner.addEventListener('mouseenter', handleMouseEnter);
    banner.addEventListener('mouseleave', handleMouseLeave);
    banner.addEventListener('mousedown', onDragStart);
    banner.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);

    return () => {
      tween.kill();
      banner.removeEventListener('mouseenter', handleMouseEnter);
      banner.removeEventListener('mouseleave', handleMouseLeave);
      banner.removeEventListener('mousedown', onDragStart);
      banner.removeEventListener('touchstart', onDragStart);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, []);

  return (
    <section className="tech-banner" ref={bannerRef}>
      <div className="banner-container">
        {/* Gradient overlays for smooth fade effect */}
        <div className="gradient-left"></div>
        <div className="gradient-right"></div>
        
        {/* Carousel container */}
        <div className="carousel" ref={carouselRef}>
          {/* First set of technologies */}
          {technologies.map((tech, index) => (
            <div key={`first-${index}`} className="tech-item">
              <div className="icon-container">
                {tech.icon}
              </div>
              <span className="tech-name">
                {tech.name}
              </span>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {technologies.map((tech, index) => (
            <div key={`second-${index}`} className="tech-item">
              <div className="icon-container">
                {tech.icon}
              </div>
              <span className="tech-name">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechBanner;