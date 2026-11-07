import type { Env, Illustration } from "./IllustrationCanvas";
import { H, W } from "./IllustrationCanvas";
import { glowSprite, rng } from "./draw";

// Machine learning: três fluxos de dados de geoenergia se abrem em fibras
// e alimentam uma parede de dígitos, o modelo aprendendo.

const NODE_X = 312;
const WALL_X = 668;
const ROWS = 34;
const COLS = 40;
const ROW_Y0 = 132;
const ROW_DY = 16;
const COL_DX = 13;
const rowY = (r: number) => ROW_Y0 + r * ROW_DY;

const SOURCES = [
  { y: 290, color: "#4fd2f0", rgb: [79, 210, 240] },
  { y: 400, color: "#ec6f95", rgb: [236, 111, 149] },
  { y: 510, color: "#f2bf4a", rgb: [242, 191, 74] },
];
const NAMES: Record<string, string[]> = {
  pt: ["Perfis de poço", "Dados sísmicos", "Histórico de produção"],
  en: ["Well logs", "Seismic data", "Production history"],
};

const WALL_COLORS = ["#2f86d6", "#3aa6e6", "#6fd3ef", "#1f5f9a", "#9fe6f7"];

export default function datastreams(): Illustration {
  const lang = () => (document.documentElement.lang.startsWith("en") ? "en" : "pt");
  const rand = rng(7);
  const bits = SOURCES.map(() => Array.from({ length: 40 }, () => (rand() < 0.5 ? "0" : "1")));
  // cada fonte liga-se a todas as linhas da parede, em ordem levemente embaralhada
  const curves = SOURCES.flatMap((_, si) =>
    Array.from({ length: ROWS }, (_, r) => ({ si, r, bend: 0.85 + rand() * 0.3 }))
  );
  const bez = (c: (typeof curves)[number], k: number): [number, number] => {
    const y0 = SOURCES[c.si].y, y1 = rowY(c.r);
    const x0 = NODE_X, x3 = WALL_X - 12;
    const x1 = 470 * c.bend, x2 = 520;
    const a = 1 - k;
    return [
      a * a * a * x0 + 3 * a * a * k * x1 + 3 * a * k * k * x2 + k * k * k * x3,
      a * a * a * y0 + 3 * a * a * k * y0 + 3 * a * k * k * y1 + k * k * k * y1,
    ];
  };
  const pulses = Array.from({ length: 110 }, () => ({ c: Math.floor(rand() * curves.length), k: rand(), s: 0.25 + rand() * 0.35 }));
  const cells = Array.from({ length: ROWS * COLS }, () => ({ d: rand() < 0.5 ? "0" : "1", c: Math.floor(rand() * WALL_COLORS.length), dot: rand() < 0.12, accent: rand() < 0.06 ? Math.floor(rand() * 3) : -1 }));
  const sprites = SOURCES.map((s) => glowSprite(`rgba(${s.rgb.join(",")},1)`));
  const white = glowSprite("rgba(200, 240, 255, 1)");

  let bg: HTMLCanvasElement | null = null;
  let wall: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null = null;
  let hoverSource = -1;
  let pointerAt: { x: number; y: number } | null = null;
  const focus = [0, 0, 0];

  const drawCell = (g: CanvasRenderingContext2D, i: number) => {
    const r = Math.floor(i / COLS), c = i % COLS;
    const x = WALL_X + c * COL_DX, y = rowY(r);
    g.clearRect(x - 6.5, y - 12, COL_DX, ROW_DY);
    const cell = cells[i];
    const fade = 1 - c / (COLS * 1.08);
    const color = cell.accent >= 0 ? SOURCES[cell.accent].color : WALL_COLORS[cell.c];
    g.globalAlpha = fade * (cell.accent >= 0 ? 1 : 0.85);
    g.fillStyle = color;
    if (cell.dot) {
      g.beginPath();
      g.arc(x, y - 1, 2.6, 0, Math.PI * 2);
      g.fill();
    } else {
      g.fillText(cell.d, x, y);
    }
    g.globalAlpha = 1;
  };

  return {
    init(env: Env) {
      const b = env.layer();
      const grad = b.ctx.createRadialGradient(560, 400, 40, 560, 400, 760);
      grad.addColorStop(0, "#0a2d44");
      grad.addColorStop(1, "#030f1a");
      b.ctx.fillStyle = grad;
      b.ctx.fillRect(0, 0, W, H);
      // grade de pontos ao fundo
      b.ctx.fillStyle = "rgba(120, 190, 230, 0.08)";
      for (let x = 10; x < W; x += 22) for (let y = 10; y < H; y += 22) b.ctx.fillRect(x, y, 1.5, 1.5);
      bg = b.canvas;

      wall = env.layer();
      wall.ctx.font = "600 13px Figtree, system-ui, sans-serif";
      wall.ctx.textAlign = "center";
      wall.ctx.textBaseline = "alphabetic";
      for (let i = 0; i < cells.length; i++) drawCell(wall.ctx, i);
    },
    pointer(p) {
      pointerAt = p;
      hoverSource = -1;
      if (!p) return;
      if (p.x < NODE_X + 60) SOURCES.forEach((s, i) => Math.abs(p.y - s.y) < 46 && (hoverSource = i));
      return hoverSource >= 0 ? "pointer" : "";
    },
    frame(g, t, dt, env) {
      if (bg) g.drawImage(bg, 0, 0, W, H);
      const step = Math.min(1, (dt || 0.016) * 8);
      SOURCES.forEach((_, i) => (focus[i] += ((hoverSource < 0 ? 0.5 : hoverSource === i ? 1 : 0.15) - focus[i]) * step));

      // fibras
      g.save();
      g.globalCompositeOperation = "lighter";
      for (const c of curves) {
        const s = SOURCES[c.si];
        g.strokeStyle = `rgba(${s.rgb.join(",")}, ${0.08 + 0.32 * focus[c.si]})`;
        g.lineWidth = 1.1;
        g.beginPath();
        for (let k = 0; k <= 1.0001; k += 0.05) {
          const [x, y] = bez(c, k);
          if (k === 0) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.stroke();
      }
      // pulsos de dados correndo pelas fibras
      for (const p of pulses) {
        if (!env.reduced) p.k += (dt || 0) * p.s;
        if (p.k > 1) {
          p.k = 0;
          p.c = Math.floor(Math.random() * curves.length);
        }
        const c = curves[p.c];
        const [x, y] = bez(c, p.k);
        const a = (0.4 + 0.6 * focus[c.si]) * Math.sin(p.k * Math.PI);
        g.globalAlpha = a;
        g.drawImage(sprites[c.si], x - 9, y - 9, 18, 18);
      }
      g.globalAlpha = 1;
      // nós de entrada
      SOURCES.forEach((s, i) => {
        g.globalAlpha = 0.6 + 0.4 * focus[i];
        g.drawImage(sprites[i], NODE_X - 30, s.y - 30, 60, 60);
      });
      g.restore();

      // fluxos binários entrando pela esquerda
      g.save();
      g.font = "600 18px Figtree, system-ui, sans-serif";
      g.textBaseline = "middle";
      g.textAlign = "center";
      SOURCES.forEach((s, si) => {
        const off = env.reduced ? 0 : (t * 34) % 18;
        bits[si].forEach((bit, k) => {
          const x = k * 18 - 18 * 22 + off + NODE_X - 6;
          if (x < 8 || x > NODE_X - 10) return;
          g.globalAlpha = (0.15 + 0.85 * (x / NODE_X)) * (0.55 + 0.45 * focus[si]);
          g.fillStyle = s.color;
          g.fillText(bit, x, s.y);
        });
        if (!env.reduced && Math.random() < 0.02) bits[si][Math.floor(Math.random() * 40)] = Math.random() < 0.5 ? "0" : "1";
        g.globalAlpha = 0.7 + 0.3 * focus[si];
        g.font = `600 ${env.css < 0.45 ? 30 : 17}px Figtree, system-ui, sans-serif`;
        g.textAlign = "left";
        g.fillText(NAMES[lang()][si], 24, s.y - 34);
        g.font = "600 18px Figtree, system-ui, sans-serif";
        g.textAlign = "center";
      });
      g.restore();

      // pontas das linhas e a parede de dígitos (cintilando)
      if (wall) {
        if (!env.reduced) {
          wall.ctx.font = "600 13px Figtree, system-ui, sans-serif";
          for (let n = 0; n < 40; n++) {
            const i = Math.floor(Math.random() * cells.length);
            cells[i].d = Math.random() < 0.5 ? "0" : "1";
            cells[i].c = Math.floor(Math.random() * WALL_COLORS.length);
            drawCell(wall.ctx, i);
          }
        }
        g.drawImage(wall.canvas, 0, 0, W, H);
      }
      for (let r = 0; r < ROWS; r++) {
        const si = r % 3;
        g.fillStyle = SOURCES[si].color;
        g.globalAlpha = 0.5 + 0.5 * focus[si];
        g.beginPath();
        g.arc(WALL_X - 12, rowY(r) - 5, 3, 0, Math.PI * 2);
        g.fill();
      }
      g.globalAlpha = 1;

      // varredura luminosa e o brilho sob o cursor
      g.save();
      g.globalCompositeOperation = "lighter";
      const sx = WALL_X + ((t * 120) % (COLS * COL_DX + 200)) - 100;
      g.globalAlpha = 0.18;
      g.drawImage(white, sx - 60, ROW_Y0 - 40, 120, ROWS * ROW_DY + 60);
      if (pointerAt && pointerAt.x > WALL_X - 20) {
        g.globalAlpha = 0.5;
        g.drawImage(white, pointerAt.x - 70, pointerAt.y - 70, 140, 140);
      }
      g.restore();
    },
  };
}
