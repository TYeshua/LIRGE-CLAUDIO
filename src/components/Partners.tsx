import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Handshake,
  LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Partner {
  id: number;
  icon: LucideIcon;
  logo: string;
}

const Partners: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const partners: Partner[] = [
    {
      id: 1,
      icon: Building2,
      logo: `${import.meta.env.BASE_URL}images/ml.png`,
    },
    {
      id: 2,
      icon: Handshake,
      logo: `${import.meta.env.BASE_URL}images/parceiro2.png`,
    },
    {
      id: 3,
      icon: Building2,
      logo: `${import.meta.env.BASE_URL}images/parceiro3.png`,
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % partners.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + partners.length) % partners.length);

  const current = partners[currentSlide];
  const id = String(current.id);

  const name = t(`partnersList.${id}.name`);
  const description = t(`partnersList.${id}.description`);
  const highlights = t(`partnersList.${id}.highlights`, {
    returnObjects: true,
  }) as string[];

  return (
    <section
      id="partners"
      className="py-20 lg:py-32 relative overflow-hidden bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#04363e] dark:text-white">
              {t("partners.title")}{" "}
              <span className="text-lirge-cyan">{t("partners.partners")}</span>{" "}
              &{" "}
              <span className="text-lirge-cyan">{t("partners.sponsors")}</span>
            </h2>
            <div className="w-24 h-1 bg-lirge-cyan mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t("partners.subtitle")}
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
                    bg-gradient-to-br from-[#7bc3cf] to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:bg-gradient-to-br dark:from-lirge-teal/20 dark:to-lirge-cyan/20 dark:border-lirge-cyan/20
                    transition-colors duration-300
                  "
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Logo */}
                    <div className="relative w-full h-64 sm:h-80 lg:h-auto overflow-hidden flex items-center justify-center bg-[#04363e] dark:bg-lirge-darker/40">
                      <img
                        src={current.logo}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="
                        absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center
                        bg-[#04363e] border border-cyan-700
                        dark:bg-lirge-cyan/20 dark:border-lirge-cyan/40
                        transition-colors duration-300
                      ">
                        {React.createElement(current.icon, {
                          className: "text-cyan-50 dark:text-lirge-cyan",
                          size: 24,
                        })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#04363e] dark:text-white mb-4">
                        {name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {description}
                      </p>
                      <div className="space-y-3">
                        <h4 className="text-cyan-50 dark:text-lirge-cyan font-semibold">
                          {t("partners.areasLabel")}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-cyan-50 dark:bg-lirge-cyan rounded-full" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {item}
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
                {partners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentSlide ? "bg-lirge-cyan" : "bg-lirge-cyan/30"
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

export default Partners;