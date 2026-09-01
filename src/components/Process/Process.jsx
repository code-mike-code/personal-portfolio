import React from 'react';
import { useTranslation } from 'react-i18next';
import './Process.css';

export default function Process() {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true });
  const list = Array.isArray(steps) ? steps : [];

  return (
    <section id="process" className="process-section">
      <div className="process-inner">
        <header className="process-head">
          <p className="process-kicker">{t('process.kicker')}</p>
          <h2 className="process-heading">{t('process.heading')}</h2>
        </header>
        <ol className="process-steps">
          {list.map((step, i) => (
            <li className="process-step" key={i}>
              <span className="process-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
