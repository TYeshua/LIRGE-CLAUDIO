import type { Env, Illustration } from "./IllustrationCanvas";
import { H, W } from "./IllustrationCanvas";
import { chip, glowSprite, hexPath, leaf, rng } from "./draw";

// Captura e armazenamento de carbono: a folhagem emoldura a nuvem de CO₂, que desce
// por um poço até o reservatório, sob a rocha selante. Ícones hexagonais orbitam o tema.

const CX = 600;
const CY = 292;
const SURFACE = 600;
const WELL_X = 600;

type IconKind = "netzero" | "recycle" | "factory" | "atom" | "drop" | "plug" | "sun" | "sprout" | "globe" | "wind";
interface Icon { kind: IconKind; x: number; y: number; r: number }

const ICONS: Icon[] = [
  { kind: "netzero", x: 300, y: 150, r: 70 },
  { kind: "recycle", x: 500, y: 92, r: 48 },
  { kind: "factory", x: 722, y: 118, r: 60 },
  { kind: "atom", x: 872, y: 150, r: 32 },
  { kind: "drop", x: 880, y: 268, r: 40 },
  { kind: "plug", x: 1004, y: 238, r: 46 },
  { kind: "sun", x: 212, y: 262, r: 40 },
  { kind: "sprout", x: 132, y: 372, r: 38 },
  { kind: "globe", x: 296, y: 404, r: 60 },
  { kind: "wind", x: 930, y: 418, r: 66 },
];

export const ICON_LABELS: Record<string, Record<IconKind, string>> = {
  pt: {
    netzero: "Emissões líquidas zero", recycle: "Economia circular", factory: "Indústria de baixo carbono",
    atom: "Pesquisa aplicada", drop: "Recursos hídricos", plug: "Energia limpa", sun: "Energia solar",
    sprout: "Reflorestamento", globe: "Clima global", wind: "Energia eólica",
  },
  en: {
    netzero: "Net zero", recycle: "Circular economy", factory: "Low-carbon industry",
    atom: "Applied research", drop: "Water resources", plug: "Clean energy", sun: "Solar energy",
    sprout: "Reforestation", globe: "Global climate", wind: "Wind energy",
  },
};

const surfaceY = (x: number) => SURFACE + 6 * Math.sin(x / 90) + 3 * Math.sin(x / 37);
const LAYERS = [
  { top: (x: number) => surfaceY(x), color: "#27463a" },
  { top: (x: number) => 628 + 5 * Math.sin(x / 140), color: "#e3cb9a" },
  { top: (x: number) => 664 + 6 * Math.sin(x / 160 + 1), color: "#d1a764" },
  { top: (x: number) => 698 + 7 * Math.sin(x / 180 + 2) - (x - 600) * 0.012, color: "#2f4a50" },
  { top: (x: number) => 726 + 7 * Math.sin(x / 180 + 2) - (x - 600) * 0.012, color: "#b98544" },
  { top: (x: number) => 778 + 4 * Math.sin(x / 120), color: "#1d3a40" },
];
const capBase = LAYERS[4].top;

