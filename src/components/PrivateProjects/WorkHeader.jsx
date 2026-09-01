import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkHeader.css';

gsap.registerPlugin(ScrollTrigger);

export default function WorkHeader() {
  const { t } = useTranslation();
  const headerRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      // The title shrinks as it travels up — from 60% of the window height to the top
      gsap.to(titleRef.current, {
        scale: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 60%',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // The heading and description fade out only as the media card reaches the center
      // — the fade starts 25vh after the pin begins and ends when the growth ends.
      // Element instead of a selector: gsap.context scopes selectors to headerRef,
      // while '.work-showcase' lies outside it (a "not found" console warning)
      gsap.to(headerRef.current, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.querySelector('.work-showcase'),
          start: 'top+=25% top',
          end: '+=60%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-header" ref={headerRef}>
      <div className="work-header-blob" aria-hidden="true"></div>
      <h2 className="work-header-title" ref={titleRef}>{t('work.title')}</h2>
      <p className="work-header-subtitle">
        {t('work.subtitle')}
      </p>
    </div>
  );
}
