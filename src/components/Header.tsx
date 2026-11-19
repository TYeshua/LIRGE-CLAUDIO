import React, { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import LirgeMark from "./LirgeMark";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

// Sombra só numa sobreposição que flutua de fato
const MENU_SHADOW = "shadow-[0_24px_40px_-24px_rgb(0_0_0/0.35)]"; // taste-skill-ignore

const EASE = [0.25, 0.1, 0.25, 1] as const;
const swap = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: EASE },
};

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const isPt = i18n.language?.startsWith("pt");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  const menuItems = [
    { id: "home", label: t("menu.home") },
    { id: "about", label: t("menu.about") },
    { id: "research", label: t("menu.research") },
    { id: "team", label: t("menu.team") },
    { id: "partnerships", label: t("menu.partnerships") },
    { id: "contact", label: t("menu.contact") },
    { id: "institutional-links", label: t("menu.institutionalLinks") },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = isPt ? "pt-BR" : "en";
  }, [isPt]);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => i18n.changeLanguage(isPt ? "en" : "pt");

  // Troca de tema com um esmaecimento curto (quando o navegador permite)
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      flushSync(() => setTheme(next));
    };
    const doc = document as ViewTransitionDoc;
    if (reduce || !doc.startViewTransition) {
      apply();
      return;
    }
    doc.startViewTransition(apply);
  };

  const iconButton = "icon-btn inline-flex h-10 w-10 items-center justify-center rounded-full text-ink";

  const ThemeIcon = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={theme} {...swap} className="inline-flex">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-ground" : "bg-transparent"
      }`}
    >
      <nav className="page flex h-[4.5rem] items-center justify-between gap-6" aria-label={t("nav.main")}>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="group flex items-center gap-2.5"
          aria-label={t("nav.home")}
        >
          <LirgeMark className="h-9 w-9" />
          <span className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-logo-bright">
            LIRGE
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {menuItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-current={active ? "true" : undefined}
                className={`relative px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200 ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className="link-line">{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-logo-bright"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
              </a>
            );
          })}

          <div className="ml-3 flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className={iconButton}
              aria-label={theme === "dark" ? t("nav.themeToLight") : t("nav.themeToDark")}
            >
              {ThemeIcon}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              className={`${iconButton} w-auto px-3 text-sm font-semibold`}
              aria-label={t("nav.language")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isPt ? "en" : "pt"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="inline-block"
                >
                  {isPt ? "EN" : "PT"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className={iconButton}
            aria-label={theme === "dark" ? t("nav.themeToLight") : t("nav.themeToDark")}
          >
            {ThemeIcon}
          </button>
          <button
            type="button"
            className={iconButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={isMobileMenuOpen ? "x" : "menu"} {...swap} className="inline-flex">
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* progresso de leitura, no azul da logo */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-logo-bright transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={`bg-ground pb-6 ${MENU_SHADOW} lg:hidden`}
          >
            <motion.div
              className="page flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.02 } } }}
            >
              {menuItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2, ease: EASE } } }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    aria-current={active ? "true" : undefined}
                    className={`group flex items-center gap-3 py-3 font-display text-2xl font-semibold tracking-[-0.02em] transition-colors ${
                      active ? "text-ink" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full bg-logo-bright transition-opacity duration-200 ${
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <span className="link-line">{item.label}</span>
                  </motion.a>
                );
              })}
              <motion.button
                type="button"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                onClick={toggleLanguage}
                className="btn-fill mt-4 self-start rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-ink"
              >
                {isPt ? "English version" : "Versão em português"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
