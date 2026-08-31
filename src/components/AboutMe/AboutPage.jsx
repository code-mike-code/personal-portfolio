import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AboutMe from './AboutMe';

// Podstrona "O mnie" — historia, statystyki, zainteresowania, galeria
export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}
