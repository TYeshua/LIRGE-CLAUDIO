import React from "react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import ResearchIllustration from "./illustrations/ResearchIllustration";

interface ResearchArea {
  title: string;
  description: string;
  features: string[];
}

const Research: React.FC = () => {
  const { t } = useTranslation();
  const areas = Object.values(t("researchList", { returnObjects: true }) as Record<string, ResearchArea>);

  return (
    <section id="research" aria-labelledby="research-title" className="section">
      <div className="page">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal className="lg:col-span-6">
            <h2 id="research-title" className="font-display text-head font-bold text-ink">
              {t("research.heading")}
            </h2>
          </Reveal>
          <Reveal order={1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lead text-ink">{t("research.subtitle")}</p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-1 gap-x-[clamp(2rem,5vw,5rem)] gap-y-16 md:grid-cols-2 md:pb-28">
          {areas.map((area, i) => (
            <div key={area.title} className={i % 2 === 1 ? "md:translate-y-28" : ""}>
              <Reveal as="article" order={i % 2}>
                <ResearchIllustration index={i} />
                <h3 className="mt-6 font-display text-lead font-bold text-ink">{area.title}</h3>
                <p className="mt-3 max-w-[38rem] text-body text-ink">{area.description}</p>
                <p className="mt-5 text-small font-semibold text-ink-soft">{t("research.featuresLabel")}</p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
                  {area.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-body text-ink">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
