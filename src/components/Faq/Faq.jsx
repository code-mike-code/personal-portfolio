import React from 'react';
import { useTranslation } from 'react-i18next';
import './Faq.css';

export default function Faq() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <header className="faq-head">
          <p className="faq-kicker">{t('faq.kicker')}</p>
          <h2 className="faq-heading">{t('faq.heading')}</h2>
        </header>
        <div className="faq-list">
          {list.map((item, i) => (
            <details className="faq-item" key={i}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
