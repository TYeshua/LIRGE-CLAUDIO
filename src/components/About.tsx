import React, { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

const GlobeVisual = lazy(() => import("./visuals/GlobeVisual"));

type FeatureKey = "objective" | "mission" | "vision";
const featureKeys: FeatureKey[] = ["objective", "mission", "vision"];

interface AboutBlock {
  title: string;
  text: string;
}

interface AboutProps {
  onNavigate: (section: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const blocks = t("about.blocks", { returnObjects: true }) as AboutBlock[];

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="page">
        <div className="on-field relative grid overflow-hidden bg-field px-[clamp(1.5rem,4.5vw,4rem)] pt-[clamp(2.5rem,5vw,4.5rem)] text-on-field grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Reveal>
              <h2 id="about-title" className="font-display text-head font-bold text-on-field">
                {t("about.heading")}
              </h2>
            </Reveal>
          </div>

          <div className="mt-10 space-y-10 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:pb-16">
            {blocks.map((block, i) => (
              <Reveal key={block.title} order={i + 1}>
                <h3 className="font-display text-lead font-semibold text-on-field">{block.title}</h3>
                <p className="mt-3 text-body text-on-field">{block.text}</p>
              </Reveal>
            ))}
            <Reveal order={3}>
              <button
                type="button"
                onClick={() => onNavigate("team")}
                className="btn-fill group inline-flex items-center gap-2.5 rounded-full bg-sand px-7 py-3.5 font-semibold text-[#1b1307]"
              >
                {t("about.cta")}
                <ArrowRight size={18} className="transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
              </button>
            </Reveal>
          </div>

          {/* Globo 3D com Salinópolis, cortado pela base do painel */}
          <Reveal
            order={2}
            className="mx-auto mt-14 w-[86%] max-w-[34rem] lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:mt-16 lg:w-[88%] lg:self-end"
          >
            <div className="relative -mb-[22%] aspect-square overflow-hidden rounded-full bg-field-deep">
              <Suspense fallback={null}>
                <GlobeVisual
                  fallback={
                    <img
                      src={`${import.meta.env.BASE_URL}images/web/sobrefoto.webp`}
                      alt={t("about.imageAlt")}
                      width={1000}
                      height={661}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  }
                />
              </Suspense>
            </div>
          </Reveal>
        </div>

        {/* Objetivo, missão e visão */}
        <div className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-4">
            <h3 className="max-w-[14ch] font-display text-lead font-bold text-ink">{t("about.pillarsTitle")}</h3>
          </Reveal>
          <dl className="space-y-12 lg:col-span-8">
            {featureKeys.map((key, i) => (
              <Reveal key={key} order={i + 1} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="flex items-baseline gap-3 font-display text-lead font-bold text-ink">
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 translate-y-[-0.15em] rounded-full bg-sand" />
                  {t(`about.features.${key}.title`)}
                </dt>
                <dd className="text-body text-ink">{t(`about.features.${key}.description`)}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
