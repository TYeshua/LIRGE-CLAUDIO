import React from "react";
import { ArrowUp, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import LirgeMark from "./LirgeMark";

interface FooterProps {
  onNavigate: (section: string) => void;
}

// Sombra só numa sobreposição que flutua de fato
const TOOLTIP_SHADOW = "shadow-xl"; // taste-skill-ignore

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: "about", label: t("menu.about") },
    { id: "research", label: t("menu.research") },
    { id: "team", label: t("menu.team") },
    { id: "partnerships", label: t("menu.partnerships") },
    { id: "contact", label: t("menu.contact") },
    { id: "institutional-links", label: t("menu.institutionalLinks") },
  ];

  const link = "link-line text-small text-ink-soft hover:text-ink";

  return (
    <footer className="bg-surface">
      <div className="page grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12">
        <div>
          <button type="button" onClick={() => onNavigate("home")} className="group flex items-center gap-2.5" aria-label={t("nav.home")}>
            <LirgeMark className="h-9 w-9" />
            <span className="font-display text-xl font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-logo-bright">
              LIRGE
            </span>
          </button>
          <p className="mt-4 max-w-xs text-small text-ink-soft">
            {t("hero.subtitle")} · {t("hero.university")}
          </p>
        </div>

        <nav aria-label={t("footer.navigation")}>
          <h3 className="font-display text-small font-bold text-ink">{t("footer.navigation")}</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className={link}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-small font-bold text-ink">{t("footer.contactTitle")}</h3>
          <ul className="mt-4 space-y-2.5">
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-logo-bright" aria-hidden />
              <a href="mailto:lirge.ufpa@gmail.com" className={link}>
                lirge.ufpa@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-logo-bright" aria-hidden />
              <a href="tel:+5584998988983" className={link}>
                +55 (84) 99898-8983
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-small text-ink-soft">
              <MapPin size={15} className="shrink-0 text-logo-bright" aria-hidden />
              Salinópolis – PA
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-surface-2/50">
        <div className="page flex flex-col gap-4 py-5 text-small text-ink-soft lg:flex-row lg:items-center lg:justify-between">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="group relative inline-flex">
              <button
                type="button"
                aria-describedby="secure-badge-tooltip"
                className="inline-flex cursor-help items-center gap-1.5 transition-colors hover:text-logo-bright"
              >
                <ShieldCheck size={15} />
                {t("footer.secure")}
              </button>
              <span
                id="secure-badge-tooltip"
                role="tooltip"
                className={`pointer-events-none absolute bottom-full left-0 z-10 mb-3 w-72 translate-y-1 rounded-xl bg-field-deep px-4 py-3 leading-relaxed text-on-field opacity-0 ${TOOLTIP_SHADOW} transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100`}
              >
                {t("footer.secureDetail")}
              </span>
            </span>

            <span>
              {t("footer.developedBy")}{" "}
              <a href="https://www.linkedin.com/in/thiagoyeshua" target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                {t("footer.creators.thiago")}
              </a>{" "}
              {t("footer.and")}{" "}
              <a href="https://www.linkedin.com/in/josuedias" target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                {t("footer.creators.josue")}
              </a>
            </span>

            <button
              type="button"
              onClick={() => onNavigate("home")}
              aria-label={t("footer.toTop")}
              title={t("footer.toTop")}
              className="icon-btn group inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-ink"
            >
              <ArrowUp size={16} className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
