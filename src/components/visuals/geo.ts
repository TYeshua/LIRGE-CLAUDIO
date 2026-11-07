import * as THREE from "three";

export { C } from "./palette";
import { C } from "./palette";

export type Surface = (x: number, z: number) => number;
type V = [number, number, number];

export const solid = (color: string) =>
  new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.88, metalness: 0 });

export const flat = (color: string, opacity = 1) =>
  new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });

/** Empilha triângulos garantindo que a face aponte para fora (normal `out`). */
const pushTri = (pos: number[], a: V, b: V, c: V, out: V) => {
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  if (nx * out[0] + ny * out[1] + nz * out[2] < 0) pos.push(...a, ...c, ...b);
  else pos.push(...a, ...b, ...c);
};
const pushQuad = (pos: number[], a: V, b: V, c: V, d: V, out: V) => {
  pushTri(pos, a, b, c, out);
  pushTri(pos, a, c, d, out);
};

/**
 * Uma camada de rocha: o volume entre duas superfícies sobre um retângulo
 * [x0, x0+w] × [z0, z0+d], com topo, base e as quatro paredes laterais.
 */
export function slab(
  w: number, d: number, nx: number, nz: number,
  top: Surface, bottom: Surface, x0 = -w / 2, z0 = -d / 2
) {
  const pos: number[] = [];
  const X = (i: number) => x0 + (w * i) / nx;
  const Z = (j: number) => z0 + (d * j) / nz;
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < nz; j++) {
      const xa = X(i), xb = X(i + 1), za = Z(j), zb = Z(j + 1);
      pushQuad(pos, [xa, top(xa, za), za], [xb, top(xb, za), za], [xb, top(xb, zb), zb], [xa, top(xa, zb), zb], [0, 1, 0]);
      pushQuad(pos, [xa, bottom(xa, za), za], [xb, bottom(xb, za), za], [xb, bottom(xb, zb), zb], [xa, bottom(xa, zb), zb], [0, -1, 0]);
    }
  }
  for (let i = 0; i < nx; i++) {
    const xa = X(i), xb = X(i + 1);
    for (const [z, s] of [[z0 + d, 1], [z0, -1]] as const) {
      pushQuad(pos, [xa, bottom(xa, z), z], [xb, bottom(xb, z), z], [xb, top(xb, z), z], [xa, top(xa, z), z], [0, 0, s]);
    }
  }
  for (let j = 0; j < nz; j++) {
    const za = Z(j), zb = Z(j + 1);
    for (const [x, s] of [[x0 + w, 1], [x0, -1]] as const) {
      pushQuad(pos, [x, bottom(x, za), za], [x, bottom(x, zb), zb], [x, top(x, zb), zb], [x, top(x, za), za], [s, 0, 0]);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  return geo;
}

/** Faixa no plano z (face de corte) entre duas curvas; some onde top <= bottom. */
export function ribbon(x0: number, x1: number, n: number, top: (x: number) => number, bottom: (x: number) => number, z: number) {
  const pos: number[] = [];
  for (let i = 0; i < n; i++) {
    const xa = x0 + ((x1 - x0) * i) / n;
    const xb = x0 + ((x1 - x0) * (i + 1)) / n;
    const ba = bottom(xa), bb = bottom(xb);
    const ta = Math.max(top(xa), ba), tb = Math.max(top(xb), bb);
    if (ta - ba < 1e-4 && tb - bb < 1e-4) continue;
    pos.push(xa, ba, z, xb, bb, z, xb, tb, z, xa, ba, z, xb, tb, z, xa, ta, z);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  return geo;
}

/** Torre de perfuração simples: pirâmide de arestas sobre uma base. */
export function derrick(height = 0.62, base = 0.16) {
  const group = new THREE.Group();
  const tower = new THREE.CylinderGeometry(0.018, base, height, 4, 3, true);
  tower.rotateY(Math.PI / 4);
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(tower),
    new THREE.LineBasicMaterial({ color: C.steel })
  );
  tower.dispose();
  edges.position.y = height / 2 + 0.04;
  const pad = new THREE.Mesh(new THREE.BoxGeometry(base * 2.6, 0.05, base * 2.6), solid("#9fb5ba"));
  pad.position.y = 0.025;
  group.add(edges, pad);
  return group;
}

/** Gerador pseudoaleatório determinístico (mesma cena a cada visita). */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const smooth = (current: number, target: number, dt: number, rate = 4) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));
