import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

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
      <div className="page grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 id="links-title" className="font-display text-head font-bold text-ink">
              {t("institutionalLinks.heading")}
            </h2>
          </Reveal>
          <Reveal order={1}>
            <p className="mt-6 max-w-[24rem] text-lead text-ink">{t("institutionalLinks.subtitle")}</p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2 lg:col-span-8">
          {links.map((link, i) => {
            const [short, long] = splitTitle(link.title);
            return (
              <Reveal as="li" key={link.url} order={i % 2}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="row-hover group -mx-4 flex items-start justify-between gap-4 px-4 py-4"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-lead font-bold text-ink transition-[color,transform] duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-logo-deep dark:group-hover:text-logo-bright">
                      {short}
                    </span>
                    {long && <span className="mt-1 block text-small text-ink-soft">{long}</span>}
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="mt-1 shrink-0 text-ink-soft transition-[transform,color] duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-[8deg] group-hover:text-logo-bright"
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
