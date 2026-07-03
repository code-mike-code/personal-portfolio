import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Header from './components/Header/Header';
import BottomNav from './components/Header/BottomNav';
import Hero from './components/Hero/Hero';
import PrivateProjects from './components/PrivateProjects/PrivateProjects';
import Projects from './components/Projects/Projects';
import AboutMe from './components/AboutMe/AboutMe';
import TechBanner from './components/Banner/TechBanner';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import Cursor from './components/Cursor/Cursor';
// import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import { CookieConsentModal } from "./components/common/CookieConsentModal";
import ErrorBoundary from './components/common/ErrorBoundary';
import { initGoogleAnalytics } from './utils/analytics';


function MainLayout() {
  useEffect(() => {
    const consent = window.localStorage.getItem("devmike_cookie_consent");
    if (consent === "accepted") {
      initGoogleAnalytics();
    }
    // jeśli "declined" – nie ładujesz GA
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <BottomNav />
      <main id="main">
        <Hero />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        {/* kolejna kropka (coral) jest wewnątrz PrivateProjects, pod work-showcase */}
        <PrivateProjects />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        <Projects />
        <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>
        <AboutMe />
        <span className="section-divider-dot section-divider-dot--teal" aria-hidden="true"></span>
        <TechBanner />
        <span className="section-divider-dot section-divider-dot--coral" aria-hidden="true"></span>
        <Contact />
      </main>
      <Footer />
       <CookieConsentModal
        onAccept={() => {
          initGoogleAnalytics();
        }}
        onDecline={() => {
          // brak zgody — GA nie jest ładowane
        }}
      />
    </>
  );
}

const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'));


export default function App() {
  // key = język: zmiana przemontowuje layout, więc animacje GSAP/Lenis
  // i stany pochodne od długości tekstu (Hero) startują czysto
  const { t, i18n } = useTranslation();
  return (
    <ErrorBoundary>
    <BrowserRouter>
    <Cursor />
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
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}