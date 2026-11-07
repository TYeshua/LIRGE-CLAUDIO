import React from "react";
import { MousePointer2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import IllustrationCanvas from "./IllustrationCanvas";

// Uma ilustração por linha de pesquisa, na ordem de researchList
const LOADERS = [
  { key: "carbon", load: () => import("./carbon") },
  { key: "offshore", load: () => import("./offshore") },
  { key: "geomodel", load: () => import("./geomodel") },
  { key: "data", load: () => import("./datastreams") },
];

const ResearchIllustration: React.FC<{ index: number }> = ({ index }) => {
  const { t } = useTranslation();
  const item = LOADERS[index];
  if (!item) return null;
  const touch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  return (
    <figure>
      <div className="arc relative aspect-[3/2] bg-field-deep outline outline-2 outline-offset-[6px] outline-transparent transition-[outline-color,outline-offset] duration-500 ease-out hover:outline-offset-2 hover:outline-logo-bright/70">
        <IllustrationCanvas load={item.load} label={t(`research.illustrations.${item.key}.label`)} />
      </div>
      <figcaption className="mt-3 flex items-center gap-1.5 text-small text-ink-soft">
        <MousePointer2 size={15} aria-hidden />
        {t(`research.illustrations.${item.key}.${touch ? "hintTouch" : "hint"}`)}
      </figcaption>
    </figure>
  );
};

export default ResearchIllustration;
