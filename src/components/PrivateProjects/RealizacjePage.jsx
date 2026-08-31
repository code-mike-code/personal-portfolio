import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { privateProjects } from './private-projects';
import './RealizacjePage.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wideo dobiera się dopiero gdy karta wjeżdża w viewport (pliki mają kilka MB).
// Poster (pierwsza klatka) widać od razu.
function ProjectVideo({ project }) {
  const { t } = useTranslation();
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  );
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, paused]);

  const videoSrc = isMobile
    ? project.thumbnailVideo || project.fullVideo
    : project.fullVideo || project.thumbnailVideo;
  const posterSrc = isMobile
    ? project.thumbnailPoster || project.fullPoster
    : project.fullPoster || project.thumbnailPoster;

  return (
    <div className={`rlz-media ${isMobile ? 'rlz-media--portrait' : 'rlz-media--landscape'}`} ref={wrapRef}>
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload={inView ? 'metadata' : 'none'}
        className="rlz-video"
      />
      <button
        type="button"
        className="rlz-video-pause"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? t('work.videoPlayAria') : t('work.videoPauseAria')}
      >
        {paused ? '▶' : '❚❚'}
      </button>
    </div>
  );
}

function ProjectRow({ project, index }) {
  const { t } = useTranslation();
  const c = t(`work.projects.${project.id}.case`, { returnObjects: true });
  const hasCase = c && typeof c === 'object' && !Array.isArray(c);

  return (
    <article className="rlz-row">
      <div className="rlz-row-media">
        <ProjectVideo project={project} />
      </div>
      <div className="rlz-row-body">
        <span className="rlz-row-num">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="rlz-row-title">{project.title}</h2>
        <p className="rlz-row-desc">{t(`work.projects.${project.id}.short`)}</p>

        {hasCase && (
          <div className="rlz-case">
            {c.challenge && (
              <div className="rlz-case-block">
                <h3 className="rlz-case-label">{t('work.caseChallenge')}</h3>
                <p className="rlz-case-text">{c.challenge}</p>
              </div>
            )}
            {Array.isArray(c.scope) && c.scope.length > 0 && (
              <div className="rlz-case-block">
                <h3 className="rlz-case-label">{t('work.caseScope')}</h3>
                <ul className="rlz-case-list">
                  {c.scope.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
            {Array.isArray(c.result) && c.result.length > 0 && (
              <div className="rlz-case-block">
                <h3 className="rlz-case-label">{t('work.caseResult')}</h3>
                <ul className="rlz-case-list rlz-case-list--result">
                  {c.result.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {project.liveUrl && (
          <a
            className="rlz-live"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('work.caseVisit')} ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function RealizacjePage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
        <section className="rlz-page">
          <div className="rlz-inner">
            <header className="rlz-head">
              <p className="rlz-kicker">{t('work.pageKicker')}</p>
              <h1 className="rlz-title">{t('work.pageTitle')}</h1>
              <p className="rlz-subtitle">{t('work.pageSubtitle')}</p>
            </header>

            <div className="rlz-list">
              {privateProjects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </div>

            <div className="rlz-back">
              <Link to="/" className="rlz-back-link">
                <span aria-hidden="true">←</span> {t('common.backHome')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
