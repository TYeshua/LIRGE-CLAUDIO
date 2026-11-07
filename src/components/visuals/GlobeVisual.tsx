import React from "react";
import { useTranslation } from "react-i18next";
import SceneCanvas from "./SceneCanvas";

// Longitude de Salinópolis em radianos: girar o globo por esse ângulo a traz para a frente
const FACE_SALINOPOLIS = (47.34 * Math.PI) / 180;

const GlobeVisual: React.FC<{ fallback: React.ReactNode }> = ({ fallback }) => {
  const { t } = useTranslation();
  return (
    <SceneCanvas
      load={() => import("./scenes/globe")}
      label={t("about.globe.label")}
      fallback={fallback}
      camera={{ position: [0, 0, 4.7], fov: 30 }}
      initial={{ x: -0.32, y: FACE_SALINOPOLIS - 0.45 }}
      tilt={[-0.6, 0.7]}
      spin={0.07}
      labels={[{ id: "site", text: t("about.globe.site") }]}
    />
  );
};

export default GlobeVisual;
