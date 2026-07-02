import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <Header />
      <BottomNav />
      <Hero />
      <PrivateProjects />
      <Projects />
      <AboutMe />
      <TechBanner />
      <Contact />
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
  return (
    <ErrorBoundary> 
    <BrowserRouter>
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
    </BrowserRouter>
    </ErrorBoundary>
  );
}