import React from 'react';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';

/**
 * Sekcja opinii klientów.
 *
 * UWAGA (integralność): cytaty są przypisane do imiennych, realnych osób.
 * Przed publicznym uruchomieniem strony KAŻDA osoba musi zatwierdzić swój
 * cytat (wymóg prawny — UOKiK / dyrektywa omnibus: opinie tylko za zgodą).
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
