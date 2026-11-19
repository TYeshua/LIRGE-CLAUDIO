import * as THREE from "three";
import { C } from "../geo";
import { LAND } from "../landPoints";
import { REGION_COAST, REGION_LAND } from "../regionData";
import { BASIN_COLORS } from "../basins";
import type { SceneFactory } from "../types";

// Globo que aproxima até a Margem Equatorial brasileira: costa em detalhe,
// linha do Equador, as cinco bacias sedimentares e Salinópolis, onde fica o LIRGE.

const SALINOPOLIS = { lat: -0.63, lon: -47.34 };
const FOCUS = { lat: -1.2, lon: -43.4 };

/** Contornos aproximados (lat, lon) das bacias da Margem Equatorial, do Amapá ao Rio Grande do Norte. */
export const BASINS: { id: string; poly: [number, number][]; color: string }[] = [
  {
    id: "foz",
    color: BASIN_COLORS[0],
    poly: [[4.4, -51.5], [2.1, -50.5], [0.6, -50.0], [-0.3, -49.1], [-0.7, -47.6], [1.2, -47.5], [3.4, -48.2], [5.1, -50.1]],
  },
  {
    id: "para",
    color: BASIN_COLORS[1],
    poly: [[-0.7, -47.6], [-1.05, -46.7], [-1.6, -45.3], [-2.05, -44.4], [0.6, -43.9], [1.7, -45.8], [1.2, -47.5]],
  },
  {
    id: "barreirinhas",
    color: BASIN_COLORS[2],
    poly: [[-2.05, -44.4], [-2.5, -43.4], [-2.8, -42.3], [-2.9, -41.3], [-0.7, -41.0], [0.6, -43.9]],
  },
  {
    id: "ceara",
    color: BASIN_COLORS[3],
    poly: [[-2.9, -41.3], [-3.0, -40.0], [-3.4, -39.0], [-3.9, -38.2], [-1.8, -37.4], [-0.7, -41.0]],
  },
  {
    id: "potiguar",
    color: BASIN_COLORS[4],
    poly: [[-3.9, -38.2], [-4.6, -37.4], [-5.0, -36.4], [-5.2, -35.3], [-3.4, -34.5], [-1.8, -37.4]],
  },
];

const D2R = Math.PI / 180;
/** lat/lon → ponto na esfera; lon = 0 voltado para +z (a câmera). */
const toVec = (lat: number, lon: number, r: number) =>
  new THREE.Vector3(Math.cos(lat * D2R) * Math.sin(lon * D2R) * r, Math.sin(lat * D2R) * r, Math.cos(lat * D2R) * Math.cos(lon * D2R) * r);

const smooth = (current: number, target: number, dt: number, rate: number) => current + (target - current) * (1 - Math.exp(-rate * dt));
const ease = (t: number) => t * t * (3 - 2 * t);

