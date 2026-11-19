import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Tabs from "./Tabs";

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

const MemberCard: React.FC<{ person: Person; badge?: string }> = ({ person, badge }) => (
  <div className="group flex items-start gap-5">
    <Portrait person={person} className="h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20" />
    <div className="min-w-0">
      <h4 className="font-sans text-body font-semibold leading-snug text-ink">{person.name}</h4>
      <p className="mt-0.5 text-small font-semibold text-brand">
        {person.role}
        {person.sponsor && <span className="font-normal text-ink-soft"> · {person.sponsor}</span>}
      </p>
      {badge && (
        <span className="mt-1.5 inline-block rounded-full bg-sand/20 px-2.5 py-0.5 text-[0.8125rem] font-semibold text-sand-ink">
          {badge}
        </span>
      )}
      <p className="mt-1 text-small text-ink">{person.area}</p>
      <div className="mt-1 flex items-center gap-0.5">
        <EmailLine email={person.email} />
        <LinkedinLink person={person} />
      </div>
    </div>
  </div>
);

const EASE = [0.22, 1, 0.36, 1] as const;

const Team: React.FC = () => {
  const { t } = useTranslation();
  const coordinators = t("team.coordinators", { returnObjects: true }) as Person[];
  const students = t("team.students", { returnObjects: true }) as Person[];
  const alumni = (t("team.alumni", { returnObjects: true }) as Person[]) ?? [];
  const [tab, setTab] = useState(0);

  return (
    <section id="team" aria-labelledby="team-title" className="section bg-surface">
      <div className="page">
        <SectionHeading
          id="team-title"
          title={t("team.title")}
          highlight={t("team.highlight")}
          subtitle={t("team.subtitle")}
        />

        <Reveal order={2} className="mt-12 flex justify-center">
          <Tabs
            id="team"
            label={t("team.tabsLabel")}
            value={tab}
            onChange={setTab}
            items={[
              { key: "current", label: <>{t("team.tabs.current")} <span className="opacity-70">· {coordinators.length + students.length}</span></> },
              { key: "alumni", label: <>{t("team.tabs.alumni")} <span className="opacity-70">· {alumni.length}</span></> },
            ]}
          />
        </Reveal>

        <div id="team-panel" role="tabpanel" aria-labelledby={`team-tab-${tab}`} className="mt-14">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {tab === 0 ? (
                <>
                  {/* Coordenação */}
                  <GroupHeading
                    title={t("team.coordination")}
                    count={t("team.countCoordinators", { count: coordinators.length })}
                  />
                  <ul className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {coordinators.map((person) => (
                      <li key={person.name} className="card card-interactive group flex items-start gap-6 p-6 sm:gap-8 sm:p-7">
                        <Portrait person={person} className="h-24 w-24 sm:h-32 sm:w-32" />
                        <div className="min-w-0 pt-1">
                          <h4 className="font-display text-lead font-bold leading-snug text-ink">{person.name}</h4>
                          <p className="mt-1.5 font-semibold text-brand">{person.role}</p>
                          <p className="mt-1 text-body text-ink">{person.area}</p>
                          <div className="mt-3 flex items-center gap-1">
                            <EmailLine email={person.email} />
                            <LinkedinLink person={person} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Pesquisadores e bolsistas */}
                  <div className="mt-16">
                    <GroupHeading
                      title={t("team.researchers")}
                      count={t("team.countMembers", { count: students.length })}
                    />
                    <ul className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                      {students.map((person, i) => (
                        <motion.li
                          key={person.name}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE, delay: 0.05 + (i % 6) * 0.04 }}
                        >
                          <MemberCard person={person} />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <GroupHeading
                    title={t("team.alumniTitle")}
                    count={t("team.countMembers", { count: alumni.length })}
                  />
                  <p className="mt-3 max-w-2xl text-body text-ink-soft">{t("team.alumniNote")}</p>
                  <ul className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                    {alumni.map((person) => (
                      <li key={person.name}>
                        <MemberCard person={person} badge={t("team.alumniBadge")} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Team;
