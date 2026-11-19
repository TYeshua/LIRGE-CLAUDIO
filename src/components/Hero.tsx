import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import LirgeMark from "./LirgeMark";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // a foto desce um pouco mais devagar que a página (profundidade sutil)
  const photoY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 60]);
  const base = import.meta.env.BASE_URL;

  const rise = (order: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: EASE, delay: 0.15 + order * 0.09 },
  });

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 lg:pt-32">
      {/* fundo: brilho nas cores da logo e anéis girando devagar */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-glow" />
        <motion.div
          className="hero-ring left-[6%] top-[18%] hidden h-28 w-28 md:block"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="hero-ring bottom-[10%] right-[38%] hidden h-20 w-20 md:block"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="page relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="mb-7 flex justify-center lg:justify-start"
          >
            <LirgeMark className="h-20 w-20 lg:h-24 lg:w-24" title="LIRGE" />
          </motion.div>

          <motion.h1 {...rise(0)} className="font-display text-display font-bold text-ink">
            LIR<span className="text-brand">GE</span>
          </motion.h1>

          <motion.p {...rise(1)} className="mx-auto mt-5 max-w-lg text-lead text-ink lg:mx-0">
            {t("hero.subtitle")}
          </motion.p>

          <motion.p {...rise(2)} className="mt-3 font-semibold text-brand">
            {t("hero.university")}
          </motion.p>

          <motion.div {...rise(3)} className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 lg:justify-start">
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="btn-fill group inline-flex items-center gap-2.5 rounded-full bg-sand px-8 py-4 font-semibold text-[#1b1307]"
            >
              {t("hero.cta")}
              <ArrowRight size={18} className="transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("research")}
              className="link-line font-semibold text-ink hover:text-logo-deep dark:hover:text-logo-bright"
            >
              {t("hero.ctaSecondary")}
            </button>
          </motion.div>
        </div>

        {/* foto da equipe */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          style={{ y: photoY }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="card group p-2.5 sm:p-3">
            <div className="relative overflow-hidden rounded-[0.95rem]">
              <img
                src={`${base}images/web/equipe-2400.webp`}
                srcSet={`${base}images/web/equipe-1200.webp 1200w, ${base}images/web/equipe-2400.webp 2400w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={t("hero.imageAlt")}
                width={2400}
                height={1350}
                fetchPriority="high"
                className="h-64 w-full object-cover object-[50%_40%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] sm:h-80 lg:h-[460px]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[#021b20]/75 px-3.5 py-1.5 text-small font-semibold text-white">
                {t("hero.caption")}
              </span>
            </div>
            <motion.div
              aria-hidden
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-logo-deep text-white ring-[6px] ring-ground lg:h-16 lg:w-16"
            >
              <Users size={22} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* indicador de rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <button
          type="button"
          onClick={() => onNavigate("about")}
          aria-label={t("hero.scroll")}
          className="icon-btn rounded-full p-2 text-logo-bright"
        >
          <motion.span
            className="block"
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
