import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';
import '../Hero/Hero.css';
import emailjs from '@emailjs/browser';
import AnimatedHeadlinePart from '../common/AnimatedHeadlinePart';

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

    // Get credentials from environment variables
    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Honeypot: pole niewidoczne dla ludzi — wypełnione tylko przez boty.
    // Cichy "sukces" nie zdradza botowi, że został odfiltrowany.
    if (formRef.current.elements.website?.value) {
      setStatus({ ok: true, message: t('contact.form.success') });
      formRef.current.reset();
      setSending(false);
      return;
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
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