const globe: SceneFactory = ({ scene, root, camera, reduced, emit }) => {
  const earth = new THREE.Group();
  root.add(earth);

  earth.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 96, 64),
      new THREE.MeshStandardMaterial({ color: "#0b4552", roughness: 0.95, metalness: 0 })
    )
  );

  // terra no mundo todo (pontos esparsos): some ao aproximar, quando entra a malha densa da região
  const world: number[] = [];
  for (let i = 0; i < LAND.length; i += 2) {
    const v = toVec(LAND[i] / 10, LAND[i + 1] / 10, 1.0);
    world.push(v.x, v.y, v.z);
  }
  const worldGeo = new THREE.BufferGeometry();
  worldGeo.setAttribute("position", new THREE.Float32BufferAttribute(world, 3));
  const worldMat = new THREE.PointsMaterial({ color: C.co2, size: 0.028, transparent: true, opacity: 0.85 });
  earth.add(new THREE.Points(worldGeo, worldMat));

  // região em detalhe: pontos densos e linha de costa
  const region: number[] = [];
  for (let i = 0; i < REGION_LAND.length; i += 2) {
    const v = toVec(REGION_LAND[i] / 100, REGION_LAND[i + 1] / 100, 1.0015);
    region.push(v.x, v.y, v.z);
  }
  const regionGeo = new THREE.BufferGeometry();
  regionGeo.setAttribute("position", new THREE.Float32BufferAttribute(region, 3));
  const regionMat = new THREE.PointsMaterial({ color: "#7fd2e6", size: 0.0036, transparent: true, opacity: 0.9 });
  earth.add(new THREE.Points(regionGeo, regionMat));
  const coastMat = new THREE.LineBasicMaterial({ color: "#d9f3f9", transparent: true, opacity: 0.75 });
  for (const seg of REGION_COAST) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < seg.length; i += 2) pts.push(toVec(seg[i] / 100, seg[i + 1] / 100, 1.003));
    earth.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), coastMat));
  }

  // linha do Equador, tracejada
  const eq: THREE.Vector3[] = [];
  for (let i = 0; i <= 360; i++) eq.push(toVec(0, i - 180, 1.004));
  const eqLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(eq),
    new THREE.LineDashedMaterial({ color: C.accent, dashSize: 0.012, gapSize: 0.009, transparent: true, opacity: 0.9 })
  );
  eqLine.computeLineDistances();
  earth.add(eqLine);

  // bacias: preenchimento translúcido e contorno
  const basinMeshes: THREE.Mesh[] = [];
  const basinState = BASINS.map((b, i) => {
    const contour = b.poly.map(([lat, lon]) => new THREE.Vector2(lon, lat));
    const tris = THREE.ShapeUtils.triangulateShape(contour, []);
    const pos: number[] = [];
    for (const tri of tris) for (const k of tri) {
      const v = toVec(b.poly[k][0], b.poly[k][1], 1.006);
      pos.push(v.x, v.y, v.z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const fill = new THREE.MeshBasicMaterial({ color: b.color, transparent: true, opacity: 0.25, depthWrite: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, fill);
    mesh.userData.basin = i;
    basinMeshes.push(mesh);
    const outlinePts = [...b.poly, b.poly[0]].map(([lat, lon]) => toVec(lat, lon, 1.008));
    const lineMat = new THREE.LineBasicMaterial({ color: b.color, transparent: true, opacity: 0.8 });
    const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(outlinePts), lineMat);
    earth.add(mesh, outline);
    const c = b.poly.reduce((acc, [lat, lon]) => [acc[0] + lat / b.poly.length, acc[1] + lon / b.poly.length], [0, 0]);
    const anchor = new THREE.Object3D();
    anchor.position.copy(toVec(c[0] + 0.9, c[1], 1.03));
    earth.add(anchor);
    return { fill, lineMat, anchor, mix: 0 };
  });

  // Salinópolis
  const site = toVec(SALINOPOLIS.lat, SALINOPOLIS.lon, 1.008);
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.0065, 16, 12), new THREE.MeshBasicMaterial({ color: "#ffffff" }));
  marker.position.copy(site);
  const ringMat = new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.8, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.009, 0.0115, 40), ringMat);
  ring.position.copy(site);
  ring.lookAt(site.clone().multiplyScalar(2));
  const siteAnchor = new THREE.Object3D();
  siteAnchor.position.copy(toVec(SALINOPOLIS.lat - 1.1, SALINOPOLIS.lon - 0.4, 1.02));
  earth.add(marker, ring, siteAnchor);

  const anchorAt = (lat: number, lon: number) => {
    const o = new THREE.Object3D();
    o.position.copy(toVec(lat, lon, 1.02));
    earth.add(o);
    return o;
  };
  const marginAnchor = anchorAt(6.4, -42.5);
  const equatorAnchor = anchorAt(0.9, -33.2);

  // O crescente da logo, só na vista do globo inteiro
  const crescent = new THREE.Shape();
  crescent.absarc(0, 0, 1.24, -1.95, 1.9, false);
  crescent.absarc(-0.075, 0.015, 1.2, 1.9, -1.95, true);
  const arcMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true });
  const arc = new THREE.Mesh(new THREE.ShapeGeometry(crescent, 96), arcMat);
  arc.rotation.z = 0.35;
  scene.add(arc);

  // ——— estado ———
  const far = new THREE.Vector3(0, 0, 4.7);
  const near = new THREE.Vector3(0, 0.02, 1.95);
  const faceY = FOCUS.lon * -D2R; // gira o globo para trazer a região à frente
  const faceX = FOCUS.lat * D2R;
  let zoomTarget = 0;
  let zoom = 0;
  let steering = 0;
  let hover = -1;
  let pinned = -1;
  let external = -1;
  let auto = 0;
  let autoClock = 0;
  let active = -1;

  const raycaster = new THREE.Raycaster();
  const pick = (x: number, y: number) => {
    if (zoom < 0.6) return -1;
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const hit = raycaster.intersectObjects(basinMeshes, false)[0];
    return hit ? (hit.object.userData.basin as number) : -1;
  };

  const tmp = new THREE.Vector3();
  const toCam = new THREE.Vector3();
  const facing = (o: THREE.Object3D) => {
    o.getWorldPosition(tmp);
    toCam.copy(camera.position).sub(tmp).normalize();
    return tmp.normalize().dot(toCam) > 0.2;
  };

  const anchors: Record<string, THREE.Object3D> = { site: siteAnchor, margin: marginAnchor, equator: equatorAnchor };
  basinState.forEach((b, i) => (anchors[`b${i}`] = b.anchor));

  return {
    anchors,
    anchorVisible: (id) => {
      if (id === "site") return facing(siteAnchor);
      if (id === "margin" || id === "equator") return zoom > 0.85;
      const i = Number(id.slice(1));
      return zoom > 0.85 && active === i;
    },
    hover: (x, y) => {
      hover = pick(x, y);
      return hover >= 0;
    },
    click: (x, y) => {
      const i = pick(x, y);
      pinned = i === pinned ? -1 : i;
      return i >= 0 ? { kind: "basin", id: i } : null;
    },
    set: (key, value) => {
      if (key === "zoom") {
        zoomTarget = value ? 1 : 0;
        steering = 1.8;
      }
      if (key === "highlight") external = value;
    },
    update: (t, dt) => {
      const step = dt > 0 ? dt : 1 / 60;
      zoom = reduced ? zoomTarget : smooth(zoom, zoomTarget, step, 2.2);
      const z = ease(zoom);
      camera.position.copy(far).lerp(near, z);
      camera.lookAt(0, 0, 0);
      arcMat.opacity = 1 - z;
      // de longe, pontos esparsos; de perto, malha densa e linha de costa
      worldMat.opacity = 0.85 * (1 - z);
      regionMat.opacity = 0.9 * z;
      coastMat.opacity = 0.75 * z;
      arc.visible = z < 0.98;

      // gira sozinho de longe; ao aproximar, a cena conduz até a margem
      if (steering > 0) {
        steering -= step;
        const k = reduced ? 1 : 1 - Math.exp(-3.2 * step);
        const ty = zoomTarget ? faceY : root.rotation.y;
        const tx = zoomTarget ? faceX : -0.2;
        // menor caminho angular
        const dy = Math.atan2(Math.sin(ty - root.rotation.y), Math.cos(ty - root.rotation.y));
        root.rotation.y += dy * k;
        root.rotation.x += (tx - root.rotation.x) * k;
      } else if (zoomTarget === 0 && !reduced) {
        root.rotation.y += 0.07 * step;
      }

      // bacia em destaque: ponteiro > clique > legenda > revezamento automático
      if (zoomTarget && hover < 0 && pinned < 0 && external < 0 && !reduced) {
        autoClock += step;
        if (autoClock > 5) {
          autoClock = 0;
          auto = (auto + 1) % BASINS.length;
        }
      }
      const next = hover >= 0 ? hover : pinned >= 0 ? pinned : external >= 0 ? external : zoomTarget ? auto : -1;
      if (next !== active) {
        active = next;
        emit("basin", active);
      }
      basinState.forEach((b, i) => {
        b.mix = smooth(b.mix, i === active ? 1 : 0, step, 8);
        b.fill.opacity = 0.18 + 0.42 * b.mix;
        b.lineMat.opacity = 0.55 + 0.45 * b.mix;
      });

      const k = reduced ? 0.4 : (t * 0.55) % 1;
      ring.scale.setScalar(1 + k * 2.4);
      ringMat.opacity = 0.85 * (1 - k);
    },
    dispose: () => {
      arc.geometry.dispose();
      arcMat.dispose();
    },
  };
};

export default globe;
