import * as THREE from "three";
import { C } from "../geo";
import { LAND } from "../landPoints";
import type { SceneFactory } from "../types";

// Salinópolis, PA
const SALINOPOLIS = { lat: -0.63, lon: -47.34 };

/** lat/lon → ponto na esfera; lon = 0 voltado para +z (a câmera). */
const toVec = (lat: number, lon: number, r: number) => {
  const a = (lat * Math.PI) / 180;
  const b = (lon * Math.PI) / 180;
  return new THREE.Vector3(Math.cos(a) * Math.sin(b) * r, Math.sin(a) * r, Math.cos(a) * Math.cos(b) * r);
};

const globe: SceneFactory = ({ scene, root, reduced }) => {
  const earth = new THREE.Group();
  root.add(earth);

  earth.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 64, 48),
      new THREE.MeshStandardMaterial({ color: C.globe, roughness: 1, metalness: 0 })
    )
  );

  const pts = new Float32Array((LAND.length / 2) * 3);
  for (let i = 0; i < LAND.length; i += 2) {
    const v = toVec(LAND[i] / 10, LAND[i + 1] / 10, 1.0);
    pts.set([v.x, v.y, v.z], (i / 2) * 3);
  }
  const landGeo = new THREE.BufferGeometry();
  landGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  earth.add(new THREE.Points(landGeo, new THREE.PointsMaterial({ color: C.co2, size: 0.03, sizeAttenuation: true })));

  // Marcador de Salinópolis com um anel que pulsa
  const site = toVec(SALINOPOLIS.lat, SALINOPOLIS.lon, 1.005);
  const normal = site.clone().normalize();
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), new THREE.MeshBasicMaterial({ color: C.accent }));
  marker.position.copy(site);
  const ringMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.065, 40), ringMat);
  ring.position.copy(site);
  ring.lookAt(site.clone().multiplyScalar(2));
  const labelAnchor = new THREE.Object3D();
  labelAnchor.position.copy(normal.clone().multiplyScalar(1.02)).add(new THREE.Vector3(0, 0.17, 0));
  earth.add(marker, ring, labelAnchor);

  // O crescente da logo, fixo ao redor do globo
  const crescent = new THREE.Shape();
  crescent.absarc(0, 0, 1.24, -1.95, 1.9, false);
  crescent.absarc(-0.075, 0.015, 1.2, 1.9, -1.95, true);
  const arc = new THREE.Mesh(new THREE.ShapeGeometry(crescent, 96), new THREE.MeshBasicMaterial({ color: C.accent }));
  arc.rotation.z = 0.35;
  scene.add(arc);

  const world = new THREE.Vector3();
  const toCamera = new THREE.Vector3();

  return {
    anchors: { site: labelAnchor },
    anchorVisible: (_id, camera) => {
      marker.getWorldPosition(world);
      toCamera.copy(camera.position).sub(world).normalize();
      return world.normalize().dot(toCamera) > 0.25;
    },
    update: (t) => {
      const k = reduced ? 0.4 : (t * 0.6) % 1;
      ring.scale.setScalar(1 + k * 1.8);
      ringMat.opacity = 0.85 * (1 - k);
    },
  };
};

export default globe;
