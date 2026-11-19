import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Posição na sequência da seção: cada passo atrasa 50ms */
  order?: number;
  as?: "div" | "li" | "figure" | "article";
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Entrada discreta: sobe 12px e aparece uma única vez ao entrar na tela. */
const Reveal: React.FC<RevealProps> = ({ children, className, order = 0, as = "div" }) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: EASE, delay: order * 0.05 }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
