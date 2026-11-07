import type { Env, Illustration } from "./IllustrationCanvas";
import { H, W } from "./IllustrationCanvas";
import { chip, clamp, ease, pointInPoly } from "./draw";

// Modelagem e simulação: modelo geológico em malha (corner-point), em perspectiva isométrica,
// com um recorte em L e uma cava que expõe as camadas dobradas.

const NX = 44, NZ = 30;
const XA = 26, ZA = 16; // canto do recorte
const KX = 11.4, KY = 6.0, KH = 10.5;
const OX = 600 - ((NX - NZ) * KX) / 2;
const OY = 318;

const LAYERS = [
  { color: [228, 203, 99], thick: 2.0 },
  { color: [90, 168, 106], thick: 2.0 },
  { color: [196, 88, 67], thick: 1.3 },
  { color: [58, 115, 184], thick: 1.8 },
  { color: [196, 88, 67], thick: 1.0 },
  { color: [90, 168, 106], thick: 1.8 },
  { color: [228, 203, 99], thick: 1.2 },
  { color: [216, 146, 75], thick: 99 },
];
const NAMES: Record<string, string[]> = {
  pt: ["Arenito basal", "Folhelho", "Marga", "Arenito reservatório", "Marga", "Folhelho selante", "Siltito", "Sedimentos recentes"],
  en: ["Basal sandstone", "Shale", "Marl", "Reservoir sandstone", "Marl", "Sealing shale", "Siltstone", "Recent sediments"],
};

const fold = (x: number, z: number) =>
  1.3 * Math.sin(x * 0.12 + z * 0.06) + 0.9 * Math.cos(z * 0.16 + x * 0.03) + 2.2 * Math.exp(-((x - 18) ** 2 + (z - 12) ** 2) / 140);
const bases = LAYERS.reduce<number[]>((acc, _l, i) => [...acc, (acc[i - 1] ?? 0) + (i ? LAYERS[i - 1].thick : 0)], []);
const boundary = (k: number, x: number, z: number) => (k === 0 ? 0 : bases[k] + fold(x, z) * (0.6 + k * 0.08));
const pit = (x: number, z: number) => 8.2 * Math.pow(Math.max(0, 1 - ((x - 19) / 10.5) ** 2 - ((z - 10.5) / 7.5) ** 2), 0.75);
const surface = (x: number, z: number) =>
  14.2 + 0.5 * Math.sin(x * 0.22) + 0.4 * Math.cos(z * 0.27) + fold(x, z) * 0.45 - pit(x, z);
const removed = (i: number, j: number) => i >= XA && j >= ZA;
const layerAt = (y: number, x: number, z: number) => {
  let k = 0;
  while (k < LAYERS.length - 1 && y > boundary(k + 1, x, z)) k++;
  return k;
};
const P = (x: number, y: number, z: number): [number, number] => [OX + (x - z) * KX, OY + (x + z) * KY - y * KH];

interface Poly { pts: number[]; layer: number; xi: number; shade: number }

