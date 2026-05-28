import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scrolling behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Update document title
    document.title = 'LIRGE - Laboratório de Pesquisa Integrada em Geoenergia | UFPA';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Research />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;