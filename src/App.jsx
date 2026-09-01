import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Header from './components/Header/Header';
import BottomNav from './components/Header/BottomNav';
import Hero from './components/Hero/Hero';
import ForWho from './components/ForWho/ForWho';
import Offer from './components/Offer/Offer';
import Process from './components/Process/Process';
import Faq from './components/Faq/Faq';
import FinalCta from './components/FinalCta/FinalCta';
import PrivateProjects from './components/PrivateProjects/PrivateProjects';
import TechBanner from './components/Banner/TechBanner';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import Cursor from './components/Cursor/Cursor';
// import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import { CookieConsentModal } from "./components/common/CookieConsentModal";
import ErrorBoundary from './components/common/ErrorBoundary';
import { initGoogleAnalytics, trackPageView } from './utils/analytics';

// Fires a GA page_view on every client-side route change (no-op until GA is
// initialized after consent).
function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}


function MainLayout() {
  useEffect(() => {
    const consent = window.localStorage.getItem("devmike_cookie_consent");
    if (consent === "accepted") {
      initGoogleAnalytics();
    }
    // if "declined" – GA is not loaded
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <BottomNav />
      <main id="main">
        <Hero />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        <ForWho />
        <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>
        <Offer />
        <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>
        <Testimonials />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        {/* next dot (coral) lives inside PrivateProjects, below work-showcase */}
        <PrivateProjects limit={3} />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        <Process />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        <Faq />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        <TechBanner />
        <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>
        <FinalCta />
        <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>
        <Contact />
      </main>
      <Footer />
       <CookieConsentModal
        onAccept={() => {
          initGoogleAnalytics();
        }}
        onDecline={() => {
          // consent declined — GA is not loaded
        }}
      />
    </>
  );
}

const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'));
const AboutPage = lazy(() => import('./components/AboutMe/AboutPage'));
const WorkPage = lazy(() => import('./components/PrivateProjects/WorkPage'));


export default function App() {
  // key = language: changing it remounts the layout so GSAP/Lenis animations
  // and text-length-derived state (Hero) start from a clean slate
  const { t, i18n } = useTranslation();
  return (
    <ErrorBoundary>
    <BrowserRouter>
    <Cursor />
    <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<MainLayout key={i18n.resolvedLanguage} />} />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<div>{t('common.loading')}</div>}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/o-mnie"
          element={
            <Suspense fallback={<div>{t('common.loading')}</div>}>
              <AboutPage key={i18n.resolvedLanguage} />
            </Suspense>
          }
        />
        <Route
          path="/realizacje"
          element={
            <Suspense fallback={<div>{t('common.loading')}</div>}>
              <WorkPage key={i18n.resolvedLanguage} />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}