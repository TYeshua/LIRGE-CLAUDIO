import React, { useState } from "react";
import { Check, Copy, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

interface Person {
  name: string;
  role: string;
  area: string;
  email: string;
  image: string;
  linkedin?: string;
  sponsor?: string;
}

const EmailLine: React.FC<{ email: string }> = ({ email }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <a
        href={`mailto:${email}`}
        className="link-line min-w-0 truncate text-small text-ink-soft hover:text-logo-deep dark:hover:text-logo-bright"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? t("team.copied") : t("team.copy")}
        title={copied ? t("team.copied") : t("team.copy")}
        className="icon-btn inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft"
      >
        {copied ? <Check size={14} className="animate-[pop_0.35s_var(--ease-out)]" /> : <Copy size={14} />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? t("team.copied") : ""}
      </span>
    </span>
  );
};

const Portrait: React.FC<{ person: Person; className: string }> = ({ person, className }) => (
  <img
    src={`${import.meta.env.BASE_URL}${person.image}`}
    alt={person.name}
    loading="lazy"
    width={480}
    height={480}
    className={`portrait-ring shrink-0 rounded-full bg-surface-2 object-cover ${className}`}
  />
);

const LinkedinLink: React.FC<{ person: Person }> = ({ person }) => {
  const { t } = useTranslation();
  if (!person.linkedin) return null;
  return (
    <a
      href={person.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("team.linkedin", { name: person.name })}
      className="icon-btn inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft"
    >
      <Linkedin size={15} />
    </a>
  );
};

const GroupHeading: React.FC<{ title: string; count: string }> = ({ title, count }) => (
  <div className="flex items-baseline justify-between gap-6">
    <h3 className="font-display text-lead font-bold text-ink">{title}</h3>
    <p className="text-body text-ink-soft">{count}</p>
  </div>
);

const Team: React.FC = () => {
  const { t } = useTranslation();
  const coordinators = t("team.coordinators", { returnObjects: true }) as Person[];
  const students = t("team.students", { returnObjects: true }) as Person[];

  return (
    <section id="team" aria-labelledby="team-title" className="section bg-surface">
      <div className="page">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal className="lg:col-span-6">
            <h2 id="team-title" className="font-display text-head font-bold text-ink">
              {t("team.heading")}
            </h2>
          </Reveal>
          <Reveal order={1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lead text-ink">{t("team.subtitle")}</p>
          </Reveal>
        </div>

        {/* Coordenação */}
        <div className="mt-[clamp(3.5rem,7vw,6rem)]">
          <Reveal>
            <GroupHeading
              title={t("team.coordination")}
              count={t("team.countCoordinators", { count: coordinators.length })}
            />
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
            {coordinators.map((person, i) => (
              <Reveal as="li" key={person.name} order={i + 1} className="group flex items-start gap-6 sm:gap-8">
                <Portrait person={person} className="h-24 w-24 sm:h-36 sm:w-36" />
                <div className="min-w-0 pt-1">
                  <h4 className="font-display text-lead font-bold leading-snug text-ink">{person.name}</h4>
                  <p className="mt-1.5 font-semibold text-brand">{person.role}</p>
                  <p className="mt-1 text-body text-ink">{person.area}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <EmailLine email={person.email} />
                    <LinkedinLink person={person} />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Pesquisadores e bolsistas */}
        <div className="mt-[clamp(4rem,8vw,7rem)]">
          <Reveal>
            <GroupHeading
              title={t("team.researchers")}
              count={t("team.countMembers", { count: students.length })}
            />
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {students.map((person, i) => (
              <Reveal as="li" key={person.name} order={i % 3} className="group flex items-start gap-5">
                <Portrait person={person} className="h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20" />
                <div className="min-w-0">
                  <h4 className="font-sans text-body font-semibold leading-snug text-ink">{person.name}</h4>
                  <p className="mt-0.5 text-small font-semibold text-brand">
                    {person.role}
                    {person.sponsor && <span className="font-normal text-ink-soft"> · {person.sponsor}</span>}
                  </p>
                  <p className="mt-1 text-small text-ink">{person.area}</p>
                  <div className="mt-1 flex items-center gap-0.5">
                    <EmailLine email={person.email} />
                    <LinkedinLink person={person} />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Team;
