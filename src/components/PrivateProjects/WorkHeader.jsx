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
      // Tytuł zmniejsza się wędrując w górę — od 60% wysokości okna do góry
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

      // Nagłówek z opisem znikają dopiero, gdy karta media dojeżdża do środka
      // — fade zaczyna się 25vh po starcie pinu i kończy wraz z końcem wzrostu.
      // Element zamiast selektora: gsap.context scope'uje selektory do headerRef,
      // a '.work-showcase' leży poza nim (warning "not found" w konsoli)
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
