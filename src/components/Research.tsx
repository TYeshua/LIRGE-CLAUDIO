import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Tabs from "./Tabs";
import ResearchIllustration from "./illustrations/ResearchIllustration";

interface ResearchArea {
  title: string;
  description: string;
  features: string[];
}

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_S = 11;

const Research: React.FC = () => {
  const { t } = useTranslation();
  const areas = Object.values(t("researchList", { returnObjects: true }) as Record<string, ResearchArea>);
  const shortNames = t("research.short", { returnObjects: true }) as string[];
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.4 });
  const [[index, dir], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = (next: number) => {
    const n = (next + areas.length) % areas.length;
    setSlide(([cur]) => [n, n >= cur ? 1 : -1]);
  };

  // pausa quando a aba do navegador não está visível
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const area = areas[index];
  const running = !reduce && inView && !paused;

  return (
    <section id="research" aria-labelledby="research-title" className="section">
      <div className="page">
        <SectionHeading
          id="research-title"
          title={t("research.title")}
          highlight={t("research.highlight")}
          subtitle={t("research.subtitle")}
        />

        <Reveal order={2} className="mt-12 flex justify-center">
          <Tabs
            id="research"
            label={t("research.tabsLabel")}
            value={index}
            onChange={go}
            items={areas.map((a, i) => ({ key: a.title, label: shortNames[i] ?? a.title }))}
          />
        </Reveal>

        <Reveal order={3}>
          <div
            ref={stageRef}
            id="research-panel"
            role="tabpanel"
            aria-labelledby={`research-tab-${index}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="card mt-8 overflow-hidden p-2.5 sm:p-3"
          >
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -36 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10"
              >
                <ResearchIllustration index={index} />
                <div className="px-3 pb-4 lg:px-2 lg:pb-0 lg:pr-8">
                  <motion.h3
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
                    className="font-display text-lead font-bold text-ink lg:text-[2rem] lg:leading-tight"
                  >
                    {area.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                    className="mt-4 text-body text-ink-soft"
                  >
                    {area.description}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                    className="mt-6 text-small font-semibold text-brand"
                  >
                    {t("research.featuresLabel")}
                  </motion.p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {area.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: EASE, delay: 0.26 + i * 0.06 }}
                        className="flex items-start gap-2.5 text-body text-ink"
                      >
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* navegação e avanço automático */}
            <div className="mt-3 flex items-center gap-4 px-2 pb-1.5">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label={t("research.prev")}
                className="icon-btn inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
              >
                <ChevronLeft size={20} />
              </button>
              <div aria-hidden className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-surface-2">
                {!reduce && (
                  <span
                    key={index}
                    className="absolute inset-0 origin-left rounded-full bg-logo-bright"
                    style={{
                      animation: `progress ${AUTOPLAY_S}s linear forwards`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                    onAnimationEnd={() => go(index + 1)}
                  />
                )}
              </div>
              <span className="text-small tabular-nums text-ink-soft">
                {index + 1} / {areas.length}
              </span>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label={t("research.next")}
                className="icon-btn inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Research;