function drawIcon(g: CanvasRenderingContext2D, ic: Icon, t: number) {
  const s = ic.r * 0.5; // escala do pictograma
  g.save();
  g.translate(ic.x, ic.y);
  g.strokeStyle = "#ffffff";
  g.fillStyle = "#ffffff";
  g.lineWidth = Math.max(2, ic.r * 0.06);
  g.lineCap = "round";
  g.lineJoin = "round";
  switch (ic.kind) {
    case "netzero": {
      g.beginPath();
      g.arc(0, 0, s * 1.15, 0, Math.PI * 2);
      g.stroke();
      g.font = `700 ${s * 0.62}px Montserrat, sans-serif`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText("NET", -s * 0.12, -s * 0.32);
      g.fillText("ZERO", 0, s * 0.36);
      leaf(g, s * 0.32, -s * 0.2, s * 0.5, s * 0.22, -1.1, "#ffffff", "rgba(46,122,94,0.6)");
      break;
    }
    case "recycle": {
      for (let k = 0; k < 3; k++) {
        g.save();
        g.rotate((k * Math.PI * 2) / 3);
        g.beginPath();
        g.arc(0, 0, s * 0.8, -1.9, -0.55);
        g.stroke();
        const ax = Math.cos(-0.55) * s * 0.8, ay = Math.sin(-0.55) * s * 0.8;
        g.beginPath();
        g.moveTo(ax + s * 0.28, ay - s * 0.05);
        g.lineTo(ax, ay + s * 0.02);
        g.lineTo(ax + s * 0.02, ay - s * 0.3);
        g.stroke();
        g.restore();
      }
      break;
    }
    case "factory": {
      g.beginPath();
      g.moveTo(-s, s * 0.7);
      g.lineTo(-s, -s * 0.05);
      g.lineTo(-s * 0.5, s * 0.25);
      g.lineTo(-s * 0.5, -s * 0.05);
      g.lineTo(0, s * 0.25);
      g.lineTo(0, -s * 0.05);
      g.lineTo(s * 0.45, s * 0.25);
      g.lineTo(s * 0.45, -s * 0.75);
      g.lineTo(s * 0.75, -s * 0.75);
      g.lineTo(s * 0.75, s * 0.7);
      g.closePath();
      g.fill();
      g.fillStyle = "rgba(46,122,94,0.9)";
      for (let k = 0; k < 3; k++) g.fillRect(-s * 0.85 + k * s * 0.42, s * 0.38, s * 0.16, s * 0.16);
      leaf(g, s * 0.2, -s * 0.55, s * 0.55, s * 0.22, -2.3, "#ffffff", "rgba(46,122,94,0.6)");
      break;
    }
    case "atom": {
      g.beginPath();
      g.arc(0, 0, s * 0.16, 0, Math.PI * 2);
      g.fill();
      for (let k = 0; k < 3; k++) {
        g.beginPath();
        g.ellipse(0, 0, s * 0.95, s * 0.36, (k * Math.PI) / 3 + t * 0.4, 0, Math.PI * 2);
        g.stroke();
      }
      break;
    }
    case "drop": {
      g.beginPath();
      g.moveTo(0, -s * 0.95);
      g.bezierCurveTo(s * 0.35, -s * 0.45, s * 0.7, -s * 0.05, s * 0.7, s * 0.3);
      g.arc(0, s * 0.3, s * 0.7, 0, Math.PI);
      g.bezierCurveTo(-s * 0.7, -s * 0.05, -s * 0.35, -s * 0.45, 0, -s * 0.95);
      g.fill();
      break;
    }
    case "plug": {
      g.beginPath();
      g.roundRect(-s * 0.55, -s * 0.15, s * 0.7, s * 0.55, s * 0.1);
      g.fill();
      g.fillRect(-s * 0.45, -s * 0.42, s * 0.1, s * 0.3);
      g.fillRect(-s * 0.05, -s * 0.42, s * 0.1, s * 0.3);
      g.beginPath();
      g.moveTo(-s * 0.2, s * 0.4);
      g.quadraticCurveTo(-s * 0.2, s * 0.85, s * 0.35, s * 0.8);
      g.stroke();
      leaf(g, s * 0.25, -s * 0.05, s * 0.75, s * 0.28, -0.9, "#ffffff", "rgba(46,122,94,0.6)");
      break;
    }
    case "sun": {
      g.beginPath();
      g.arc(0, 0, s * 0.42, 0, Math.PI * 2);
      g.stroke();
      for (let k = 0; k < 12; k++) {
        const a = (k * Math.PI) / 6 + t * 0.2;
        g.beginPath();
        g.moveTo(Math.cos(a) * s * 0.62, Math.sin(a) * s * 0.62);
        g.lineTo(Math.cos(a) * s * 0.9, Math.sin(a) * s * 0.9);
        g.stroke();
      }
      break;
    }
    case "sprout": {
      g.beginPath();
      g.moveTo(-s * 0.8, s * 0.6);
      g.quadraticCurveTo(0, s * 0.35, s * 0.8, s * 0.6);
      g.lineTo(-s * 0.8, s * 0.6);
      g.fill();
      g.beginPath();
      g.moveTo(0, s * 0.5);
      g.quadraticCurveTo(s * 0.05, 0, 0, -s * 0.2);
      g.stroke();
      leaf(g, 0, -s * 0.15, s * 0.6, s * 0.24, -0.7 + Math.sin(t) * 0.08, "#ffffff", "rgba(46,122,94,0.6)");
      leaf(g, 0, 0, s * 0.5, s * 0.2, -2.5 - Math.sin(t) * 0.08, "#ffffff", "rgba(46,122,94,0.6)");
      break;
    }
    case "globe": {
      g.beginPath();
      g.arc(0, 0, s * 0.9, 0, Math.PI * 2);
      g.fillStyle = "rgba(255,255,255,0.92)";
      g.fill();
      g.fillStyle = "#2e7a5e";
      const land: [number, number, number, number][] = [
        [-0.35, -0.35, 0.32, 0.22], [-0.2, 0.15, 0.2, 0.38], [0.3, -0.25, 0.3, 0.2], [0.42, 0.25, 0.22, 0.28],
      ];
      land.forEach(([x, y, rx, ry], k) => {
        g.beginPath();
        g.ellipse(x * s, y * s, rx * s, ry * s, k * 0.6, 0, Math.PI * 2);
        g.fill();
      });
      break;
    }
    case "wind": {
      g.beginPath();
      g.moveTo(-s * 0.06, s * 0.95);
      g.lineTo(-s * 0.03, -s * 0.2);
      g.lineTo(s * 0.03, -s * 0.2);
      g.lineTo(s * 0.06, s * 0.95);
      g.fill();
      g.save();
      g.translate(0, -s * 0.25);
      g.rotate(t * 1.6);
      for (let k = 0; k < 3; k++) {
        g.rotate((Math.PI * 2) / 3);
        g.beginPath();
        g.moveTo(0, 0);
        g.quadraticCurveTo(s * 0.12, -s * 0.35, 0, -s * 0.78);
        g.quadraticCurveTo(-s * 0.06, -s * 0.35, 0, 0);
        g.fill();
      }
      g.restore();
      g.beginPath();
      g.arc(0, -s * 0.25, s * 0.07, 0, Math.PI * 2);
      g.fill();
      break;
    }
  }
  g.restore();
}

