import React from "react";
import { ArrowUpRight, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface LinkItem {
  title: string;
  url: string;
}

/** "UFPA - Universidade Federal do Pará" → ["UFPA", "Universidade Federal do Pará"] */
const splitTitle = (title: string): [string, string | null] => {
  const match = title.match(/^(.+?)\s+[-‑–]\s+(.+)$/);
  return match ? [match[1], match[2]] : [title, null];
};

const InstitutionalLinks: React.FC = () => {
  const { t } = useTranslation();
  const links = t("contact.links", { returnObjects: true }) as LinkItem[];

  return (
    <section id="institutional-links" aria-labelledby="links-title" className="section">
      <div className="page">
        <SectionHeading
          id="links-title"
          title={t("institutionalLinks.title")}
          highlight={t("institutionalLinks.highlight")}
          subtitle={t("institutionalLinks.subtitle")}
        />

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {links.map((link, i) => {
            const [short, long] = splitTitle(link.title);
            return (
              <Reveal as="li" key={link.url} order={i % 2}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-interactive group flex h-full items-center gap-4 p-5"
                >
                  <span className="icon-tile h-11 w-11">
                    <Building2 size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-bold text-ink">{short}</span>
                    {long && <span className="mt-0.5 block text-small leading-snug text-ink-soft">{long}</span>}
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-ink-soft transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-logo-bright"
                  />
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default InstitutionalLinks;