function buildPolys() {
  const polys: Poly[] = [];
  const light = [-0.45, 0.85, -0.3];
  const ln = Math.hypot(...light);
  // topo: células da frente por último
  const cells: [number, number][] = [];
  for (let i = 0; i < NX; i++) for (let j = 0; j < NZ; j++) if (!removed(i, j)) cells.push([i, j]);
  cells.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  for (const [i, j] of cells) {
    const h00 = surface(i, j), h10 = surface(i + 1, j), h01 = surface(i, j + 1), h11 = surface(i + 1, j + 1);
    const hc = (h00 + h10 + h01 + h11) / 4;
    const dx = (h10 + h11 - h00 - h01) / 2, dz = (h01 + h11 - h00 - h10) / 2;
    const n = [-dx, 1.6, -dz];
    const nn = Math.hypot(...n);
    const lam = (n[0] * light[0] + n[1] * light[1] + n[2] * light[2]) / (nn * ln);
    const pts = [...P(i, h00, j), ...P(i + 1, h10, j), ...P(i + 1, h11, j + 1), ...P(i, h01, j + 1)];
    polys.push({ pts, layer: layerAt(hc, i + 0.5, j + 0.5), xi: i, shade: 0.62 + 0.38 * clamp(lam, 0, 1) });
  }
  // faces laterais, divididas por camada
  const face = (ax: number, az: number, bx: number, bz: number, shade: number, xi: number) => {
    const ta = surface(ax, az), tb = surface(bx, bz);
    for (let k = 0; k < LAYERS.length; k++) {
      const ba = Math.min(boundary(k, ax, az), ta), bb = Math.min(boundary(k, bx, bz), tb);
      const ua = k < LAYERS.length - 1 ? Math.min(boundary(k + 1, ax, az), ta) : ta;
      const ub = k < LAYERS.length - 1 ? Math.min(boundary(k + 1, bx, bz), tb) : tb;
      if (ua - ba < 0.01 && ub - bb < 0.01) continue;
      polys.push({ pts: [...P(ax, ba, az), ...P(bx, bb, bz), ...P(bx, ub, bz), ...P(ax, ua, az)], layer: k, xi, shade });
    }
  };
  for (let j = ZA; j < NZ; j++) face(XA, j, XA, j + 1, 0.6, XA); // parede interna (x = XA)
  for (let i = XA; i < NX; i++) face(i, ZA, i + 1, ZA, 0.8, i); // parede interna (z = ZA)
  for (let i = 0; i < XA; i++) face(i, NZ, i + 1, NZ, 0.8, i); // frente esquerda
  for (let j = 0; j < ZA; j++) face(NX, j, NX, j + 1, 0.6, NX); // frente direita
  return polys;
}

const rgb = (c: number[], s: number, a = 1) => `rgba(${Math.round(c[0] * s)}, ${Math.round(c[1] * s)}, ${Math.round(c[2] * s)}, ${a})`;

