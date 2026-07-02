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
  'Gravity & enduro mountain biking',
  'Boardsports — skate, snowboard, travel with wind',
  'Boxing, freediving — sport freak in general',
  'Outdoors, tech, travel',
  'Electronic music, hip-hop, festivals & friends',
  'Cats (the fluffy boss lives with me)',
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
          Code Mike
        </h2>
      </div>

      {/* Intro: zdjęcie + bio */}
      <div className="about-intro">
        <div className="about-photo-wrap">
          <span className="about-shape-circle" aria-hidden="true"></span>
          <span className="about-shape-circle-teal" aria-hidden="true"></span>
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
            AI-Augmented Frontend Developer specializing in building efficient and
            responsive interfaces in React and TypeScript. I support the coding
            process with advanced AI tools such as Claude Code and AI Agents, which
            translates into higher-quality delivered solutions and shorter
            turnaround times. I built a solid technical foundation through
            independent practice in the React ecosystem, JavaScript, and modern
            frontend tools.
          </p>
          <p className="about-bio-text">
            Good software requires both logic and empathy. I am a proactive
            problem-solver who values organized workflows and collaboration to
            deliver clean, impactful solutions.
          </p>
          <p className="about-bio-tagline">
            Independent by nature, collaborative by choice.
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">5+</span>
              <span className="about-stat-label">client projects</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">2×</span>
              <span className="about-stat-label">faster delivery with AI tools</span>
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
