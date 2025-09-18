import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Globe,
  Calendar,
  Users,
} from "lucide-react";

const News: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsList = [
    {
      id: 1,
      title: "Novo Projeto de Pesquisa em Transição Energética",
      description:
        "Nosso laboratório lançou uma iniciativa inovadora para acelerar o desenvolvimento de tecnologias limpas e sustentáveis, focando em captura e uso de carbono.",
      icon: Globe,
      image: `${import.meta.env.BASE_URL}images/noticia1.jpg`,
      highlights: ["Energia Sustentável", "Colaboração Internacional", "Impacto Social"],
      date: "12/09/2025",
    },
    {
      id: 2,
      title: "Publicação em Revista Internacional",
      description:
        "Pesquisadores do LIRGE publicaram um artigo em uma das principais revistas científicas da área de geoenergia, destacando avanços em modelagem petrofísica.",
      icon: Newspaper,
      image: `${import.meta.env.BASE_URL}images/noticia2.jpg`,
      highlights: ["Pesquisa Reconhecida", "Avanços Científicos", "Inovação"],
      date: "28/08/2025",
    },
    {
      id: 3,
      title: "Workshop sobre Inteligência Artificial",
      description:
        "Realizamos um workshop para explorar aplicações de Machine Learning em dados petrofísicos, reunindo estudantes, professores e profissionais da indústria.",
      icon: Users,
      image: `${import.meta.env.BASE_URL}images/noticia3.jpg`,
      highlights: ["Capacitação", "Integração Acadêmica", "Indústria 4.0"],
      date: "15/07/2025",
    },
    {
      id: 4,
      title: "Parceria Estratégica com Empresas de Energia",
      description:
        "Firmamos um acordo de cooperação com empresas líderes para desenvolver soluções inovadoras que apoiem a exploração e produção de energia limpa.",
      icon: Calendar,
      image: `${import.meta.env.BASE_URL}images/noticia4.jpg`,
      highlights: ["Parceria", "Inovação", "Energia do Futuro"],
      date: "02/06/2025",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsList.length) % newsList.length);
  };

  return (
    <section
      id="news"
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
              Últimas <span className="text-lirge-cyan">Notícias</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-lirge-cyan to-lirge-teal mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Acompanhe as novidades, conquistas e eventos do nosso laboratório de pesquisa em
              geoenergia.
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
                        src={newsList[currentSlide].image}
                        alt={newsList[currentSlide].title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-lirge-darker/80 to-transparent" />
                      <div
                        className="
                          absolute top-4 right-4
                          w-12 h-12 bg-[#E0F7FA]/70 rounded-full
                          flex items-center justify-center
                          border border-[#81D4FA]
                          dark:bg-lirge-cyan/20
                          dark:border-lirge-cyan/40
                          transition-colors duration-300
                        "
                      >
                        {React.createElement(newsList[currentSlide].icon, {
                          className: "text-lirge-cyan",
                          size: 24,
                        })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <span className="text-sm dark:text-lirge-cyan text-cyan-50 mb-2">
                        {newsList[currentSlide].date}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#04363e] dark:text-white mb-4">
                        {newsList[currentSlide].title}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {newsList[currentSlide].description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="dark:text-lirge-cyan text-cyan-50 font-semibold">Destaques:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {newsList[currentSlide].highlights.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <div className="w-2 h-2 dark:bg-lirge-cyan bg-cyan-50 rounded-full" />
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
                  p-3
                   bg-[#7bc3cf]
                  border border-cyan-700
                  rounded-full
                  dark:bg-lirge-teal/20
                  dark:border-lirge-cyan/20
                  transition-colors duration-200
                "
              >
                <ChevronLeft className="text-cyan-700" size={24} />
              </button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {newsList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide
                        ? "bg-lirge-cyan"
                        : "bg-lirge-cyan/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="
                  p-3
                  bg-[#7bc3cf]
                  border border-cyan-700
                  rounded-full
                  dark:bg-lirge-teal/20
                  dark:border-lirge-cyan/20
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

export default News;