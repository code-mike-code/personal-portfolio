import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../common/ScrollReveal';
import './AboutMe.css';
import photoPortrait from '../../assets/img/img-6.webp';
import photoSkate from '../../assets/img/img-1.webp';
import photoKite from '../../assets/img/img-2.webp';
import photoCat from '../../assets/img/img-3.webp';
import photoLemur from '../../assets/img/img-4.webp';
import photoSnow from '../../assets/img/img-5.webp';

const galleryPhotos = [
  { src: photoSkate, rot: -3 },
  { src: photoKite, rot: 2 },
  { src: photoCat, rot: -2 },
  { src: photoLemur, rot: 2.5 },
  { src: photoSnow, rot: -2 },
  { src: photoPortrait, rot: 3 },
];

export default function AboutMe() {
  const { t } = useTranslation();
  const interests = t('about.interests', { returnObjects: true });
  const galleryCaptions = t('about.gallery', { returnObjects: true });

  return (
    <section id='about' className="about-section">
      {/* Nagłówek */}
      <div className="about-header">
        <div className="about-header-blob" aria-hidden="true"></div>
        <h2 className="about-header-title">
          {t('about.headingLine1')}
          <br />
          {t('about.headingLine2')}
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
            alt={t('about.photoAlt')}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="about-bio">
          <ScrollReveal
            as="h3"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
            containerClassName="about-bio-heading-container"
            textClassName="about-bio-heading"
          >{t('about.bioHeading')}
          </ScrollReveal>

          <p className="about-bio-text">
            {t('about.bio1')}
          </p>
          <p className="about-bio-text">
            {t('about.bio2')}
          </p>
          <p className="about-bio-tagline">
            {t('about.tagline')}
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">5+</span>
              <span className="about-stat-label">{t('about.statProjects')}</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">2×</span>
              <span className="about-stat-label">{t('about.statDelivery')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal interests */}
      <div className="about-interests">
        <span className="about-interests-dot" aria-hidden="true"></span>
        <ScrollReveal
          as="h3"
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          containerClassName="about-interests-heading-container"
          textClassName="about-interests-heading"
        >{t('about.interestsHeading')}
        </ScrollReveal>
        <ul className="about-interests-list">
          {interests.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Galeria */}
      <div className="about-gallery">
        {galleryPhotos.map((photo, index) => (
          <figure
            className="about-gallery-item"
            key={galleryCaptions[index]}
            style={{ '--rot': `${photo.rot}deg` }}
          >
            <img src={photo.src} alt={galleryCaptions[index]} loading="lazy" />
            <figcaption>{galleryCaptions[index]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
