import React, { useEffect, useRef, useState } from "react";
import { setChipMinSize } from "./draw";

/** Coordenadas de desenho fixas: toda ilustração é feita num quadro de 1200 × 800. */
export const W = 1200;
export const H = 800;

export interface Env {
  /** pixels reais por unidade de desenho */
  px: number;
  /** pixels de CSS por unidade de desenho (quadro pequeno no celular → valor baixo) */
  css: number;
  reduced: boolean;
  /** Camada fora da tela já com a mesma escala do quadro (para partes estáticas) */
  layer: () => { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };
}

export interface Illustration {
  /** Chamado ao criar e a cada mudança de tamanho: monte aqui as camadas estáticas */
  init?: (env: Env) => void;
  frame: (ctx: CanvasRenderingContext2D, t: number, dt: number, env: Env) => void;
  /** Ponteiro em coordenadas de desenho (null = fora); devolve o cursor desejado */
  pointer?: (p: { x: number; y: number } | null) => string | void;
  click?: (p: { x: number; y: number }) => void;
}

interface Props {
  load: () => Promise<{ default: () => Illustration }>;
  label: string;
  className?: string;
}

const IllustrationCanvas: React.FC<Props> = ({ load, label, className = "" }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadRef = useRef(load);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ill: Illustration | null = null;
    let disposed = false;
    let visible = false;
    let raf = 0;
    let last = 0;
    let t = reduced ? 6 : 0;
    const env: Env = {
      px: 1,
      css: 1,
      reduced,
      layer: () => {
        const c = document.createElement("canvas");
        c.width = canvas.width;
        c.height = canvas.height;
        const g = c.getContext("2d")!;
        g.setTransform(env.px, 0, 0, env.px, 0, 0);
        return { canvas: c, ctx: g };
      },
    };

    const draw = (dt: number) => {
      if (!ill) return;
      ctx.setTransform(env.px, 0, 0, env.px, 0, 0);
      ctx.clearRect(0, 0, W, H);
      setChipMinSize(13 / env.css);
      ill.frame(ctx, t, dt, env);
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      if (!r.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round((r.width * dpr * H) / W);
      env.px = canvas.width / W;
      env.css = r.width / W;
      // rótulos nunca menores que 13px de tela, mesmo com o quadro encolhido no celular
      setChipMinSize(13 / env.css);
      ill?.init?.(env);
      draw(0);
    };

    const loop = (now: number) => {
      raf = 0;
      if (disposed || !visible) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      t += dt;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && visible && ill && !reduced) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    const toDesign = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
    };
    const onMove = (e: PointerEvent) => {
      if (!ill?.pointer) return;
      canvas.style.cursor = ill.pointer(toDesign(e)) || "";
      if (reduced) draw(0);
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ill?.pointer?.(null);
      if (reduced) draw(0);
    };
    const onClick = (e: PointerEvent) => {
      // no toque não há "passar o mouse": o toque mostra o rótulo daquele ponto
      if (e.pointerType !== "mouse") ill?.pointer?.(toDesign(e));
      ill?.click?.(toDesign(e));
      if (reduced) draw(0);
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      },
      { rootMargin: "120px 0px" }
    );

    (async () => {
      const mod = await loadRef.current();
      await document.fonts?.ready;
      if (disposed) return;
      ill = mod.default();
      ro.observe(wrap);
      io.observe(wrap);
      resize();
      setReady(true);
      kick();
    })();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onClick);
    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onClick);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className={`block h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default IllustrationCanvas;
