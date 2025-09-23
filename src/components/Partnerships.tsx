import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const logos = [
  `${import.meta.env.BASE_URL}images/geowellex.png`,
  `${import.meta.env.BASE_URL}images/petrobras.png`,
  `${import.meta.env.BASE_URL}images/Petroreconcavo.png`,
  `${import.meta.env.BASE_URL}images/Anp.png`,
  `${import.meta.env.BASE_URL}images/capes.png`,
  `${import.meta.env.BASE_URL}images/fapespa.png`,
  `${import.meta.env.BASE_URL}images/PPGG.png`,
  `${import.meta.env.BASE_URL}images/PRH-15.png`,
  `${import.meta.env.BASE_URL}images/propesq.png`,
  `${import.meta.env.BASE_URL}images/ufpa.png`,
  `${import.meta.env.BASE_URL}images/DAP_UFPA.jpg`,
  `${import.meta.env.BASE_URL}images/LEAR.png`,
  `${import.meta.env.BASE_URL}images/GSED.png`,
  `${import.meta.env.BASE_URL}images/LABCIM.png`,
  `${import.meta.env.BASE_URL}images/LASPORO.jpg`,
  `${import.meta.env.BASE_URL}images/LCM.png`,
  `${import.meta.env.BASE_URL}images/LPSA.jpg`,

];

const Partnerships: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const { t } = useTranslation();

  // Responsividade: 2 logos no mobile, 3 no desktop
  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth < 768 ? 2 : 3);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Rolagem automática
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + visibleCount) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visibleCount]);

  const visibleLogos = logos.slice(currentIndex, currentIndex + visibleCount);
  if (visibleLogos.length < visibleCount) {
    visibleLogos.push(...logos.slice(0, visibleCount - visibleLogos.length));
  }

  return (
    <section
      id="partnerships"
      className="py-20 lg:py-28 bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#04363e] dark:text-white">
            {t("partnerships.title")}{" "}
            <span className="text-lirge-cyan">{t("partnerships.highlight")}</span>
          </h2>
          <div className="w-24 h-1 bg-lirge-cyan mx-auto mt-4" />
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-6">
            {t("partnerships.subtitle")}
          </p>
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-center"
            >
              {visibleLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center h-32 sm:h-36 lg:h-40 bg-white dark:bg-white 
                            rounded-xl shadow-md p-4 border-[3px] border-[#81D4FA] dark:border-lirge-cyan"
                >
                  <img
                    src={logo}
                    alt={`Logo ${idx + 1}`}
                    className="max-h-full max-w-full object-contain opacity-90"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;