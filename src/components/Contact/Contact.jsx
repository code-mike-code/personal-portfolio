import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';
import '../Hero/Hero.css';
import AnimatedHeadlinePart from '../common/AnimatedHeadlinePart';

// Endpoint po stronie hostingu (hostido/PHP) — mail idzie bezpośrednio na skrzynkę
const CONTACT_ENDPOINT = '/contact.php';

export default function Contact() {
  const { t } = useTranslation();
  const [showHeadline, setShowHeadline] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      setShowHeadline(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowHeadline(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -300px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus(null);

    // Honeypot: pole niewidoczne dla ludzi — wypełnione tylko przez boty.
    // Cichy "sukces" nie zdradza botowi, że został odfiltrowany.
    if (formRef.current.elements.website?.value) {
      setStatus({ ok: true, message: t('contact.form.success') });
      formRef.current.reset();
      setSending(false);
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        body: new FormData(formRef.current),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus({ ok: true, message: t('contact.form.success') });
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, message: t('contact.form.error') });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h2
            className="hero-title hero-title--left contact-title"
            aria-label={`${t('contact.titleLine1')} ${t('contact.titleLine2')}`}
          >
            <span aria-hidden="true">
              <AnimatedHeadlinePart text={t('contact.titleLine1')} start={showHeadline} mode="sequential" />
              <br />
              <AnimatedHeadlinePart text={t('contact.titleLine2')} start={showHeadline} mode="sequential" />
            </span>
          </h2>
          <p className="contact-intro-text">
            {t('contact.intro')}
          </p>
          <div className="contact-socials">
            <a
              href="https://github.com/code-mike-code"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social contact-social--github"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/michal-majewski-front-end-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social contact-social--linkedin"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="contact-right">
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="sr-only">{t('contact.form.labelName')}</label>
            <input name="from_name" id="name" type="text" placeholder={t('contact.form.name')} required />
            <label htmlFor="email" className="sr-only">{t('contact.form.labelEmail')}</label>
            <input name="reply_to" id="email" type="email" placeholder={t('contact.form.email')} required />
            <label htmlFor="subject" className="sr-only">{t('contact.form.labelSubject')}</label>
            <select name="subject" id="subject">
              <option value="">{t('contact.form.subjectPlaceholder')}</option>
              <option value="project">{t('contact.form.subjectProject')}</option>
              <option value="collaboration">{t('contact.form.subjectCollaboration')}</option>
              <option value="other">{t('contact.form.subjectOther')}</option>
            </select>
            <label htmlFor="message" className="sr-only">{t('contact.form.labelMessage')}</label>
            <textarea name="message" id="message" placeholder={t('contact.form.message')} required />
            {/* Honeypot antyspamowy — ukryty przed ludźmi i czytnikami ekranu */}
            <input
              type="text"
              name="website"
              className="contact-hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <button type="submit" className="contact-submit" disabled={sending}>
              {sending ? t('contact.form.sending') : t('contact.form.submit')}
            </button>
            <p role="status" aria-live="polite" className={status ? (status.ok ? 'success' : 'error') : 'sr-only'}>
              {status ? status.message : ''}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}