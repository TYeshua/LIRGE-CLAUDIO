import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { partners } from "../data/partners";
import Reveal from "./Reveal";

interface PartnershipsProps {
  onNavigate: (section: string) => void;
}

const Partnerships: React.FC<PartnershipsProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section id="partnerships" aria-labelledby="partnerships-title" className="section">
      <div className="page">
        <ul className="grid grid-cols-3 gap-1.5 sm:gap-2 md:grid-cols-4 xl:grid-cols-6">
          <Reveal
            as="li"
            className="on-field col-span-3 flex flex-col md:col-span-2 justify-between gap-6 bg-field p-[clamp(1.5rem,2.5vw,2.25rem)] text-on-field md:row-span-2"
          >
            <h2 id="partnerships-title" className="font-display text-head font-bold text-on-field">
              {t("partnerships.heading")}
            </h2>
            <p className="max-w-[26rem] text-body text-on-field">{t("partnerships.subtitle")}</p>
          </Reveal>

          {partners.map((partner, i) => (
            <Reveal
              as="li"
              key={partner.name}
              order={(i % 6) * 0.6}
              className={`tile-hover flex aspect-[3/2] flex-col items-center justify-center bg-tile p-2 sm:p-4 ${
                partner.caption ? "gap-1.5 sm:gap-2" : ""
              }`}
            >
              <img
                src={partner.logo}
                alt={partner.caption ? "" : partner.name}
                title={partner.name}
                loading="lazy"
                className={`object-contain mix-blend-multiply ${
                  partner.caption ? "max-h-[46%] max-w-[60%]" : "max-h-[62%] max-w-[78%]"
                }`}
              />
              {partner.caption && (
                <span className="max-w-[16ch] text-center text-[0.6875rem] font-bold leading-tight text-[#c46a1b] sm:text-small">
                  {partner.caption}
                </span>
              )}
            </Reveal>
          ))}

          {/* convite: no celular ocupa a vaga da última linha; nas telas maiores vira uma faixa */}
          <Reveal as="li" className="col-span-1 aspect-[3/2] md:col-span-4 md:aspect-auto xl:col-span-6">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="btn-fill group flex h-full w-full flex-col justify-between gap-2 bg-sand p-3 text-left text-[#1b1307] sm:p-5 md:flex-row md:items-center md:px-8 md:py-6"
            >
              <span className="font-display text-[0.875rem] font-bold leading-snug sm:text-body md:text-lead">
                <span className="md:hidden">{t("partnerships.ctaShort")}</span>
                <span className="hidden md:inline">{t("partnerships.ctaTitle")}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-small font-semibold">
                <span className="hidden md:inline">{t("partnerships.ctaLink")}</span>
                <ArrowRight size={16} className="transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
              </span>
            </button>
          </Reveal>
        </ul>
      </div>
    </section>
  );
};

export default Partnerships;
