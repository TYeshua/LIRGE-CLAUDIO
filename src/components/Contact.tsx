import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

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
    <p className="mt-3 flex items-start gap-2.5 font-semibold text-on-field">
      <span
        aria-hidden
        className={`mt-[0.55em] h-2.5 w-2.5 shrink-0 rounded-full ${status.open ? "pulse-ring bg-logo-glow text-logo-glow" : "bg-on-field-soft/60"}`}
      />
      {status.open
        ? t("contact.status.open")
        : t("contact.status.closed", { when: t(`contact.status.${status.when}`) })}
    </p>
  );
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [email, phone, address, hours] = t("contact.contactInfo", { returnObjects: true }) as ContactItem[];
  const telHref = `tel:+${phone.content.replace(/\D/g, "")}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-field section bg-field text-on-field">
      <div className="page grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="contact-title" className="font-display text-head font-bold text-on-field">
              {t("contact.heading")}
            </h2>
          </Reveal>
          <Reveal order={1}>
            <p className="mt-6 max-w-[30rem] text-lead text-on-field">{t("contact.subtitle")}</p>
          </Reveal>

          <dl className="mt-12 space-y-8">
            <Reveal order={2}>
              <dt className="text-small text-on-field-soft">{email.title}</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${email.content}`}
                  className="link-line is-static break-all font-display text-lead font-bold text-on-field hover:text-logo-glow"
                >
                  {email.content}
                </a>
              </dd>
            </Reveal>
            <Reveal order={3}>
              <dt className="text-small text-on-field-soft">{phone.title}</dt>
              <dd className="mt-1">
                <a
                  href={telHref}
                  className="link-line font-display text-lead font-bold text-on-field hover:text-logo-glow"
                >
                  {phone.content}
                </a>
              </dd>
            </Reveal>
            <Reveal order={4} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-[1.3fr_1fr]">
              <div>
                <dt className="text-small text-on-field-soft">{address.title}</dt>
                <dd className="mt-1 whitespace-pre-line text-body text-on-field">{address.content}</dd>
              </div>
              <div>
                <dt className="text-small text-on-field-soft">{hours.title}</dt>
                <dd className="mt-1 whitespace-pre-line text-body text-on-field">
                  {hours.content}
                  <LabStatusLine />
                </dd>
              </div>
            </Reveal>
          </dl>
        </div>

        <Reveal order={2} className="flex flex-col lg:col-span-6 lg:col-start-7">
          <div className="arc relative min-h-[22rem] flex-1 bg-field-deep">
            <iframe
              title={t("contact.mapTitle")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.999682634279!2d-47.3418561!3d-0.6310413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a8991aa9bcb021%3A0x9d2277db2e684e09!2sUniversidade%20Federal%20do%20Par%C3%A1%20-%20Campus%20Salin%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1713200000000!5m2!1spt-BR!2sbr"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/juruUVibaRdvjP5K9"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 self-start font-semibold text-on-field transition-colors hover:text-logo-glow"
          >
            {t("contact.mapLink")}
            <ArrowUpRight
              size={18}
              className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
