import React, { useEffect, useRef, useState } from "react";
import type { Group, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import type { PickInfo, SceneFactory, SceneHandle } from "./types";

export interface SceneLabel {
  id: string;
  text: string;
}

interface SceneCanvasProps {
  load: () => Promise<{ default: SceneFactory }>;
  /** Descrição da cena para leitores de tela */
  label: string;
  /** Mostrado quando o navegador não tem WebGL */
  fallback: React.ReactNode;
  camera: { position: [number, number, number]; target?: [number, number, number]; fov?: number };
  initial?: { x?: number; y?: number };
  tilt?: [number, number];
  /** Balanço suave enquanto ninguém mexeu na cena (radianos) */
  sway?: number;
  /** Rotação contínua (rad/s) */
  spin?: number;
  labels?: SceneLabel[];
  onReady?: (handle: SceneHandle) => void;
  /** Chamado quando o visitante clica (sem arrastar) na cena */
  onPick?: (info: PickInfo | null) => void;
  className?: string;
}

const SceneCanvas: React.FC<SceneCanvasProps> = (props) => {
  const { label, fallback, labels, className = "" } = props;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const propsRef = useRef(props);
  propsRef.current = props;
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const p = propsRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [minX, maxX] = p.tilt ?? [-0.15, 0.4];
    const x0 = p.initial?.x ?? 0;
    const y0 = p.initial?.y ?? 0;

    let disposed = false;
    let visible = false;
    let started = false;
    let raf = 0;
    let last = 0;
    let t = 0;
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let root: Group | null = null;
    let handle: SceneHandle | null = null;
    let project: ((id: string) => { x: number; y: number; visible: boolean }) | null = null;
    let ro: ResizeObserver | null = null;

    let dragging = false;
    let interacted = false;
    let downX = 0;
    let downY = 0;
    let downAt = 0;
    let moved = 0;
    const ndc = (e: PointerEvent): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1];
    };
    let vel = 0;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      if (!renderer || !camera) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const placeLabels = () => {
      if (!project) return;
      for (const id of Object.keys(handle?.anchors ?? {})) {
        const el = labelRefs.current[id];
        if (!el) continue;
        const pos = project(id);
        const half = el.offsetWidth / 2 + 6;
        const x = Math.min(wrap.clientWidth - half, Math.max(half, pos.x));
        el.style.transform = `translate(${x}px, ${pos.y}px) translate(-50%, -50%)`;
        el.style.opacity = pos.visible ? "1" : "0";
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible || !handle || !renderer || !scene || !camera || !root) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      t += dt;
      if (!dragging) {
        if (Math.abs(vel) > 0.0001) {
          root.rotation.y += vel;
          vel *= 0.93;
        }
        if (!reduced) {
          if (p.spin) root.rotation.y += p.spin * dt;
          else if (p.sway && !interacted) root.rotation.y = y0 + p.sway * Math.sin(t * 0.32);
        }
      }
      handle.update?.(t, dt);
      renderer.render(scene, camera);
      placeLabels();
      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf && visible && handle) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const start = async () => {
      started = true;
      try {
        const [THREE, mod] = await Promise.all([import("three"), p.load()]);
        if (disposed) return;
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(p.camera.fov ?? 30, 1.5, 0.1, 100);
        camera.position.set(...p.camera.position);
        camera.lookAt(...(p.camera.target ?? [0, 0, 0]));
        root = new THREE.Group();
        root.rotation.set(x0, y0, 0);
        scene.add(root);
        scene.add(new THREE.HemisphereLight(0xe8f4f6, 0x0a2a30, 1.25));
        const sun = new THREE.DirectionalLight(0xffffff, 1.9);
        sun.position.set(-4, 8, 6);
        // luz de contorno por trás, para dar volume
        const rim = new THREE.DirectionalLight(0x8fdcef, 0.9);
        rim.position.set(5, 3, -7);
        scene.add(sun, rim);

        handle = mod.default({ scene, camera, root, renderer, reduced });

        const tmp = new THREE.Vector3();
        project = (id) => {
          const obj = handle?.anchors?.[id];
          if (!obj || !camera) return { x: 0, y: 0, visible: false };
          obj.getWorldPosition(tmp);
          tmp.project(camera);
          const ok = tmp.z < 1 && (handle?.anchorVisible ? handle.anchorVisible(id, camera) : true);
          return {
            x: (tmp.x * 0.5 + 0.5) * wrap.clientWidth,
            y: (-tmp.y * 0.5 + 0.5) * wrap.clientHeight,
            visible: ok,
          };
        };

        ro = new ResizeObserver(resize);
        ro.observe(wrap);
        resize();
        p.onReady?.(handle);
        setReady(true);
        kick();
      } catch {
        if (!disposed) setFailed(true);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started) void start();
        if (visible) kick();
      },
      { rootMargin: "240px 0px" }
    );
    io.observe(wrap);

    // Arrastar para girar; no toque, a rolagem vertical continua livre (touch-action: pan-y)
    const onDown = (e: PointerEvent) => {
      if (!root) return;
      dragging = true;
      vel = 0;
      lastX = downX = e.clientX;
      lastY = downY = e.clientY;
      downAt = performance.now();
      moved = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) {
        if (handle?.hover) canvas.style.cursor = handle.hover(...ndc(e)) ? "pointer" : "";
        return;
      }
      if (!root) return;
      moved = Math.max(moved, Math.hypot(e.clientX - downX, e.clientY - downY));
      if (moved > 5) interacted = true;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = dx * 0.009;
      root.rotation.y += vel;
      root.rotation.x = Math.min(maxX, Math.max(minX, root.rotation.x + dy * 0.005));
    };
    const onUp = (e: PointerEvent) => {
      const wasClick = dragging && moved <= 5 && performance.now() - downAt < 500 && e.type === "pointerup";
      dragging = false;
      if (wasClick && handle?.click) {
        vel = 0;
        propsRef.current.onPick?.(handle.click(...ndc(e)));
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!root) return;
      const step = 0.18;
      if (e.key === "ArrowLeft") root.rotation.y -= step;
      else if (e.key === "ArrowRight") root.rotation.y += step;
      else if (e.key === "ArrowUp") root.rotation.x = Math.max(minX, root.rotation.x - step / 2);
      else if (e.key === "ArrowDown") root.rotation.x = Math.min(maxX, root.rotation.x + step / 2);
      else if ((e.key === "Enter" || e.key === " ") && handle?.click) {
        e.preventDefault();
        propsRef.current.onPick?.(handle.click(0, 0));
        return;
      } else return;
      e.preventDefault();
      interacted = true;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro?.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("keydown", onKey);
      handle?.dispose?.();
      scene?.traverse((obj) => {
        const mesh = obj as { geometry?: { dispose: () => void }; material?: unknown };
        mesh.geometry?.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        mats.forEach((m) => (m as { dispose: () => void }).dispose());
      });
      renderer?.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {failed ? (
        fallback
      ) : (
        <>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={label}
            tabIndex={0}
            className={`block h-full w-full cursor-grab touch-pan-y outline-none transition-opacity duration-700 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-sand active:cursor-grabbing ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />
          {labels?.map((l) => (
            <span
              key={l.id}
              ref={(el) => {
                labelRefs.current[l.id] = el;
              }}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-[#021b20]/85 px-2.5 py-1 text-small font-semibold leading-none text-[#eaf3f4] opacity-0 transition-opacity duration-300"
            >
              {l.text}
            </span>
          ))}
        </>
      )}
    </div>
  );
};

export default SceneCanvas;
