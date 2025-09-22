import React from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import News from "./components/News";
import EventsPublications from "./components/EventsPublications";
import About from "./components/About";
import Research from "./components/Research";
import Projects from "./components/Projects"; // ✅ agora vem antes de Team
import Team from "./components/Team";
import Partnerships from "./components/Partnerships";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useScrollSpy } from "./hooks/useScrollSpy";

function App() {
  const sectionIds = [
    "home",
    "news",
    "events-publications",
    "about",
    "research",
    "projects", // ✅ movido logo após research
    "team",
    "partnerships",
    "contact",
  ];
  const activeSection = useScrollSpy(sectionIds);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-lirge-darker text-white">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <Hero onNavigate={scrollToSection} />
        <News />
        <EventsPublications />
        <About />
        <Research />
        <Projects /> {/* ✅ agora aparece logo após Research */}
        <Team />
        <Partnerships />
        <Contact />
      </main>

      <Footer />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-lirge-cyan/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-lirge-teal/5 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}

export default App;