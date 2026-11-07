import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { partners } from "../data/partners";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const SHUTTER = [0.76, 0, 0.24, 1] as const;

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const globeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: globeRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Números tirados do próprio conteúdo do site
  const coordinators = t("team.coordinators", { returnObjects: true }) as unknown[];
  const students = t("team.students", { returnObjects: true }) as unknown[];
  const areas = Object.keys(t("researchList", { returnObjects: true }) as object).length;
  const facts = [
    { value: coordinators.length + students.length, label: t("hero.facts.people") },
    { value: areas, label: t("hero.facts.areas") },
    { value: partners.length, label: t("hero.facts.partners") },
  ];

  const rise = (order: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + order * 0.08 },
  });

  const base = import.meta.env.BASE_URL;

  return (
    <section id="home" className="relative overflow-hidden pt-[4.5rem]">
      <div className="page grid grid-cols-1 gap-x-8 pb-[clamp(2.5rem,4.5vw,4rem)] pt-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-12">
        <motion.h1 {...rise(0)} className="font-display text-display font-bold text-ink lg:col-span-12">
          {t("hero.title")}
        </motion.h1>

        <motion.p {...rise(1)} className="mt-7 max-w-[44rem] text-lead text-ink lg:col-span-7 lg:mt-9">
          {t("hero.lead")}
        </motion.p>

        <motion.div
          {...rise(2)}
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end lg:justify-end"
        >
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="btn-fill group inline-flex items-center gap-2.5 rounded-full bg-sand px-7 py-3.5 font-semibold text-[#1b1307]"
          >
            {t("hero.cta")}
            <ArrowRight size={18} className="transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("research")}
            className="link-line is-static font-semibold text-ink hover:text-logo-deep dark:hover:text-logo-bright"
          >
            {t("hero.ctaSecondary")}
          </button>
        </motion.div>
      </div>

      {/* O globo: crescente em arenito sobre a foto da equipe */}
      <div ref={globeRef} className="globe">
        <motion.div
          className="globe__layer globe__sand"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.75 }}
        />
        <div className="globe__layer globe__gap" />
        <div className="globe__layer globe__photo">
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.1, ease: SHUTTER, delay: 0.25 }}
          >
            <motion.img
              src={`${base}images/web/equipe-2400.webp`}
              srcSet={`${base}images/web/equipe-1200.webp 1200w, ${base}images/web/equipe-2400.webp 2400w`}
              sizes="100vw"
              alt={t("hero.imageAlt")}
              width={2400}
              height={1350}
              fetchPriority="high"
              style={{ y: reduce ? 0 : photoY }}
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.25 }}
              className="absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover object-[50%_68%]"
            />
          </motion.div>
        </div>
      </div>

      <div className="page grid grid-cols-1 gap-x-8 gap-y-8 pt-6 lg:grid-cols-12 lg:items-start">
        <p className="text-small text-ink-soft lg:col-span-4">{t("hero.caption")}</p>
        <dl className="grid grid-cols-3 gap-6 lg:col-span-6 lg:col-start-7">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-small text-ink-soft">{fact.label}</dt>
              <dd className="font-display text-head font-bold tabular-nums text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
