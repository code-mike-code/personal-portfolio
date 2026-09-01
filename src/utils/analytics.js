// Google Analytics 4 — loaded only after the user's consent (cookie consent).
// The Measurement ID comes from an environment variable; no ID = no GA (dev/preview).

const RAW_GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
// Treat the .env placeholder as "not configured" so a template value never
// initializes GA with an invalid stream.
export const GA_MEASUREMENT_ID =
  RAW_GA_ID && RAW_GA_ID !== 'G-XXXXXXXXXX' ? RAW_GA_ID : undefined;

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
    // Single-page app: we send page_view manually on route changes.
    send_page_view: true,
  });

  initialized = true;
}

// Send a page_view for SPA route changes. GA4's initial config fires one
// page_view; client-side navigations need an explicit event.
export function trackPageView(path) {
  if (!initialized || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Generic custom-event helper (e.g. CTA clicks, form submits).
export function trackEvent(name, params = {}) {
  if (!initialized || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
