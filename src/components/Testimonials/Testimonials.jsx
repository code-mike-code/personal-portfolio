import React from 'react';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';

/**
 * Client testimonials section.
 *
 * NOTE (integrity): quotes are attributed to named, real people.
 * Before the site goes public EACH person must approve their
 * quote (legal requirement — UOKiK / omnibus directive: reviews only with consent).
 * Treści żyją w src/i18n/locales/*.json pod kluczem `testimonials`.
 */
export default function Testimonials() {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  if (list.length === 0) return null;

  return (
    <section id="testimonials" className="testimonials-section">
      <h2 className="testimonials-heading">{t('testimonials.heading')}</h2>
      <ul className="testimonials-grid">
        {list.map((item, i) => (
          <li className="testimonial-card" key={`${item.company}-${i}`}>
            <span className="testimonial-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="testimonial-quote">{item.quote}</blockquote>
            <figcaption className="testimonial-author">
              <span className="testimonial-name">{item.author}</span>
              <span className="testimonial-company">{item.company}</span>
            </figcaption>
          </li>
        ))}
      </ul>
    </section>
  );
}
