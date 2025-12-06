import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import BottomNav from './components/Header/BottomNav';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import AboutMe from './components/AboutMe/AboutMe';
import TechBanner from './components/Banner/TechBanner';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import Cursor from './components/Cursor/Cursor';
// import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import { CookieConsentModal } from "./components/common/CookieConsentModal";
import ErrorBoundary from './components/common/ErrorBoundary';


function MainLayout() {
  useEffect(() => {
    const consent = window.localStorage.getItem("devmike_cookie_consent");
    if (consent === "accepted") {
      // tutaj inicjalizujesz Google Analytics (gtag/GA4)
      // initGoogleAnalytics();
    }
    // jeśli "declined" – nie ładujesz GA
  }, []);
  return (
    <>
      <Header />
      <BottomNav />
      <Hero />
      <Projects />
      <AboutMe />
      <TechBanner />
      <Contact />
      <Footer />
       <CookieConsentModal
        onAccept={() => {
          // initGoogleAnalytics();
        }}
        onDecline={() => {
          // opcjonalnie: upewnij się, że GA nie jest ładowane
        }}
      />
    </>
  );
}

const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'));


export default function App() {
  return (
    <ErrorBoundary> 
    <HashRouter>
    <Cursor />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route 
          path="/privacy-policy" 
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivacyPolicy />
            </Suspense>
          } 
        />
      </Routes>
    </HashRouter>
    </ErrorBoundary>
  );
}