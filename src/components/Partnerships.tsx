import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { partners, type Partner } from "../data/partners";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface PartnershipsProps {
  onNavigate: (section: string) => void;
}

const Chip: React.FC<{ partner: Partner; hidden?: boolean }> = ({ partner, hidden }) => (
  <li className="logo-chip" aria-hidden={hidden || undefined} title={partner.name}>
    <img src={partner.logo} alt={hidden ? "" : partner.name} loading="lazy" />
    {partner.caption && (
      <span className="max-w-[15ch] text-center text-[0.75rem] font-bold leading-tight text-[#c46a1b]">{partner.caption}</span>
    )}
  </li>
);

/** Uma faixa que rola sem parar: a lista aparece duas vezes para emendar sem salto. */
const Row: React.FC<{ items: Partner[]; reverse?: boolean; duration: number }> = ({ items, reverse, duration }) => (
  <div className="marquee">
    <ul
      className={`marquee-track ${reverse ? "is-reverse" : ""}`}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {items.map((p) => (
        <Chip key={p.name} partner={p} />
      ))}
      {items.map((p) => (
        <Chip key={`${p.name}-copia`} partner={p} hidden />
      ))}
    </ul>
  </div>
);

const Partnerships: React.FC<PartnershipsProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const half = Math.ceil(partners.length / 2);

  return (
    <section id="partnerships" aria-labelledby="partnerships-title" className="section overflow-hidden">
      <div className="page">
        <SectionHeading
          id="partnerships-title"
          title={t("partnerships.title")}
          highlight={t("partnerships.highlight")}
          subtitle={t("partnerships.subtitle")}
        />
      </div>

      <Reveal order={2} className="mt-14 space-y-4">
        <Row items={partners.slice(0, half)} duration={60} />
        <Row items={partners.slice(half)} duration={66} reverse />
      </Reveal>

      <Reveal order={3} className="page mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="group inline-flex flex-wrap items-center justify-center gap-2 text-body font-semibold"
        >
          <span className="text-ink-soft">{t("partnerships.ctaTitle")}</span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="link-line is-static text-ink group-hover:text-logo-deep dark:group-hover:text-logo-bright">
              {t("partnerships.ctaLink")}
            </span>
            <ArrowRight size={16} className="text-ink transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
          </span>
        </button>
      </Reveal>
    </section>
  );
};

export default Partnerships;