function drawCloud(g: CanvasRenderingContext2D, x: number, y: number) {
  g.save();
  g.fillStyle = "#ffffff";
  g.shadowColor = "rgba(255,255,255,0.35)";
  g.shadowBlur = 24;
  g.beginPath();
  g.arc(x - 62, y + 10, 40, 0, Math.PI * 2);
  g.arc(x - 18, y - 22, 56, 0, Math.PI * 2);
  g.arc(x + 44, y - 4, 46, 0, Math.PI * 2);
  g.arc(x + 82, y + 18, 32, 0, Math.PI * 2);
  g.roundRect(x - 100, y + 4, 214, 52, 26);
  g.fill();
  g.shadowBlur = 0;
  g.fillStyle = "#2e7a5e";
  g.font = "700 58px Montserrat, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "alphabetic";
  g.fillText("CO", x - 6, y + 34);
  g.font = "700 30px Montserrat, sans-serif";
  g.fillText("2", x + 50, y + 46);
  g.restore();
}

function drawMolecule(g: CanvasRenderingContext2D, x: number, y: number, a: number, alpha: number) {
  g.save();
  g.globalAlpha = alpha;
  g.translate(x, y);
  g.rotate(a);
  g.fillStyle = "#eef8f1";
  g.beginPath();
  g.arc(-11, 0, 6, 0, Math.PI * 2);
  g.arc(11, 0, 6, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#24433a";
  g.beginPath();
  g.arc(0, 0, 6.5, 0, Math.PI * 2);
  g.fill();
  g.restore();
}

export default function carbon(): Illustration {
  const isEn = () => document.documentElement.lang.startsWith("en");
  const text = () =>
    isEn()
      ? { cap: "Caprock", store: "Stored CO₂", well: "Injection well", icons: ICON_LABELS.en }
      : { cap: "Rocha selante", store: "CO₂ armazenado", well: "Poço de injeção", icons: ICON_LABELS.pt };

  const rand = rng(12);
  const bokeh = Array.from({ length: 46 }, () => ({
    x: rand() * W, y: rand() * 560, r: 6 + rand() * 26, s: 6 + rand() * 14, a: 0.25 + rand() * 0.5, ph: rand() * 10,
  }));
  const molecules = Array.from({ length: 9 }, (_, i) => ({ ph: i / 9, a: rand() * Math.PI }));
  const sprite = glowSprite("rgba(214, 240, 140, 1)");
  let hover = -1;
  const hoverMix = new Array(ICONS.length).fill(0) as number[];
  let bg: HTMLCanvasElement | null = null;

  const front = [
    { x: -30, y: 560, len: 330, w: 70, a: -0.55 }, { x: -40, y: 470, len: 280, w: 58, a: -0.15 },
    { x: 20, y: 600, len: 240, w: 50, a: -1.05 }, { x: 1230, y: 560, len: 320, w: 66, a: Math.PI + 0.5 },
    { x: 1240, y: 430, len: 260, w: 54, a: Math.PI + 0.12 }, { x: 1180, y: 610, len: 230, w: 48, a: Math.PI + 1.0 },
    { x: 80, y: -30, len: 250, w: 52, a: 1.15 }, { x: 1130, y: -40, len: 260, w: 54, a: 2.0 },
  ];

  return {
    init(env: Env) {
      const { canvas, ctx: g } = env.layer();
      // céu esverdeado e folhas desfocadas ao fundo
      const sky = g.createLinearGradient(0, 0, 0, SURFACE);
      sky.addColorStop(0, "#0d3a33");
      sky.addColorStop(1, "#1d5d47");
      g.fillStyle = sky;
      g.fillRect(0, 0, W, SURFACE + 20);
      const glow = g.createRadialGradient(CX, CY, 20, CX, CY, 420);
      glow.addColorStop(0, "rgba(180, 230, 160, 0.28)");
      glow.addColorStop(1, "rgba(180, 230, 160, 0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, W, SURFACE);
      const r2 = rng(3);
      for (let i = 0; i < 16; i++) {
        g.globalAlpha = 0.22 + r2() * 0.18;
        leaf(g, r2() * W, 80 + r2() * 520, 260 + r2() * 220, 60 + r2() * 50, r2() * Math.PI * 2, "#2a7353", "rgba(0,0,0,0)");
      }
      g.globalAlpha = 1;

      // subsolo em camadas
      for (let k = 0; k < LAYERS.length; k++) {
        const top = LAYERS[k].top;
        const bot = k < LAYERS.length - 1 ? LAYERS[k + 1].top : () => H;
        g.beginPath();
        g.moveTo(0, top(0));
        for (let x = 0; x <= W; x += 10) g.lineTo(x, top(x));
        for (let x = W; x >= 0; x -= 10) g.lineTo(x, bot(x));
        g.closePath();
        g.fillStyle = LAYERS[k].color;
        g.fill();
      }
      // grãos no reservatório e textura nas camadas de areia
      const r3 = rng(8);
      for (let i = 0; i < 900; i++) {
        const x = r3() * W;
        const k = 1 + Math.floor(r3() * 5);
        const top = LAYERS[k].top(x), bot = k < 5 ? LAYERS[k + 1].top(x) : H;
        g.fillStyle = k === 3 ? "rgba(255,255,255,0.06)" : "rgba(60,40,15,0.18)";
        g.beginPath();
        g.arc(x, top + 3 + r3() * (bot - top - 6), 0.8 + r3() * 1.8, 0, Math.PI * 2);
        g.fill();
      }
      // capim na superfície
      g.strokeStyle = "#4f9a6a";
      g.lineWidth = 2;
      for (let x = 4; x < W; x += 7) {
        const y = surfaceY(x);
        g.beginPath();
        g.moveTo(x, y + 2);
        g.quadraticCurveTo(x + 2, y - 6, x + (r3() - 0.5) * 8, y - 8 - r3() * 10);
        g.stroke();
      }
      // poço e cabeça de poço
      g.fillStyle = "#c9d7db";
      g.fillRect(WELL_X - 4, SURFACE - 2, 8, capBase(WELL_X) + 26 - SURFACE);
      g.fillStyle = "#9fb4ba";
      g.fillRect(WELL_X - 16, SURFACE - 34, 32, 34);
      g.fillStyle = "#d6a762";
      g.fillRect(WELL_X - 26, SURFACE - 26, 52, 9);
      g.fillRect(WELL_X - 9, SURFACE - 46, 18, 12);
      bg = canvas;
    },

    pointer(p) {
      hover = -1;
      if (!p) return;
      ICONS.forEach((ic, i) => {
        if (Math.hypot(p.x - ic.x, p.y - ic.y) < ic.r) hover = i;
      });
      return hover >= 0 ? "pointer" : "";
    },

    frame(g, t, dt, env) {
      if (bg) g.drawImage(bg, 0, 0, W, H);

      // brilhos flutuando
      for (const b of bokeh) {
        const y = ((b.y - t * b.s) % 600 + 600) % 600;
        g.globalAlpha = b.a * (0.6 + 0.4 * Math.sin(t * 1.3 + b.ph));
        g.drawImage(sprite, b.x + Math.sin(t * 0.4 + b.ph) * 12 - b.r, y - b.r, b.r * 2, b.r * 2);
      }
      g.globalAlpha = 1;

      // órbita pontilhada
      g.save();
      g.strokeStyle = "rgba(255,255,255,0.35)";
      g.setLineDash([2, 10]);
      g.lineDashOffset = -t * 12;
      g.lineWidth = 2;
      g.beginPath();
      g.ellipse(CX, CY - 10, 400, 250, 0, 0, Math.PI * 2);
      g.stroke();
      g.setLineDash([]);
      g.restore();

      // pluma de CO₂ no reservatório (cresce, depois recomeça)
      const cycle = (t % 16) / 16;
      const reach = 40 + 420 * Math.min(1, cycle * 1.25);
      g.save();
      g.beginPath();
      for (let x = WELL_X - reach * 1.2; x <= WELL_X + reach * 0.85; x += 6) {
        const u = x < WELL_X ? (WELL_X - x) / (reach * 1.2) : (x - WELL_X) / (reach * 0.85);
        const th = 28 * Math.pow(Math.max(0, 1 - u * u), 0.6);
        g.lineTo(x, capBase(x) + 2 + th);
      }
      for (let x = WELL_X + reach * 0.85; x >= WELL_X - reach * 1.2; x -= 6) g.lineTo(x, capBase(x) + 2);
      g.closePath();
      g.fillStyle = "rgba(160, 228, 242, 0.85)";
      g.fill();
      g.clip();
      g.fillStyle = "rgba(255,255,255,0.8)";
      for (let i = 0; i < 40; i++) {
        const x = WELL_X - reach * 1.2 + ((i * 97) % 100) / 100 * reach * 2.05;
        g.beginPath();
        g.arc(x, capBase(x) + 8 + ((i * 53) % 17), 2 + (i % 3), 0, Math.PI * 2);
        g.fill();
      }
      g.restore();

      // folhagem da frente, balançando
      front.forEach((f, i) => {
        const sway = Math.sin(t * 0.7 + i * 1.7) * 0.035;
        leaf(g, f.x, f.y, f.len, f.w, f.a + sway, i % 2 ? "#3f9a66" : "#348a5c", "rgba(220,255,225,0.32)");
        leaf(g, f.x + 6, f.y + 4, f.len * 0.72, f.w * 0.7, f.a + 0.35 + sway, "#5fb37c", "rgba(230,255,235,0.35)");
      });

      // hexágono central com a nuvem e setas descendo
      g.save();
      hexPath(g, CX, CY, 182);
      g.fillStyle = "rgba(255,255,255,0.08)";
      g.fill();
      g.strokeStyle = "rgba(255,255,255,0.6)";
      g.lineWidth = 2.5;
      g.stroke();
      hexPath(g, CX, CY, 160);
      g.strokeStyle = "rgba(255,255,255,0.22)";
      g.lineWidth = 1.5;
      g.stroke();
      g.restore();
      drawCloud(g, CX, CY - 46 + Math.sin(t * 0.9) * 4);
      for (let i = 0; i < 4; i++) {
        const x = CX - 72 + i * 48;
        const k = (t * 0.7 + i * 0.27) % 1;
        const y = CY + 54 + k * 34 + (i % 2) * 8;
        g.save();
        g.globalAlpha = Math.sin(k * Math.PI);
        g.strokeStyle = "#ffffff";
        g.fillStyle = "#ffffff";
        g.lineWidth = 5;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x, y + 40);
        g.stroke();
        g.beginPath();
        g.moveTo(x - 13, y + 32);
        g.lineTo(x, y + 52);
        g.lineTo(x + 13, y + 32);
        g.closePath();
        g.fill();
        g.restore();
      }

      // moléculas de CO₂ descendo até o poço e o reservatório
      for (const m of molecules) {
        const k = (m.ph + t * 0.06) % 1;
        let x: number, y: number;
        if (k < 0.55) {
          const f = k / 0.55;
          x = CX + Math.sin(f * 6 + m.a * 3) * 70 * (1 - f) * (1 - f);
          y = CY + 110 + f * (SURFACE - 40 - CY - 110);
        } else {
          const f = (k - 0.55) / 0.45;
          x = WELL_X + Math.sin(f * 20 + m.a) * 2;
          y = SURFACE - 40 + f * (capBase(WELL_X) + 18 - SURFACE + 40);
        }
        drawMolecule(g, x, y, m.a + t * 0.8, k > 0.95 ? (1 - k) * 20 : Math.min(1, k * 12));
      }

      // ícones hexagonais
      ICONS.forEach((ic, i) => {
        hoverMix[i] += ((hover === i ? 1 : 0) - hoverMix[i]) * Math.min(1, (dt || 0.016) * 10);
        const pulse = 1 + 0.025 * Math.sin(t * 1.4 + i) + 0.14 * hoverMix[i];
        g.save();
        g.translate(ic.x, ic.y);
        g.scale(pulse, pulse);
        g.translate(-ic.x, -ic.y);
        hexPath(g, ic.x, ic.y, ic.r);
        g.fillStyle = `rgba(255,255,255,${0.1 + 0.16 * hoverMix[i]})`;
        g.fill();
        g.strokeStyle = "rgba(255,255,255,0.65)";
        g.lineWidth = 2;
        g.stroke();
        drawIcon(g, ic, t);
        g.restore();
      });
      if (hover >= 0) {
        const ic = ICONS[hover];
        chip(g, ic.x, ic.y + ic.r * 1.16 + 22, text().icons[ic.kind], hoverMix[hover]);
      }

      const tx = text();
      if (env.css < 0.45) return; // rótulos fixos só onde ficam legíveis
      chip(g, 1010, capBase(1010) - 14, tx.cap, 1, 18);
      chip(g, 300, capBase(300) + 26, tx.store, Math.min(1, cycle * 3), 18);
      chip(g, WELL_X + 112, SURFACE - 22, tx.well, 1, 18);
    },
  };
}
