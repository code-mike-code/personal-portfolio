import React, { useEffect, useState, useRef } from 'react';
import './Contact.css';
import '../Hero/Hero.css';
import emailjs from '@emailjs/browser';

function AnimatedHeadlinePart({ text, start }) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (start && visibleCount < text.length) {
      const timeout = setTimeout(() => setVisibleCount(visibleCount + 1), 38);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, text.length, start]);
  return (
    <span className="hero-title-part">
      {text.split('').map((char, i) => (
        <span
          className={'hero-title__char' + (i < visibleCount ? ' hero-title__char--visible' : '')}
          key={i}
          aria-hidden={i >= visibleCount}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
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

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus({ ok: true, message: 'Message sent.' });
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, message: 'Message sent error!' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h1 className="hero-title hero-title--left contact-title">
            <AnimatedHeadlinePart text="Let's" start={showHeadline} />
            <br />
            <AnimatedHeadlinePart text="Connect" start={showHeadline} />
          </h1>
        </div>
        <div className="contact-right">
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <input name="from_name" id="name" type="text" placeholder=" Name" required />
            <input name="reply_to" id="email" type="email" placeholder=" Email" required />
            <select name="subject" id="subject">
              <option value=""> Subject...</option>
              <option value="project">Project</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
            <textarea name="message" id="message" placeholder="Write a message..." required />
            <button type="submit" className="contact-submit" disabled={sending}>
              {sending ? 'Sending…' : 'Submit Request'}
            </button>
            {status && <p className={status.ok ? 'success' : 'error'}>{status.message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}