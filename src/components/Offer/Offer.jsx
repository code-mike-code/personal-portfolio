import React from 'react';
import { useTranslation } from 'react-i18next';
import { CALENDLY_URL } from '../../constants';
import './Offer.css';

export default function Offer() {
  const { t } = useTranslation();
  const services = t('offer.services', { returnObjects: true });
  const includes = t('offer.includes', { returnObjects: true });
  const serviceList = Array.isArray(services) ? services : [];
  const includeList = Array.isArray(includes) ? includes : [];

  return (
    <section id="oferta" className="offer-section">
      <div className="offer-inner">
        <header className="offer-head">
          <p className="offer-kicker">{t('offer.kicker')}</p>
          <h2 className="offer-heading">{t('offer.heading')}</h2>
          <p className="offer-forwho">{t('offer.forWho')}</p>
        </header>

        <div className="offer-grid">
          <div className="offer-price-card">
            <span className="offer-price-heading">{t('offer.priceHeading')}</span>
            <span className="offer-price-value">{t('offer.priceValue')}</span>
            <p className="offer-price-note">{t('offer.priceNote')}</p>
            <a
              className="offer-cta"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('offer.cta')} ↗
            </a>
          </div>

          <div className="offer-lists">
            <div className="offer-list-block">
              <h3 className="offer-list-label">{t('offer.servicesLabel')}</h3>
              <ul className="offer-list offer-list--services">
                {serviceList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="offer-list-block">
              <h3 className="offer-list-label">{t('offer.includesLabel')}</h3>
              <ul className="offer-list offer-list--includes">
                {includeList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
