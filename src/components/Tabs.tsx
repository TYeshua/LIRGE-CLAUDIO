import React from "react";
import { motion } from "framer-motion";

interface TabsProps {
  /** identificador único: liga o indicador deslizante e os painéis */
  id: string;
  label: string;
  items: { key: string; label: React.ReactNode }[];
  value: number;
  onChange: (index: number) => void;
  className?: string;
}

/** Abas em pílula com um indicador petróleo que desliza entre as opções (setas ← → navegam). */
const Tabs: React.FC<TabsProps> = ({ id, label, items, value, onChange, className = "" }) => {
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (value + step + items.length) % items.length;
    onChange(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKey}
      className={`inline-flex max-w-full flex-wrap justify-center gap-1 rounded-[1.4rem] bg-surface-2/70 p-1.5 ${className}`}
    >
      {items.map((item, i) => {
        const active = i === value;
        return (
          <button
            key={item.key}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`${id}-panel`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(i)}
            className={`relative rounded-full px-4 py-2 text-small font-semibold transition-colors duration-200 sm:px-5 sm:py-2.5 sm:text-body ${
              active ? "text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-indicator`}
                className="absolute inset-0 rounded-full bg-logo-deep"
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
