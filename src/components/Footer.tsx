import React from "react";
import { ArrowUp, Instagram, Linkedin, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import LirgeMark from "./LirgeMark";

interface FooterProps {
  onNavigate: (section: string) => void;
}

// Preencha com os endereços oficiais; links com "#" não são exibidos.
const socialLinks = [
  { Icon: Instagram, url: "#", label: "Instagram" },
  { Icon: Linkedin, url: "#", label: "LinkedIn" },
].filter((link) => link.url !== "#");

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

  const linkClass = "link-line text-body text-on-field hover:text-logo-glow";

  return (
    <footer className="on-field bg-field-deep text-on-field">
      <div className="page pt-[clamp(4rem,8vw,7rem)]">
        {/* A marca, construída em grande escala */}
        <div className="flex items-end gap-[clamp(1rem,3vw,2.5rem)]" aria-hidden>
          <LirgeMark className="w-[19%] shrink-0" />
          <span className="block font-display text-[19.5vw] font-extrabold leading-[0.74] tracking-[-0.045em] text-on-field xl:text-[16.5rem]">
            LIRGE
          </span>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <p className="max-w-[24rem] font-display text-lead font-semibold text-on-field">
              {t("hero.subtitle")}
            </p>
            <p className="mt-3 text-body text-on-field-soft">{t("hero.university")}</p>
          </div>

          <nav aria-label={t("footer.navigation")} className="lg:col-span-3">
            <h3 className="text-small text-on-field-soft">{t("footer.navigation")}</h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="text-small text-on-field-soft">{t("footer.contactTitle")}</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="mailto:lirge.ufpa@gmail.com" className={linkClass}>
                  lirge.ufpa@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+5584998988983" className={linkClass}>
                  +55 (84) 99898-8983
                </a>
              </li>
              <li className="text-body text-on-field">
                Rua Raimundo Santana Cruz, s/n
                <br />
                Salinópolis – PA, 68721-000
              </li>
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socialLinks.map(({ Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="icon-btn inline-flex h-11 w-11 items-center justify-center rounded-full bg-on-field/10 text-on-field"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-[clamp(3.5rem,7vw,6rem)] flex flex-col gap-5 pb-10 text-small text-on-field-soft lg:flex-row lg:items-center lg:justify-between">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="group relative inline-flex">
              <button
                type="button"
                aria-describedby="secure-badge-tooltip"
                className="inline-flex cursor-help items-center gap-1.5 text-on-field-soft transition-colors hover:text-logo-glow"
              >
                <ShieldCheck size={15} />
                {t("footer.secure")}
              </button>
              <span
                id="secure-badge-tooltip"
                role="tooltip"
                className={`pointer-events-none absolute bottom-full left-0 mb-3 w-72 bg-on-field px-4 py-3 text-small leading-relaxed text-field-deep translate-y-1 opacity-0 ${TOOLTIP_SHADOW} transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100`}
              >
                {t("footer.secureDetail")}
              </span>
            </span>

            <span>
              {t("footer.developedBy")}{" "}
              <a
                href="https://tyeshua.github.io/DOF-Portifolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-on-field hover:text-logo-glow"
              >
                {t("footer.creators.thiago")}
              </a>{" "}
              {t("footer.and")}{" "}
              <a
                href="https://www.linkedin.com/in/josuedias"
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-on-field hover:text-logo-glow"
              >
                {t("footer.creators.josue")}
              </a>
            </span>

            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="btn-fill group inline-flex items-center gap-2 rounded-full bg-on-field/10 px-4 py-2 font-semibold text-on-field"
            >
              <ArrowUp size={15} className="transition-transform duration-500 ease-out group-hover:-translate-y-1" />
              {t("footer.toTop")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
