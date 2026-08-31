import React from 'react';
import { useTranslation } from 'react-i18next';
import './ForWho.css';

export default function ForWho() {
  const { t } = useTranslation();
  const items = t('forWho.items', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section id="dla-kogo" className="forwho-section">
      <div className="forwho-inner">
        <header className="forwho-head">
          <p className="forwho-kicker">{t('forWho.kicker')}</p>
          <h2 className="forwho-heading">{t('forWho.heading')}</h2>
        </header>
        <ul className="forwho-grid">
          {list.map((item, i) => (
            <li className="forwho-card" key={i}>
              <span className="forwho-card-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="forwho-card-title">{item.title}</h3>
              <p className="forwho-card-desc">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
