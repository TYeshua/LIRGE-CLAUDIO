import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Posição na sequência da seção: cada passo atrasa 70ms */
  order?: number;
  as?: "div" | "li" | "figure" | "article";
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Entrada discreta: sobe 24px e aparece uma única vez ao entrar na tela. */
const Reveal: React.FC<RevealProps> = ({ children, className, order = 0, as = "div" }) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE, delay: order * 0.07 }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
