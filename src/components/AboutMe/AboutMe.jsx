import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import './AboutMe.css';
import photoPortrait from '../../assets/img/img-6.webp';
import photoSkate from '../../assets/img/img-1.webp';
import photoKite from '../../assets/img/img-2.webp';
import photoCat from '../../assets/img/img-3.webp';
import photoLemur from '../../assets/img/img-4.webp';
import photoSnow from '../../assets/img/img-5.webp';

const interests = [
  'Skateboarding, snowboarding, kitesurfing',
  'Cats (the fluffy boss lives with me)',
  'Travel and wildlife encounters',
  'Good music and better coffee',
];

const galleryPhotos = [
  { src: photoSkate, caption: 'Skatepark session', rot: -3 },
  { src: photoKite, caption: 'Chasing wind', rot: 2 },
  { src: photoCat, caption: 'Project manager on duty', rot: -2 },
  { src: photoLemur, caption: 'Making new friends', rot: 2.5 },
  { src: photoSnow, caption: 'Above the clouds', rot: -2 },
  { src: photoPortrait, caption: 'Me & the boss', rot: 3 },
];

export default function AboutMe() {
  return (
    <section id='about' className="about-section">
      {/* Nagłówek */}
      <div className="about-header">
        <div className="about-header-blob" aria-hidden="true"></div>
        <h2 className="about-header-title">
          The story behind
          <br />
          DevMike
        </h2>
      </div>

      {/* Intro: zdjęcie + bio */}
      <div className="about-intro">
        <div className="about-photo-wrap">
          <span className="about-shape-circle" aria-hidden="true"></span>
          <svg
            className="about-shape-star"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <path
              d="M50 5 L58 38 L95 42 L64 60 L74 95 L50 72 L26 95 L36 60 L5 42 L42 38 Z"
              fill="currentColor"
            />
          </svg>
          <img
            className="about-photo"
            src={photoPortrait}
            alt="Michał with his cat"
            loading="lazy"
          />
        </div>

        <div className="about-bio">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
            containerClassName="about-bio-heading-container"
            textClassName="about-bio-heading"
          >Hey, I'm Michał
          </ScrollReveal>

          <p className="about-bio-text">
            Front-End Developer passionate about building efficient, user-friendly
            interfaces. With over 500 hours of intensive, mentor-led training,
            I specialize in modern React development — writing high-quality code
            and using modern practices to make every project robust and reliable.
          </p>
          <p className="about-bio-text">
            Good software requires both logic and empathy. My background in client
            services honed my communication skills, allowing me to truly understand
            user needs. I am a proactive problem-solver who values organized
            workflows and collaboration to deliver clean, impactful solutions.
          </p>
          <p className="about-bio-tagline">
            Independent by nature, collaborative by choice.
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">500+</span>
              <span className="about-stat-label">hours of training</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">5+</span>
              <span className="about-stat-label">client projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal interests */}
      <div className="about-interests">
        <span className="about-interests-dot" aria-hidden="true"></span>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          containerClassName="about-interests-heading-container"
          textClassName="about-interests-heading"
        >Personal interests
        </ScrollReveal>
        <ul className="about-interests-list">
          {interests.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Galeria */}
      <div className="about-gallery">
        {galleryPhotos.map((photo) => (
          <figure
            className="about-gallery-item"
            key={photo.caption}
            style={{ '--rot': `${photo.rot}deg` }}
          >
            <img src={photo.src} alt={photo.caption} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
