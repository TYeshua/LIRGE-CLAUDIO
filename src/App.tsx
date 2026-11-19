import { MotionConfig } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Team from "./components/Team";
import Partnerships from "./components/Partnerships";
import Contact from "./components/Contact";
import InstitutionalLinks from "./components/InstitutionalLinks";
import Footer from "./components/Footer";
import { useScrollSpy } from "./hooks/useScrollSpy";

const sectionIds = [
  "home",
  "about",
  "research",
  "team",
  "partnerships",
  "contact",
  "institutional-links",
];

function App() {
  const { t } = useTranslation();
  const activeSection = useScrollSpy(sectionIds);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = sectionId === "home" ? 0 : element.offsetTop - 72;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-[100svh] bg-ground text-ink">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-logo-deep focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
        >
          {t("nav.skip")}
        </a>
        <Header activeSection={activeSection} onNavigate={scrollToSection} />

        <main>
          <Hero onNavigate={scrollToSection} />
          <About />
          <Research />
          <Team />
          <Partnerships onNavigate={scrollToSection} />
          <Contact />
          <InstitutionalLinks />
        </main>

        <Footer onNavigate={scrollToSection} />
      </div>
    </MotionConfig>
  );
}

export default App;
