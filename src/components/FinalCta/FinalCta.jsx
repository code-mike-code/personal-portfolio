import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import { CALENDLY_URL } from '../../constants';
import './FinalCta.css';

export default function FinalCta() {
  const { t } = useTranslation();

  return (
    <section id="final-cta" className="finalcta-section">
      <div className="finalcta-inner">
        <h2 className="finalcta-heading">{t('finalCta.heading')}</h2>
        <p className="finalcta-text">{t('finalCta.text')}</p>
        <Button
          as="a"
          className="finalcta-btn"
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="teal"
        >
          {t('finalCta.cta')} ↗
        </Button>
        <p className="finalcta-alt">{t('finalCta.alt')}</p>
      </div>
    </section>
  );
}
