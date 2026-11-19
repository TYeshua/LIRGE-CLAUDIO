import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Eye, Rocket, Target, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Tabs from "./Tabs";
import { BASIN_COLORS, BASIN_IDS } from "./visuals/basins";

const GlobeVisual = lazy(() => import("./visuals/GlobeVisual"));

type FeatureKey = "objective" | "mission" | "vision";
const FEATURES: { key: FeatureKey; icon: LucideIcon }[] = [
  { key: "objective", icon: Target },
  { key: "mission", icon: Rocket },
  { key: "vision", icon: Eye },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

const About: React.FC = () => {
  const { t } = useTranslation();
  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInView = useInView(globeRef, { once: true, amount: 0.45 });
  const [view, setView] = useState(1); // 0 = globo inteiro, 1 = Margem Equatorial
  const [legendHover, setLegendHover] = useState(-1);
  const [active, setActive] = useState(-1);
  const [zoomed, setZoomed] = useState(false);

  // ao entrar na tela, o globo voa do planeta inteiro até a Margem Equatorial
  useEffect(() => {
    if (!globeInView) return;
    const id = window.setTimeout(() => setZoomed(view === 1), view === 1 ? 900 : 0);
    return () => window.clearTimeout(id);
  }, [globeInView, view]);

  const shown = legendHover >= 0 ? legendHover : active;

  return (
    <section id="about" aria-labelledby="about-title" className="section bg-surface">
      <div className="page">
        <SectionHeading id="about-title" title={t("about.title")} highlight={t("about.highlight")} />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {paragraphs.map((text, i) => (
              <Reveal key={i} order={i}>
                <p className={`text-body text-ink ${i ? "mt-5" : ""}`}>{text}</p>
              </Reveal>
            ))}

            {/* legenda das bacias, ligada ao globo */}
            <Reveal order={2} className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display text-lead font-bold text-ink">{t("about.globe.legendTitle")}</h3>
                <Tabs
                  id="globe-view"
                  label={t("about.globe.viewLabel")}
                  value={view}
                  onChange={setView}
                  items={[
                    { key: "globe", label: t("about.globe.viewGlobe") },
                    { key: "margin", label: t("about.globe.viewMargin") },
                  ]}
                />
              </div>
              <ul className="mt-5 space-y-1" onMouseLeave={() => setLegendHover(-1)}>
                {BASIN_IDS.map((id, i) => {
                  const on = shown === i && zoomed;
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onMouseEnter={() => setLegendHover(i)}
                        onFocus={() => setLegendHover(i)}
                        onBlur={() => setLegendHover(-1)}
                        onClick={() => setView(1)}
                        aria-pressed={on}
                        className={`w-full rounded-xl px-4 py-2.5 text-left transition-colors duration-300 ${
                          on ? "bg-card" : "hover:bg-card/60"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className="h-3 w-3 shrink-0 rounded-full transition-transform duration-200"
                            style={{ background: BASIN_COLORS[i], transform: on ? "scale(1.25)" : "scale(1)" }}
                          />
                          <span className={`font-semibold transition-colors ${on ? "text-ink" : "text-ink-soft"}`}>
                            {t(`about.globe.basins.${id}.name`)}
                          </span>
                        </span>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="block overflow-hidden pl-6 text-small text-ink-soft"
                            >
                              <span className="block pt-1">{t(`about.globe.basins.${id}.desc`)}</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* globo: do planeta inteiro até a Margem Equatorial */}
          <Reveal order={1}>
            <div ref={globeRef} className="card overflow-hidden p-2.5">
              <div className="relative aspect-square overflow-hidden rounded-[0.95rem] bg-field-deep">
                <Suspense fallback={null}>
                  <GlobeVisual
                    zoomed={zoomed}
                    highlight={legendHover}
                    onBasin={setActive}
                    fallback={
                      <img
                        src={`${import.meta.env.BASE_URL}images/web/sobrefoto.webp`}
                        alt={t("about.imageAlt")}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    }
                  />
                </Suspense>
                <p className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-4 text-center text-small text-on-field-soft">
                  {t("about.globe.hint")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* objetivo, missão e visão */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ key, icon: Icon }, i) => (
            <Reveal key={key} order={i}>
              <article className="card card-interactive h-full p-7">
                <span className="icon-tile">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lead font-bold text-ink">{t(`about.features.${key}.title`)}</h3>
                <p className="mt-3 text-body text-ink-soft">{t(`about.features.${key}.description`)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
