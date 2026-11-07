import type { Group, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export interface SceneContext {
  scene: Scene;
  camera: PerspectiveCamera;
  /** Grupo girado pelo arraste do visitante */
  root: Group;
  renderer: WebGLRenderer;
  reduced: boolean;
}

export interface SceneHandle {
  update?: (t: number, dt: number) => void;
  set?: (key: string, value: number) => void;
  /** Leitura de valores calculados pela cena (ex.: fator de recuperação) */
  get?: (key: string) => number;
  /** Pontos 3D onde os rótulos HTML são presos */
  anchors?: Record<string, Object3D>;
  anchorVisible?: (id: string, camera: PerspectiveCamera) => boolean;
  /** Clique na cena (coordenadas normalizadas -1…1); o retorno vai para onPick */
  click?: (x: number, y: number) => PickInfo | null;
  /** Se o ponteiro está sobre algo clicável */
  hover?: (x: number, y: number) => boolean;
  dispose?: () => void;
}

export type SceneFactory = (ctx: SceneContext) => SceneHandle;

/** Resultado de um clique: o que foi escolhido na cena */
export interface PickInfo {
  kind: string;
  id?: number;
  values?: Record<string, number | string>;
}
