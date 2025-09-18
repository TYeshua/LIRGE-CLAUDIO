import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Fuel,
  Waves,
  Mountain,
  Zap,
  LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ResearchItem {
  id: number;
  icon: LucideIcon;
  image: string;
}

const Research: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const researchAreas: ResearchItem[] = [
    {
      id: 1,
      icon: Fuel,
      image: `${import.meta.env.BASE_URL}images/carbon.jpg`,
    },
    {
      id: 2,
      icon: Zap,
      image: `${import.meta.env.BASE_URL}images/energia.webp`,
    },
    {
      id: 3,
      icon: Waves,
      image: `${import.meta.env.BASE_URL}images/modelagem.png`,
    },
    {
      id: 4,
      icon: Mountain,
      image: `${import.meta.env.BASE_URL}images/ml.png`,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % researchAreas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + researchAreas.length) % researchAreas.length);
  };

  const currentId = String(researchAreas[currentSlide].id);
  const features = t(`researchList.${currentId}.features`, {
    returnObjects: true,
  }) as string[];

  return (
    <section
      id="research"
      className="py-20 lg:py-32 relative overflow-hidden bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#04363e] dark:text-white">
              {t("research.title")} <span className="text-lirge-cyan">{t("research.highlight")}</span>
            </h2>
            <div className="w-24 h-1 bg-lirge-cyan mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t("research.subtitle")}
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="
                    bg-gradient-to-br
                      from-[#7bc3cf]
                      to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:bg-gradient-to-br
                    dark:from-lirge-teal/20
                    dark:to-lirge-cyan/20
                    dark:border-lirge-cyan/20
                    transition-colors duration-300
                  "
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="relative w-full h-64 sm:h-80 lg:h-auto overflow-hidden">
                      <img
                        src={researchAreas[currentSlide].image}
                        alt={t(`researchList.${currentId}.title`)}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-lirge-darker/80 to-transparent" />
                      <div className="
                        absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center
                        bg-[#04363e] border border-cyan-700
                        dark:bg-lirge-cyan/20 dark:border-lirge-cyan/40
                        transition-colors duration-300
                      ">
                        {React.createElement(researchAreas[currentSlide].icon, {
                          className: "text-cyan-50 dark:text-lirge-cyan",
                          size: 24,
                        })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#04363e] dark:text-white mb-4">
                        {t(`researchList.${currentId}.title`)}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {t(`researchList.${currentId}.description`)}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-cyan-50 dark:text-lirge-cyan font-semibold">
                          {t("research.featuresLabel")}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-cyan-50 dark:bg-lirge-cyan rounded-full" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevSlide}
                className="
                  p-3 bg-[#7bc3cf] border border-cyan-700 rounded-full
                  dark:bg-lirge-teal/20 dark:border-lirge-cyan/20
                  transition-colors duration-200
                "
              >
                <ChevronLeft className="text-cyan-700" size={24} />
              </button>

              <div className="flex space-x-2">
                {researchAreas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? "bg-lirge-cyan" : "bg-lirge-cyan/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="
                  p-3 bg-[#7bc3cf] border border-cyan-700 rounded-full
                  dark:bg-lirge-teal/20 dark:border-lirge-cyan/20
                  transition-colors duration-200
                "
              >
                <ChevronRight className="text-cyan-700" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;