export default function geomodel(): Illustration {
  const lang = () => (document.documentElement.lang.startsWith("en") ? "en" : "pt");
  const polys = buildPolys();
  let base: HTMLCanvasElement | null = null;
  let hoverLayer = -1;
  let hoverAt = { x: 0, y: 0 };
  let mix = 0;
  let started = -1;

  const fill = (g: CanvasRenderingContext2D, p: Poly) => {
    g.beginPath();
    g.moveTo(p.pts[0], p.pts[1]);
    for (let i = 2; i < p.pts.length; i += 2) g.lineTo(p.pts[i], p.pts[i + 1]);
    g.closePath();
  };

  const wells = [
    { i: 8, j: 6 },
    { i: 36, j: 8 },
  ].map((w) => ({ top: P(w.i, surface(w.i, w.j), w.j) }));

  return {
    init(env: Env) {
      const { canvas, ctx: g } = env.layer();
      // fundo e sombra no chão
      const bg = g.createRadialGradient(600, 420, 60, 600, 420, 700);
      bg.addColorStop(0, "#123740");
      bg.addColorStop(1, "#061a1f");
      g.fillStyle = bg;
      g.fillRect(0, 0, W, H);
      g.fillStyle = "rgba(0, 0, 0, 0.35)";
      g.beginPath();
      g.ellipse(600, 742, 470, 46, 0, 0, Math.PI * 2);
      g.fill();
      // células com a grade
      g.lineJoin = "round";
      for (const p of polys) {
        fill(g, p);
        g.fillStyle = rgb(LAYERS[p.layer].color, p.shade);
        g.fill();
        g.strokeStyle = rgb(LAYERS[p.layer].color, p.shade * 0.62, 0.9);
        g.lineWidth = 0.7;
        g.stroke();
      }
      // subdivisões verticais finas nas faces (aspecto de malha)
      g.strokeStyle = "rgba(0, 0, 0, 0.18)";
      g.lineWidth = 0.5;
      const sub = (ax: number, az: number, bx: number, bz: number) => {
        const ta = surface(ax, az), tb = surface(bx, bz);
        for (let y = 0.5; y < Math.max(ta, tb); y += 0.5) {
          if (y > ta || y > tb) continue;
          const a = P(ax, y, az), b = P(bx, y, bz);
          g.beginPath();
          g.moveTo(a[0], a[1]);
          g.lineTo(b[0], b[1]);
          g.stroke();
        }
      };
      for (let j = ZA; j < NZ; j++) sub(XA, j, XA, j + 1);
      for (let i = XA; i < NX; i++) sub(i, ZA, i + 1, ZA);
      for (let i = 0; i < XA; i++) sub(i, NZ, i + 1, NZ);
      for (let j = 0; j < ZA; j++) sub(NX, j, NX, j + 1);
      // arestas do bloco
      g.strokeStyle = "rgba(255, 255, 255, 0.35)";
      g.lineWidth = 1.2;
      const edge = (pts: [number, number, number][]) => {
        g.beginPath();
        pts.forEach(([x, y, z], i) => {
          const [sx, sy] = P(x, y, z);
          if (i) g.lineTo(sx, sy);
          else g.moveTo(sx, sy);
        });
        g.stroke();
      };
      edge([[0, 0, NZ], [XA, 0, NZ], [XA, 0, ZA], [NX, 0, ZA], [NX, 0, 0]]);
      for (const [x, z] of [[0, NZ], [XA, NZ], [XA, ZA], [NX, ZA], [NX, 0]]) edge([[x, 0, z], [x, surface(x, z), z]]);
      base = canvas;
    },
    pointer(p) {
      hoverLayer = -1;
      if (!p) return;
      for (let i = polys.length - 1; i >= 0; i--) {
        if (pointInPoly(p.x, p.y, polys[i].pts)) {
          hoverLayer = polys[i].layer;
          hoverAt = p;
          break;
        }
      }
      return hoverLayer >= 0 ? "pointer" : "";
    },
    frame(g, t, dt, env) {
      if (started < 0) started = t;
      const intro = env.reduced ? 1 : ease(clamp((t - started) / 1.6, 0, 1));
      g.save();
      g.beginPath();
      g.rect(0, 0, W * intro + 1, H);
      g.clip();
      if (base) g.drawImage(base, 0, 0, W, H);

      // faixa de simulação varrendo a malha
      const scan = ((t * 4) % (NX + 12)) - 6;
      for (const p of polys) {
        const d = Math.abs(p.xi + 0.5 - scan);
        if (d > 2.2) continue;
        fill(g, p);
        g.fillStyle = `rgba(190, 240, 255, ${0.32 * (1 - d / 2.2)})`;
        g.fill();
      }

      // poços sobre o modelo
      wells.forEach(({ top: [x, y] }, k) => {
        g.strokeStyle = "#eaf3f4";
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(x - 9, y);
        g.lineTo(x, y - 38);
        g.lineTo(x + 9, y);
        g.moveTo(x - 6, y - 12);
        g.lineTo(x + 6, y - 12);
        g.moveTo(x - 3, y - 26);
        g.lineTo(x + 3, y - 26);
        g.stroke();
        g.fillStyle = `rgba(255, 210, 140, ${0.5 + 0.5 * Math.sin(t * 3 + k * 2)})`;
        g.beginPath();
        g.arc(x, y - 40, 3.5, 0, Math.PI * 2);
        g.fill();
      });

      // camada destacada
      mix += ((hoverLayer >= 0 ? 1 : 0) - mix) * Math.min(1, (dt || 0.016) * 10);
      if (hoverLayer >= 0) {
        for (const p of polys) {
          fill(g, p);
          if (p.layer === hoverLayer) {
            g.fillStyle = `rgba(108, 200, 224, ${0.42 * mix})`;
            g.fill();
            g.strokeStyle = `rgba(200, 240, 250, ${0.7 * mix})`;
            g.lineWidth = 0.8;
            g.stroke();
          } else {
            g.fillStyle = `rgba(4, 20, 24, ${0.45 * mix})`;
            g.fill();
          }
        }
        chip(g, clamp(hoverAt.x, 150, W - 150), clamp(hoverAt.y - 34, 30, H - 30), NAMES[lang()][hoverLayer], mix);
      }
      g.restore();
    },
  };
}
