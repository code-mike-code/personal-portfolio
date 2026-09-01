import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../common/Button';
import { privateProjects } from './private-projects';
import './WorkPage.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The video is fetched only once the card enters the viewport (files are several MB).
// The poster (first frame) is visible right away.
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
    <div className={`wp-media ${isMobile ? 'wp-media--portrait' : 'wp-media--landscape'}`} ref={wrapRef}>
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload={inView ? 'metadata' : 'none'}
        className="wp-video"
      />
      <button
        type="button"
        className="wp-video-pause"
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
    <article className="wp-row">
      <div className="wp-row-media">
        <ProjectVideo project={project} />
      </div>
      <div className="wp-row-body">
        <span className="wp-row-num">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="wp-row-title">{project.title}</h2>
        <p className="wp-row-desc">{t(`work.projects.${project.id}.short`)}</p>

        {hasCase && (
          <div className="wp-case">
            {c.challenge && (
              <div className="wp-case-block">
                <h3 className="wp-case-label">{t('work.caseChallenge')}</h3>
                <p className="wp-case-text">{c.challenge}</p>
              </div>
            )}
            {Array.isArray(c.scope) && c.scope.length > 0 && (
              <div className="wp-case-block">
                <h3 className="wp-case-label">{t('work.caseScope')}</h3>
                <ul className="wp-case-list">
                  {c.scope.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
            {Array.isArray(c.result) && c.result.length > 0 && (
              <div className="wp-case-block">
                <h3 className="wp-case-label">{t('work.caseResult')}</h3>
                <ul className="wp-case-list wp-case-list--result">
                  {c.result.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {project.liveUrl && (
          <Button
            as="a"
            className="wp-live"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            {t('work.caseVisit')} ↗
          </Button>
        )}
      </div>
    </article>
  );
}

export default function WorkPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
        <section className="wp-page">
          <div className="wp-inner">
            <header className="wp-head">
              <p className="wp-kicker">{t('work.pageKicker')}</p>
              <h1 className="wp-title">{t('work.pageTitle')}</h1>
              <p className="wp-subtitle">{t('work.pageSubtitle')}</p>
            </header>

            <div className="wp-list">
              {privateProjects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </div>

            <div className="wp-back">
              <Link to="/" className="wp-back-link">
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
