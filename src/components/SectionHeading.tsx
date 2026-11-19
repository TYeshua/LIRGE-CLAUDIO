import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  id: string;
  title?: string;
  highlight: string;
  subtitle?: string;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Título de seção no padrão do LIRGE: centralizado, palavra em destaque e a barra que se desenha. */
const SectionHeading: React.FC<SectionHeadingProps> = ({ id, title, highlight, subtitle }) => (
  <div className="mx-auto max-w-3xl text-center">
    <Reveal>
      <h2 id={id} className="font-display text-head font-bold text-ink">
        {title && <>{title} </>}
        <span className="text-brand">{highlight}</span>
      </h2>
    </Reveal>
    <div aria-hidden className="mt-6 flex items-center justify-center gap-1.5">
      <motion.span
        className="block h-1 w-14 origin-right rounded-full bg-logo-bright"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      />
      <motion.span
        className="block h-1.5 w-1.5 rounded-full bg-sand"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.3, ease: EASE, delay: 0.6 }}
      />
    </div>
    {subtitle && (
      <Reveal order={2}>
        <p className="mx-auto mt-6 max-w-2xl text-lead text-ink-soft">{subtitle}</p>
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
