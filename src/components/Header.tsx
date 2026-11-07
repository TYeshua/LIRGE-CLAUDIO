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

const EASE = [0.22, 1, 0.36, 1] as const;
const swap = {
  initial: { rotate: -90, scale: 0.4, opacity: 0 },
  animate: { rotate: 0, scale: 1, opacity: 1 },
  exit: { rotate: 90, scale: 0.4, opacity: 0 },
  transition: { duration: 0.3, ease: EASE },
};

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

/** Anel azul da logo que se expande a partir do botão de tema. */
function themeRing(x: number, y: number, radius: number) {
  const ring = document.createElement("div");
  Object.assign(ring.style, {
    position: "fixed",
    left: `${x - radius}px`,
    top: `${y - radius}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    borderRadius: "999px",
    border: "3px solid rgb(var(--logo-bright))",
    pointerEvents: "none",
    zIndex: "100",
  });
  document.body.appendChild(ring);
  ring
    .animate(
      [
        { transform: "scale(0)", opacity: 1 },
        { transform: "scale(1)", opacity: 0 },
      ],
      { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    )
    .finished.finally(() => ring.remove());
}

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

  // O tema novo se abre num círculo a partir do botão, com um anel azul da logo
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      flushSync(() => setTheme(next));
    };
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const doc = document as ViewTransitionDoc;
    if (reduce || !doc.startViewTransition) {
      apply();
      return;
    }
    themeRing(x, y, radius);
    const vt = doc.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
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
          <LirgeMark className="h-9 w-9 transition-transform duration-700 ease-out group-hover:rotate-[-24deg] group-hover:scale-110" />
          <span className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-logo-bright">
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
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
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
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className={`bg-ground pb-6 ${MENU_SHADOW} lg:hidden`}
          >
            <motion.div
              className="page flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } }}
            >
              {menuItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } } }}
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
                      className={`h-2 w-2 rounded-full bg-logo-bright transition-transform duration-300 ${
                        active ? "scale-100" : "scale-0 group-hover:scale-100"
                      }`}
                    />
                    <span className="link-line">{item.label}</span>
                  </motion.a>
                );
              })}
              <motion.button
                type="button"
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
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
