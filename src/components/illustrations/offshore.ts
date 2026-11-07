import type { Env, Illustration } from "./IllustrationCanvas";
import { H, W } from "./IllustrationCanvas";
import { chip, clamp, rng } from "./draw";

// Exploração e produção: plataforma offshore ao pôr do sol, com um corte sob o mar
// mostrando a jaqueta, o riser e o poço até o reservatório.

const SEA = 410;
const SEABED = 640;
const SUN = { x: 250, y: 396 };
const YELLOW = "#e2b34a";
const YELLOW_DARK = "#a9812e";
const WHITE = "#ece7da";

const dome = (x: number) => 58 * Math.exp(-(((x - 730) / 210) ** 2));
const seabedY = (x: number) => SEABED + 5 * Math.sin(x / 70) + 3 * Math.sin(x / 23);
const sealTop = (x: number) => 706 - dome(x);
const resTop = (x: number) => 730 - dome(x);
const resBot = (x: number) => 786 - dome(x) * 0.7;
const GAS_OIL = 694;
const OIL_WATER = 738;

// pernas da jaqueta: x no fundo do mar e no convés
const LEGS = [
  { b: 588, t: 626, back: false }, { b: 868, t: 828, back: false },
  { b: 640, t: 664, back: true }, { b: 812, t: 788, back: true },
];
const legX = (leg: (typeof LEGS)[number], y: number) => leg.b + ((leg.t - leg.b) * (SEABED - y)) / (SEABED - 300);

interface Spot { id: string; x: number; y: number; r: number }
const SPOTS: Spot[] = [
  { id: "flare", x: 1012, y: 150, r: 46 },
  { id: "helideck", x: 496, y: 248, r: 52 },
  { id: "derrick", x: 716, y: 175, r: 48 },
  { id: "crane", x: 790, y: 205, r: 46 },
  { id: "quarters", x: 618, y: 268, r: 34 },
  { id: "jacket", x: 790, y: 540, r: 60 },
  { id: "riser", x: 703, y: 470, r: 28 },
  { id: "reservoir", x: 860, y: 750, r: 70 },
  { id: "boat", x: 300, y: 405, r: 50 },
];
const LABELS: Record<string, Record<string, string>> = {
  pt: {
    flare: "Tocha: queima segura do gás excedente", helideck: "Heliponto", derrick: "Torre de perfuração",
    crane: "Guindaste de carga", quarters: "Alojamento da tripulação", jacket: "Jaqueta: estrutura de aço fixada no fundo",
    riser: "Riser: leva o óleo do poço à plataforma", reservoir: "Reservatório: gás, óleo e água", boat: "Barco de apoio",
  },
  en: {
    flare: "Flare: safe burning of excess gas", helideck: "Helideck", derrick: "Drilling derrick",
    crane: "Cargo crane", quarters: "Crew quarters", jacket: "Jacket: steel frame fixed to the seabed",
    riser: "Riser: brings oil from the well to the platform", reservoir: "Reservoir: gas, oil and water", boat: "Supply vessel",
  },
};

function lattice(g: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, w: number, color: string) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * w, ny = (dx / len) * w;
  g.strokeStyle = color;
  g.lineWidth = 2.2;
  g.beginPath();
  g.moveTo(x1 + nx, y1 + ny);
  g.lineTo(x2 + nx * 0.4, y2 + ny * 0.4);
  g.moveTo(x1 - nx, y1 - ny);
  g.lineTo(x2 - nx * 0.4, y2 - ny * 0.4);
  const n = Math.max(3, Math.round(len / (w * 2.2)));
  for (let i = 0; i < n; i++) {
    const f0 = i / n, f1 = (i + 1) / n;
    const s0 = 1 - 0.6 * f0, s1 = 1 - 0.6 * f1;
    g.moveTo(x1 + dx * f0 + nx * s0, y1 + dy * f0 + ny * s0);
    g.lineTo(x1 + dx * f1 - nx * s1, y1 + dy * f1 - ny * s1);
  }
  g.stroke();
}

