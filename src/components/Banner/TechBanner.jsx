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

    // Compute the width of half the content (one set of icons)
    const loopWidth = carousel.scrollWidth / 2;

    // Set the initial state in pixels (x), not percentages, to avoid conflict with the drag
    gsap.set(carousel, { x: 0, xPercent: 0 });

    const tween = gsap.to(carousel, {
      x: -loopWidth, // Animate to the negative loop width in pixels
      duration: 50, // Czas trwania jednego cyklu
      ease: 'none',
      repeat: -1,
    });

    let startX = 0;
    let startX_tween = 0;
    let isDragging = false;

    const onDragStart = (e) => {
      isDragging = true;
      banner.classList.add('is-dragging');
      // e.preventDefault(); // Commented out so it does not block page scrolling on mobile when the gesture is vertical
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      startX = x;
      startX_tween = gsap.getProperty(carousel, 'x');
      // The animation is already paused on mouseenter, but for touch we must ensure the pause
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
      
      // After the drag ends, sync the animation progress
      const currentX = gsap.getProperty(carousel, 'x');
      
      // Compute progress (0 to 1) from the pixel offset
      // Since motion is leftward (negative x), we divide -currentX by loopWidth
      let progress = (-currentX / loopWidth) % 1;

      // Handle the case where the user dragged right (positive x)
      if (progress < 0) {
        progress += 1;
      }
      
      // Update the tween progress and resume. 
      // Since the tween now operates on 'x' (pixels), it automatically overrides the drag position, keeping continuity.
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