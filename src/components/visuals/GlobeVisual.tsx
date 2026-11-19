import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import SceneCanvas from "./SceneCanvas";
import type { SceneHandle } from "./types";

import { BASIN_IDS } from "./basins";

interface GlobeVisualProps {
  fallback: React.ReactNode;
  /** true = aproximado na Margem Equatorial; false = globo inteiro */
  zoomed: boolean;
  /** bacia destacada pela legenda (-1 = nenhuma) */
  highlight: number;
  /** bacia em destaque no globo (ponteiro, clique ou revezamento) */
  onBasin: (index: number) => void;
}

const GlobeVisual: React.FC<GlobeVisualProps> = ({ fallback, zoomed, highlight, onBasin }) => {
  const { t } = useTranslation();
  const handle = useRef<SceneHandle | null>(null);
  const latest = useRef({ zoomed, highlight });
  latest.current = { zoomed, highlight };

  useEffect(() => {
    handle.current?.set?.("zoom", zoomed ? 1 : 0);
  }, [zoomed]);
  useEffect(() => {
    handle.current?.set?.("highlight", highlight);
  }, [highlight]);

  return (
    <SceneCanvas
      load={() => import("./scenes/globe")}
      label={t("about.globe.label")}
      fallback={fallback}
      camera={{ position: [0, 0, 4.7], fov: 30 }}
      initial={{ x: -0.2, y: 0.2 }}
      tilt={[-0.6, 0.6]}
      labels={[
        { id: "site", text: t("about.globe.site") },
        { id: "margin", text: t("about.globe.margin") },
        { id: "equator", text: t("about.globe.equator") },
        ...BASIN_IDS.map((id, i) => ({ id: `b${i}`, text: t(`about.globe.basins.${id}.name`) })),
      ]}
      onReady={(h) => {
        handle.current = h;
        h.set?.("highlight", latest.current.highlight);
        h.set?.("zoom", latest.current.zoomed ? 1 : 0);
      }}
      onEmit={(type, value) => {
        if (type === "basin") onBasin(value);
      }}
    />
  );
};

export default GlobeVisual;
