// Utilitários de desenho 2D compartilhados pelas ilustrações.

export const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => t * t * (3 - 2 * t);

/** Hexágono com vértice para cima. */
export function hexPath(g: CanvasRenderingContext2D, x: number, y: number, r: number) {
  g.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 6 + (i * Math.PI) / 3;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    if (i) g.lineTo(px, py);
    else g.moveTo(px, py);
  }
  g.closePath();
}

/** Folha: base em (x, y), comprimento len, largura w, ângulo a (radianos). */
export function leaf(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  len: number,
  w: number,
  a: number,
  fill: string,
  vein: string
) {
  g.save();
  g.translate(x, y);
  g.rotate(a);
  g.beginPath();
  g.moveTo(0, 0);
  g.bezierCurveTo(len * 0.25, -w, len * 0.75, -w * 0.9, len, 0);
  g.bezierCurveTo(len * 0.75, w * 0.9, len * 0.25, w, 0, 0);
  g.fillStyle = fill;
  g.fill();
  g.strokeStyle = vein;
  g.lineWidth = Math.max(1, w * 0.06);
  g.beginPath();
  g.moveTo(0, 0);
  g.quadraticCurveTo(len * 0.5, -w * 0.08, len * 0.97, 0);
  g.stroke();
  g.lineWidth = Math.max(0.6, w * 0.03);
  for (let i = 1; i < 7; i++) {
    const f = i / 7.5;
    const vx = len * f;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(vx, -w * 0.03 * f);
      g.quadraticCurveTo(vx + len * 0.08, s * w * 0.35, vx + len * 0.16, s * w * 0.62 * (1 - f * 0.55));
      g.stroke();
    }
  }
  g.restore();
}

let chipMin = 0;
/** Tamanho mínimo do texto dos rótulos, em unidades de desenho (ajustado ao tamanho do quadro). */
export const setChipMinSize = (size: number) => {
  chipMin = size;
};

/** Rótulo em pílula escura, centrado em (x, y), sempre inteiro dentro do quadro. */
export function chip(g: CanvasRenderingContext2D, x: number, y: number, text: string, alpha = 1, base = 20) {
  if (alpha <= 0.01) return;
  const size = Math.max(base, chipMin);
  g.save();
  g.globalAlpha = alpha;
  g.font = `600 ${size}px Figtree, system-ui, sans-serif`;
  const w = g.measureText(text).width + size * 1.2;
  const h = size * 1.7;
  x = clamp(x, w / 2 + 8, 1200 - w / 2 - 8);
  y = clamp(y, h / 2 + 8, 800 - h / 2 - 8);
  g.fillStyle = "rgba(2, 24, 29, 0.88)";
  g.beginPath();
  g.roundRect(x - w / 2, y - h / 2, w, h, h / 2);
  g.fill();
  g.fillStyle = "#eaf3f4";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, x, y + 1);
  g.restore();
}

export function pointInPoly(x: number, y: number, pts: number[]) {
  let inside = false;
  for (let i = 0, j = pts.length - 2; i < pts.length; j = i, i += 2) {
    const xi = pts[i], yi = pts[i + 1], xj = pts[j], yj = pts[j + 1];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Sprite de brilho suave (bokeh), pré-desenhado uma vez. */
export function glowSprite(color: string, size = 64) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}
