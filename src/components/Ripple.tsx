import { useEffect } from "react";

const TARGETS = ".btn-fill, .icon-btn, [data-ripple]";

/**
 * Onda nas cores da logo que nasce do ponto do clique, em qualquer botão do site
 * marcado com .btn-fill, .icon-btn ou data-ripple. Não aparece com movimento reduzido.
 */
export function useRipple() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onDown = (e: PointerEvent) => {
      if (reduced.matches) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(TARGETS);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - r.left - size / 2}px`;
      wave.style.top = `${e.clientY - r.top - size / 2}px`;
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      el.style.overflow = "hidden";
      el.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove(), { once: true });
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
}
