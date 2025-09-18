import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  BookOpen,
  Award,
  Users,
} from "lucide-react";

const EventsPublications: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const contentList = [
    {
      id: 1,
      type: "evento",
      title: "Conferência Internacional de Geoenergia",
      description:
        "Participação do LIRGE em uma conferência internacional, apresentando pesquisas em transição energética e novas tecnologias de captura de carbono.",
      icon: CalendarDays,
      image: `${import.meta.env.BASE_URL}images/evento1.jpg`,
      highlights: ["Palestras", "Networking", "Inovação"],
      date: "05/09/2025",
    },
    {
      id: 2,
      type: "publicacao",
      title: "Artigo em Revista Científica de Prestígio",
      description:
        "Publicação de um artigo na *Energy & Fuels Journal*, abordando modelagem e simulação de reservatórios com aprendizado de máquina.",
      icon: BookOpen,
      image: `${import.meta.env.BASE_URL}images/publicacao1.jpg`,
      highlights: ["Reconhecimento Internacional", "Pesquisa Avançada", "IA aplicada"],
      date: "22/08/2025",
    },
    {
      id: 3,
      type: "evento",
      title: "Workshop Nacional de Geoenergia",
      description:
        "Evento organizado pelo laboratório reunindo especialistas, estudantes e empresas para debater sobre exploração sustentável de energia.",
      icon: Users,
      image: `${import.meta.env.BASE_URL}images/evento2.jpg`,
      highlights: ["Integração Acadêmica", "Capacitação", "Sustentabilidade"],
      date: "10/07/2025",
    },
    {
      id: 4,
      type: "publicacao",
      title: "Prêmio de Inovação em Energia",
      description:
        "Pesquisadores do LIRGE foram premiados pela contribuição em soluções inovadoras para otimização da exploração energética.",
      icon: Award,
      image: `${import.meta.env.BASE_URL}images/premio1.jpg`,
      highlights: ["Reconhecimento", "Excelência", "Impacto Científico"],
      date: "15/06/2025",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contentList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + contentList.length) % contentList.length);
  };

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Paleta diferenciada
  const getCardColors = (type: string) => {
    if (type === "evento") {
      return {
        bg: "from-cyan-500 to-blue-600 border-cyan-700",
        dark: "dark:from-cyan-900/40 dark:to-blue-900/30 dark:border-cyan-800/40",
        iconBg:
          "bg-cyan-100/70 border-cyan-600 dark:bg-cyan-500/20 dark:border-cyan-400/40",
        indicator: "bg-cyan-500",
        tag: "bg-cyan-600 text-white",
      };
    } else {
      return {
        bg: "from-amber-400 to-yellow-500 border-amber-600",
        dark: "dark:from-amber-900/40 dark:to-yellow-900/30 dark:border-amber-700/40",
        iconBg:
          "bg-amber-100/70 border-amber-600 dark:bg-amber-500/20 dark:border-amber-400/40",
        indicator: "bg-amber-500",
        tag: "bg-amber-500 text-black font-semibold",
      };
    }
  };

  const colors = getCardColors(contentList[currentSlide].type);

  return (
    <section
      id="events-publications"
      className="
        py-20 lg:py-32 relative overflow-hidden
        bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300
      "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Eventos & <span className="text-lirge-cyan">Publicações</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-lirge-cyan to-lirge-teal mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Explore os eventos que organizamos e as publicações que refletem nosso compromisso
              com a pesquisa e inovação em geoenergia.
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
                  className={`
                    bg-gradient-to-br
                    ${colors.bg}
                    border
                    ${colors.dark}
                    transition-colors duration-300
                  `}
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="relative w-full h-64 sm:h-80 lg:h-auto overflow-hidden">
                      <img
                        src={contentList[currentSlide].image}
                        alt={contentList[currentSlide].title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Tag de tipo sobre a imagem */}
                      <span
                        className={`
                          absolute top-4 left-4 px-3 py-1 text-xs rounded-full shadow
                          ${colors.tag}
                        `}
                      >
                        {contentList[currentSlide].type === "evento"
                          ? "Evento"
                          : "Publicação"}
                      </span>

                      {/* Ícone */}
                      <div
                        className={`
                          absolute top-4 right-4
                          w-12 h-12 rounded-full
                          flex items-center justify-center
                          ${colors.iconBg}
                          transition-colors duration-300
                        `}
                      >
                        {React.createElement(contentList[currentSlide].icon, {
                          className: "text-white",
                          size: 24,
                        })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <span
                        className={`
                          inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3
                          ${colors.tag}
                        `}
                      >
                        {contentList[currentSlide].type === "evento"
                          ? "Evento"
                          : "Publicação"}
                      </span>

                      <span className="text-sm text-white mb-2">
                        {contentList[currentSlide].date}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        {contentList[currentSlide].title}
                      </h3>

                      <p className="text-gray-100 mb-6 leading-relaxed">
                        {contentList[currentSlide].description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-white font-semibold">Destaques:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {contentList[currentSlide].highlights.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-white rounded-full" />
                              <span className="text-sm text-white">{item}</span>
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
                className="p-3 bg-gray-100 border border-gray-400 rounded-full dark:bg-gray-800 dark:border-gray-600 transition-colors duration-200"
              >
                <ChevronLeft className="text-gray-700 dark:text-gray-200" size={24} />
              </button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {contentList.map((item, index) => {
                  const itemColors = getCardColors(item.type);
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentSlide
                          ? itemColors.indicator
                          : "bg-gray-400/40"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 bg-gray-100 border border-gray-400 rounded-full dark:bg-gray-800 dark:border-gray-600 transition-colors duration-200"
              >
                <ChevronRight className="text-gray-700 dark:text-gray-200" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsPublications;
