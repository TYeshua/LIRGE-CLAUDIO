import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Team: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const coordinators = t("team.coordinators", { returnObjects: true }) as any[];
  const students = t("team.students", { returnObjects: true }) as any[];

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % students.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + students.length) % students.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % students.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [students.length]);

  return (
    <section
      id="team"
      className="py-20 lg:py-32 relative bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#04363e] dark:text-white">
              {t("team.title")}{" "}
              <span className="text-lirge-cyan">{t("team.highlight")}</span>
            </h2>
            <div className="w-24 h-1 bg-lirge-cyan mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t("team.subtitle")}
            </p>
          </div>

          {/* Coordinators */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-cyan-700 dark:text-lirge-cyan">
              {t("team.coordination")}
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coordinators.map((coord) => (
                <div key={coord.name} className="group">
                  <div className="bg-gradient-to-br from-[#7bc3cf] to-[#7bc3cf] border border-[#81D4FA] dark:bg-gradient-to-br dark:from-lirge-teal/20 dark:to-lirge-cyan/20 dark:border-lirge-cyan/20 transition-colors duration-300 rounded-2xl p-6">
                    <div className="flex flex-col items-center text-center">
                      <a
                        href={coord.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-cyan-700 dark:border-lirge-cyan/50 mb-4"
                      >
                        <img
                          src={coord.image}
                          alt={coord.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <h4 className="text-xl font-bold text-[#04363e] dark:text-white mb-1">
                        {coord.name}
                      </h4>
                      <p className="text-cyan-700 dark:text-lirge-cyan font-semibold mb-1">
                        {coord.role}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        {coord.area}
                      </p>
                      <button
                        onClick={() => copyEmail(coord.email)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-[#04363e] dark:bg-lirge-teal/30 rounded-full text-sm text-cyan-50 dark:text-white"
                      >
                        <Mail size={16} />
                        <span>{coord.email}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students Carousel */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-cyan-700 dark:text-lirge-cyan">
              {t("team.researchers")}
            </h3>

            <div className="relative max-w-lg mx-auto">
              <div className="overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-[#7bc3cf] to-[#7bc3cf] border border-[#81D4FA] dark:bg-gradient-to-br dark:from-lirge-teal/20 dark:to-lirge-cyan/20 dark:border-lirge-cyan/20 transition-colors duration-300 rounded-2xl p-8"
                  >
                    <div className="flex flex-col items-center text-center">
                      <a
                        href={students[currentSlide].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-700 dark:border-lirge-cyan/40 mb-5"
                      >
                        <img
                          src={students[currentSlide].image}
                          alt={students[currentSlide].name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <h4 className="text-lg font-bold text-[#04363e] dark:text-white mb-2">
                        {students[currentSlide].name}
                      </h4>
                      {/* Role + Sponsor badge */}
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                        <span className="text-cyan-700 dark:text-lirge-cyan text-sm font-semibold">
                          {students[currentSlide].role}
                        </span>
                        {students[currentSlide].sponsor && (
                          <span className="px-2 py-0.5 bg-[#04363e] dark:bg-lirge-cyan/20 text-cyan-50 dark:text-lirge-cyan text-xs font-bold rounded-full border border-cyan-700 dark:border-lirge-cyan/40">
                            {students[currentSlide].sponsor}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-5">
                        {students[currentSlide].area}
                      </p>
                      <button
                        onClick={() => copyEmail(students[currentSlide].email)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#04363e] dark:bg-lirge-teal/30 rounded-full text-sm text-cyan-50 dark:text-white border border-cyan-700 dark:border-lirge-cyan/30"
                      >
                        <Mail size={16} />
                        <span>{students[currentSlide].email}</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-[#7bc3cf] border border-cyan-700 rounded-full dark:bg-lirge-teal/20 dark:border-lirge-cyan/20 transition-colors duration-200"
                >
                  <ChevronLeft className="text-cyan-700" size={20} />
                </button>

                <div className="flex space-x-2">
                  {students.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? "bg-lirge-cyan scale-125"
                          : "bg-lirge-cyan/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-3 bg-[#7bc3cf] border border-cyan-700 rounded-full dark:bg-lirge-teal/20 dark:border-lirge-cyan/20 transition-colors duration-200"
                >
                  <ChevronRight className="text-cyan-700" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;