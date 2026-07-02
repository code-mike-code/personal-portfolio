// Google Analytics 4 — ładowany wyłącznie po zgodzie użytkownika (cookie consent).
// Measurement ID pochodzi ze zmiennej środowiskowej, brak ID = brak GA (dev/preview).

export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

let initialized = false;

export function initGoogleAnalytics() {
  if (initialized || !GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });

  initialized = true;
}
