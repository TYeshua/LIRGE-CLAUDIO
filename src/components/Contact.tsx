import React, { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface ContactItem {
  title: string;
  content: string;
}

const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;

type LabStatus =
  | { open: true }
  | { open: false; when: "today" | "tomorrow" | "monday" };

/** Situação do laboratório agora, no horário de Salinópolis (America/Belem). */
const getLabStatus = (now = new Date()): LabStatus => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Belem",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const isWeekday = !["Sat", "Sun"].includes(weekday);

  if (isWeekday && hour >= OPEN_HOUR && hour < CLOSE_HOUR) return { open: true };
  if (isWeekday && hour < OPEN_HOUR) return { open: false, when: "today" };
  if (weekday === "Fri" || weekday === "Sat" || weekday === "Sun") return { open: false, when: "monday" };
  return { open: false, when: "tomorrow" };
};

const LabStatusLine: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<LabStatus>(() => getLabStatus());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getLabStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="mt-2 flex items-start gap-2.5 text-small font-semibold text-ink">
      <span
        aria-hidden
        className={`mt-[0.45em] h-2.5 w-2.5 shrink-0 rounded-full ${status.open ? "pulse-ring bg-logo-bright text-logo-bright" : "bg-ink-soft/50"}`}
      />
      {status.open
        ? t("contact.status.open")
        : t("contact.status.closed", { when: t(`contact.status.${status.when}`) })}
    </p>
  );
};

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.999682634279!2d-47.3418561!3d-0.6310413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a8991aa9bcb021%3A0x9d2277db2e684e09!2sUniversidade%20Federal%20do%20Par%C3%A1%20-%20Campus%20Salin%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1713200000000!5m2!1spt-BR!2sbr";
const MAP_LINK = "https://maps.app.goo.gl/juruUVibaRdvjP5K9";

const ICONS: LucideIcon[] = [Mail, Phone, MapPin, Clock];

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const info = t("contact.contactInfo", { returnObjects: true }) as ContactItem[];
  const [email, phone] = info;
  const hrefs = [`mailto:${email.content}`, `tel:+${phone.content.replace(/\D/g, "")}`, MAP_LINK, undefined];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-surface">
      <div className="page">
        <SectionHeading id="contact-title" highlight={t("contact.title")} subtitle={t("contact.subtitle")} />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
          {info.map((item, i) => {
            const Icon = ICONS[i];
            const href = hrefs[i];
            const body = (
              <>
                <span className="icon-tile">
                  <Icon size={22} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-body font-bold text-ink">{item.title}</span>
                  <span className={`mt-1 block whitespace-pre-line text-small leading-relaxed text-ink-soft ${i < 2 ? "break-all text-body font-semibold text-ink" : ""}`}>
                    {item.content}
                  </span>
                  {i === 3 && <LabStatusLine />}
                </span>
              </>
            );
            return (
              <Reveal key={item.title} order={i % 2}>
                {href ? (
                  <a
                    href={href}
                    target={i === 2 ? "_blank" : undefined}
                    rel={i === 2 ? "noopener noreferrer" : undefined}
                    className="card card-interactive flex h-full items-start gap-5 p-6"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="card flex h-full items-start gap-5 p-6">{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal order={2} className="mx-auto mt-5 max-w-5xl">
          <div className="card overflow-hidden p-2.5">
            <div className="relative h-80 overflow-hidden rounded-[0.95rem] bg-surface-2">
              <iframe
                title={t("contact.mapTitle")}
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-1.5 pt-3.5">
              <span>
                <span className="block font-display font-bold text-ink">{t("contact.mapTitle")}</span>
                <span className="text-small text-ink-soft">{t("contact.mapSubtitle")}</span>
              </span>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-logo-deep dark:hover:text-logo-bright"
              >
                <span className="link-line">{t("contact.mapLink")}</span>
                <ArrowUpRight size={18} className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