function drawStatic(g: CanvasRenderingContext2D) {
  const rand = rng(4);
  // céu ao pôr do sol
  const sky = g.createLinearGradient(0, 0, 0, SEA);
  sky.addColorStop(0, "#0f2d47");
  sky.addColorStop(0.45, "#3c6a86");
  sky.addColorStop(0.78, "#e3a565");
  sky.addColorStop(1, "#f7d48c");
  g.fillStyle = sky;
  g.fillRect(0, 0, W, SEA);
  const sun = g.createRadialGradient(SUN.x, SUN.y, 10, SUN.x, SUN.y, 360);
  sun.addColorStop(0, "rgba(255, 244, 205, 0.95)");
  sun.addColorStop(0.18, "rgba(255, 214, 140, 0.55)");
  sun.addColorStop(1, "rgba(255, 190, 110, 0)");
  g.fillStyle = sun;
  g.fillRect(0, 0, W, SEA);
  g.fillStyle = "#fff6dc";
  g.beginPath();
  g.arc(SUN.x, SUN.y, 30, 0, Math.PI * 2);
  g.fill();
  // nuvens em faixas
  for (let i = 0; i < 18; i++) {
    const y = 60 + rand() * 260;
    g.fillStyle = y > 230 ? `rgba(255, 220, 170, ${0.18 + rand() * 0.2})` : `rgba(140, 170, 196, ${0.12 + rand() * 0.15})`;
    g.beginPath();
    g.ellipse(rand() * W, y, 80 + rand() * 220, 4 + rand() * 7, 0, 0, Math.PI * 2);
    g.fill();
  }

  // água: da superfície ao fundo
  const sea = g.createLinearGradient(0, SEA, 0, SEABED);
  sea.addColorStop(0, "#2a6b86");
  sea.addColorStop(0.18, "#1c5470");
  sea.addColorStop(1, "#0a2a3a");
  g.fillStyle = sea;
  g.fillRect(0, SEA, W, SEABED - SEA + 20);
  // feixes de luz sob a água
  g.fillStyle = "rgba(220, 240, 255, 0.05)";
  for (let i = 0; i < 7; i++) {
    const x = 80 + i * 170 + rand() * 60;
    g.beginPath();
    g.moveTo(x, SEA + 40);
    g.lineTo(x + 50, SEA + 40);
    g.lineTo(x + 150, SEABED);
    g.lineTo(x + 60, SEABED);
    g.closePath();
    g.fill();
  }

  // jaqueta (pernas de trás primeiro)
  for (const leg of [...LEGS].sort((a, b) => Number(b.back) - Number(a.back))) {
    g.strokeStyle = leg.back ? "#8a6a2a" : YELLOW;
    g.lineWidth = leg.back ? 7 : 11;
    g.beginPath();
    g.moveTo(leg.b, SEABED);
    g.lineTo(leg.t, 300);
    g.stroke();
  }
  const levels = [612, 540, 470, 396, 340];
  const front = LEGS.filter((l) => !l.back);
  g.strokeStyle = YELLOW;
  g.lineWidth = 4;
  for (let i = 0; i < levels.length; i++) {
    const y = levels[i];
    g.beginPath();
    g.moveTo(legX(front[0], y), y);
    g.lineTo(legX(front[1], y), y);
    g.stroke();
    if (i < levels.length - 1) {
      const y2 = levels[i + 1];
      g.beginPath();
      g.moveTo(legX(front[0], y), y);
      g.lineTo(legX(front[1], y2), y2);
      g.moveTo(legX(front[1], y), y);
      g.lineTo(legX(front[0], y2), y2);
      g.stroke();
    }
  }
  // riser
  g.strokeStyle = "#c9d7db";
  g.lineWidth = 6;
  g.beginPath();
  g.moveTo(703, 318);
  g.lineTo(703, SEABED);
  g.stroke();
  // tom da água sobre a parte submersa
  g.fillStyle = "rgba(8, 40, 56, 0.5)";
  g.fillRect(0, SEA + 6, W, SEABED - SEA);

  // subsolo: lama, areia, selo, reservatório em domo, embasamento
  const band = (top: (x: number) => number, bot: (x: number) => number, color: string) => {
    g.beginPath();
    g.moveTo(0, top(0));
    for (let x = 0; x <= W; x += 8) g.lineTo(x, top(x));
    for (let x = W; x >= 0; x -= 8) g.lineTo(x, bot(x));
    g.closePath();
    g.fillStyle = color;
    g.fill();
  };
  band(seabedY, (x) => 672 - dome(x) * 0.3, "#3a5a5c");
  band((x) => 672 - dome(x) * 0.3, sealTop, "#cdb27a");
  band(sealTop, resTop, "#2f4a50");
  band(resTop, resBot, "#b98544");
  band(resBot, () => H, "#1d3a40");
  // fluidos na crista do domo
  g.save();
  band(resTop, resBot, "rgba(0,0,0,0)");
  g.clip();
  g.fillStyle = "#efe6cb";
  g.fillRect(0, 0, W, GAS_OIL);
  g.fillStyle = "#6e4218";
  g.fillRect(0, GAS_OIL, W, OIL_WATER - GAS_OIL);
  g.fillStyle = "rgba(47, 126, 149, 0.55)";
  g.fillRect(0, OIL_WATER, W, 60);
  g.restore();
  for (let i = 0; i < 700; i++) {
    const x = rand() * W, y = 650 + rand() * 150;
    g.fillStyle = "rgba(20, 15, 5, 0.16)";
    g.fillRect(x, y, 1.6, 1.6);
  }
  // poço do fundo até a crista do reservatório
  g.strokeStyle = "#c9d7db";
  g.lineWidth = 4;
  g.beginPath();
  g.moveTo(703, SEABED);
  g.quadraticCurveTo(706, 700, 724, GAS_OIL + 22);
  g.stroke();
  g.fillStyle = "#9fb4ba";
  g.fillRect(694, SEABED - 12, 18, 14);

  // segunda plataforma e passarela
  g.strokeStyle = YELLOW_DARK;
  g.lineWidth = 7;
  for (const [b, tp] of [[1092, 1104], [1172, 1160]]) {
    g.beginPath();
    g.moveTo(b, SEABED);
    g.lineTo(tp, 336);
    g.stroke();
  }
  g.fillStyle = YELLOW;
  g.fillRect(1066, 322, 128, 16);
  g.fillStyle = WHITE;
  g.fillRect(1090, 290, 60, 32);
  g.fillStyle = "#9fb0b6";
  g.fillRect(1152, 300, 30, 22);
  lattice(g, 902, 306, 1068, 326, 9, YELLOW);

  // conveses
  g.fillStyle = YELLOW_DARK;
  g.fillRect(556, 318, 340, 18);
  g.fillStyle = YELLOW;
  g.fillRect(544, 296, 362, 22);
  g.fillStyle = "rgba(0,0,0,0.18)";
  for (let x = 552; x < 900; x += 22) g.fillRect(x, 300, 2, 14);

  // módulos
  const box = (x: number, y: number, w: number, h: number, c: string) => {
    g.fillStyle = c;
    g.fillRect(x, y, w, h);
    g.fillStyle = "rgba(0,0,0,0.12)";
    g.fillRect(x + w - 6, y, 6, h);
  };
  box(572, 236, 92, 60, WHITE); // alojamento
  g.fillStyle = "#ffd98a";
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) g.fillRect(578 + c * 14, 244 + r * 16, 8, 7);
  box(672, 254, 64, 42, "#9fb0b6");
  box(744, 228, 58, 68, YELLOW);
  box(810, 260, 82, 36, WHITE);
  g.fillStyle = "#c9d7db";
  for (let k = 0; k < 3; k++) {
    g.beginPath();
    g.ellipse(822 + k * 24, 252, 10, 10, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = "#7b8e94";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(664, 262);
  g.lineTo(744, 262);
  g.moveTo(736, 284);
  g.lineTo(810, 284);
  g.stroke();

  // torre de perfuração
  g.strokeStyle = WHITE;
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(692, 254);
  g.lineTo(708, 118);
  g.lineTo(724, 118);
  g.lineTo(740, 254);
  g.stroke();
  g.lineWidth = 1.6;
  for (let y = 240; y > 124; y -= 18) {
    const f = (254 - y) / 136;
    const xl = 692 + 16 * f, xr = 740 - 16 * f;
    const f2 = (254 - (y - 18)) / 136;
    g.beginPath();
    g.moveTo(xl, y);
    g.lineTo(740 - 16 * f2, y - 18);
    g.moveTo(xr, y);
    g.lineTo(692 + 16 * f2, y - 18);
    g.stroke();
  }
  g.fillStyle = "#c9d7db";
  g.fillRect(702, 108, 28, 12);

  // heliponto em balanço
  lattice(g, 548, 296, 470, 262, 8, YELLOW_DARK);
  g.fillStyle = "#3d4d52";
  g.beginPath();
  g.ellipse(496, 252, 64, 14, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = YELLOW;
  g.lineWidth = 2;
  g.beginPath();
  g.ellipse(496, 252, 40, 8, 0, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = "#f2f2f2";
  g.font = "700 14px Montserrat, sans-serif";
  g.textAlign = "center";
  g.save();
  g.translate(496, 256);
  g.scale(1, 0.45);
  g.fillText("H", 0, 0);
  g.restore();

  // braço da tocha e pedestal do guindaste
  lattice(g, 896, 294, 1008, 160, 9, WHITE);
  g.fillStyle = "#c9d7db";
  g.fillRect(782, 236, 16, 24);
}

export default function offshore(): Illustration {
  const lang = () => (document.documentElement.lang.startsWith("en") ? "en" : "pt");
  const rand = rng(21);
  let bg: HTMLCanvasElement | null = null;
  let hover: string | null = null;
  let hoverMix = 0;
  const shimmer = Array.from({ length: 70 }, () => ({ x: (rand() - 0.5) * 2, y: rand(), w: 6 + rand() * 30, ph: rand() * 6 }));
  const waves = Array.from({ length: 90 }, () => ({ x: rand() * W, y: SEA + 4 + Math.pow(rand(), 1.6) * 70, w: 8 + rand() * 26, s: 4 + rand() * 10 }));
  const drops = Array.from({ length: 26 }, (_, i) => ({ ph: i / 26 }));
  const fish = Array.from({ length: 6 }, () => ({ y: 470 + rand() * 140, s: 14 + rand() * 18, ph: rand() * W, size: 0.7 + rand() * 0.6 }));
  const birds = Array.from({ length: 4 }, (_, i) => ({ y: 90 + i * 26 + rand() * 30, ph: rand() * W, s: 18 + rand() * 10 }));
  const lights = Array.from({ length: 14 }, () => ({ x: 560 + rand() * 330, y: 236 + rand() * 80, ph: rand() * 6 }));

  // trajeto do óleo: crista do reservatório → poço → riser → convés
  const pathPt = (k: number): [number, number] => {
    if (k < 0.25) {
      const f = k / 0.25;
      const a = 1 - f;
      return [a * a * 724 + 2 * a * f * 706 + f * f * 703, a * a * (GAS_OIL + 22) + 2 * a * f * 700 + f * f * SEABED];
    }
    return [703, SEABED - ((k - 0.25) / 0.75) * (SEABED - 318)];
  };

  return {
    init(env: Env) {
      const { canvas, ctx } = env.layer();
      drawStatic(ctx);
      bg = canvas;
    },
    pointer(p) {
      hover = null;
      if (!p) return;
      for (const s of SPOTS) if (Math.hypot(p.x - s.x, p.y - s.y) < s.r) hover = s.id;
      return hover ? "pointer" : "";
    },
    frame(g, t, dt) {
      if (bg) g.drawImage(bg, 0, 0, W, H);
      hoverMix += ((hover ? 1 : 0) - hoverMix) * Math.min(1, (dt || 0.016) * 10);

      // pássaros
      g.strokeStyle = "rgba(20, 30, 45, 0.7)";
      g.lineWidth = 2;
      for (const b of birds) {
        const x = ((b.ph + t * b.s) % (W + 100)) - 50;
        const flap = Math.sin(t * 6 + b.ph) * 4;
        g.beginPath();
        g.moveTo(x - 9, b.y - flap);
        g.quadraticCurveTo(x - 4, b.y - 4, x, b.y);
        g.quadraticCurveTo(x + 4, b.y - 4, x + 9, b.y - flap);
        g.stroke();
      }

      // guindaste girando devagar
      const ang = -2.45 + Math.sin(t * 0.25) * 0.28;
      const bx = 790 + Math.cos(ang) * 150, by = 236 + Math.sin(ang) * 150;
      g.save();
      lattice(g, 790, 236, bx, by, 6, YELLOW);
      g.strokeStyle = "#2c3a3e";
      g.lineWidth = 1.5;
      g.beginPath();
      g.moveTo(bx, by);
      g.lineTo(bx, by + 46 + Math.sin(t * 0.8) * 6);
      g.stroke();
      g.fillStyle = "#2c3a3e";
      g.fillRect(bx - 4, by + 46 + Math.sin(t * 0.8) * 6, 8, 8);
      g.restore();

      // chama da tocha
      const fx = 1010, fy = 156;
      for (const [scale, color] of [[1, "rgba(240, 120, 50, 0.85)"], [0.7, "rgba(255, 196, 90, 0.95)"], [0.38, "rgba(255, 246, 210, 1)"]] as const) {
        g.fillStyle = color;
        g.beginPath();
        const hgt = 70 * scale * (0.9 + 0.12 * Math.sin(t * 9) + 0.08 * Math.sin(t * 14.3));
        const wid = 18 * scale;
        g.moveTo(fx - wid, fy);
        g.bezierCurveTo(fx - wid * 1.2, fy - hgt * 0.5, fx + Math.sin(t * 5) * 8 * scale, fy - hgt * 0.8, fx + 6 + Math.sin(t * 7) * 6, fy - hgt);
        g.bezierCurveTo(fx + wid * 0.9, fy - hgt * 0.6, fx + wid * 1.1, fy - hgt * 0.2, fx + wid, fy);
        g.closePath();
        g.fill();
      }

      // luzes da plataforma piscando
      for (const l of lights) {
        g.fillStyle = `rgba(255, 226, 150, ${0.45 + 0.55 * Math.max(0, Math.sin(t * 2 + l.ph))})`;
        g.fillRect(l.x, l.y, 3, 3);
      }

      // superfície do mar: ondas e o reflexo do sol
      for (const w of waves) {
        const x = ((w.x + t * w.s) % (W + 60)) - 30;
        const depth = (w.y - SEA) / 70;
        g.strokeStyle = `rgba(255, 220, 160, ${0.18 * (1 - depth) + 0.05})`;
        g.lineWidth = 1.5;
        g.beginPath();
        g.moveTo(x, w.y);
        g.quadraticCurveTo(x + w.w / 2, w.y - 2, x + w.w, w.y);
        g.stroke();
      }
      for (const s of shimmer) {
        const y = SEA + 4 + s.y * 70;
        const spread = 20 + s.y * 120;
        const x = SUN.x + s.x * spread;
        g.fillStyle = `rgba(255, 228, 160, ${clamp(0.25 + 0.6 * Math.sin(t * 2.4 + s.ph), 0, 1) * (1 - s.y * 0.7)})`;
        g.fillRect(x - s.w / 2, y, s.w * (1 - s.y * 0.5), 2.2);
      }
      g.strokeStyle = "rgba(255, 235, 190, 0.6)";
      g.lineWidth = 2;
      g.beginPath();
      for (let x = 0; x <= W; x += 8) g.lineTo(x, SEA + Math.sin(x / 40 + t * 1.6) * 2.2);
      g.stroke();

      // barco de apoio
      const bob = Math.sin(t * 1.4) * 3;
      const boatX = 300 + Math.sin(t * 0.15) * 30;
      g.save();
      g.translate(boatX, SEA - 6 + bob);
      g.rotate(Math.sin(t * 1.1) * 0.03);
      g.fillStyle = "#c45a3c";
      g.beginPath();
      g.moveTo(-58, 0);
      g.lineTo(58, 0);
      g.lineTo(46, 14);
      g.lineTo(-50, 14);
      g.closePath();
      g.fill();
      g.fillStyle = WHITE;
      g.fillRect(-46, -20, 40, 20);
      g.fillRect(-40, -32, 24, 12);
      g.fillStyle = "#2c3a3e";
      g.fillRect(10, -6, 40, 6);
      g.restore();

      // peixes
      for (const f of fish) {
        const x = ((f.ph + t * f.s) % (W + 80)) - 40;
        g.save();
        g.translate(x, f.y + Math.sin(t * 2 + f.ph) * 4);
        g.scale(f.size, f.size);
        g.fillStyle = "rgba(160, 210, 225, 0.4)";
        g.beginPath();
        g.ellipse(0, 0, 12, 4.5, 0, 0, Math.PI * 2);
        g.moveTo(-10, 0);
        g.lineTo(-18, -5);
        g.lineTo(-18, 5);
        g.closePath();
        g.fill();
        g.restore();
      }

      // gotas de óleo subindo pelo poço e pelo riser
      for (const d of drops) {
        const k = (d.ph + t * 0.05) % 1;
        const [x, y] = pathPt(k);
        g.fillStyle = "rgba(240, 180, 106, 0.95)";
        g.beginPath();
        g.arc(x, y, 3.2, 0, Math.PI * 2);
        g.fill();
      }

      if (hover) {
        const s = SPOTS.find((sp) => sp.id === hover)!;
        g.save();
        g.strokeStyle = `rgba(108, 200, 224, ${0.95 * hoverMix})`;
        g.lineWidth = 2.5;
        g.setLineDash([6, 6]);
        g.lineDashOffset = -t * 20;
        g.beginPath();
        g.arc(s.x, s.y, s.r * 0.85, 0, Math.PI * 2);
        g.stroke();
        g.restore();
        const above = s.y > 600;
        chip(g, clamp(s.x, 240, W - 240), s.y + (above ? -s.r - 18 : s.r + 18), LABELS[lang()][s.id], hoverMix);
      }
    },
  };
}
