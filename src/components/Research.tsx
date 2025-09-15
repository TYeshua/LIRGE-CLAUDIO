import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Fuel, Waves, Mountain, Zap } from 'lucide-react';

const Research: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const researchAreas = [
    {
      id: 1,
      title: 'Petróleo e Gás Natural',
      description:
        'Pesquisas avançadas em exploração, produção e refino de hidrocarbonetos, incluindo técnicas de recuperação avançada e análise de reservatórios.',
      icon: Fuel,
      image:
        'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Análise de Reservatórios', 'Recuperação Avançada', 'Modelagem Geológica'],
    },
    {
      id: 2,
      title: 'Energia Renovável',
      description:
        'Desenvolvimento de tecnologias sustentáveis incluindo energia solar, eólica, hidrelétrica e biomassa, focando em eficiência e integração ao sistema energético.',
      icon: Zap,
      image:
        'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Energia Solar', 'Energia Eólica', 'Biomassa'],
    },
    {
      id: 3,
      title: 'Geofísica Aplicada',
      description:
        'Aplicação de métodos geofísicos para exploração mineral e energética, incluindo sísmica, gravimetria, magnetometria e eletrorresistividade.',
      icon: Waves,
      image:
        'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Sísmica 3D', 'Gravimetria', 'Magnetometria'],
    },
    {
      id: 4,
      title: 'Mineração e Geologia',
      description:
        'Estudos em mineração sustentável, caracterização de depósitos minerais e análise de impactos ambientais associados à atividade extrativa.',
      icon: Mountain,
      image:
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Mineração Sustentável', 'Análise de Depósitos', 'Impacto Ambiental'],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % researchAreas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + researchAreas.length) % researchAreas.length);
  };

  return (
    <section id="research" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lirge-darker via-lirge-teal/5 to-lirge-darker" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Áreas de <span className="text-lirge-cyan">Pesquisa</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-lirge-cyan to-lirge-teal mx-auto mb-8" />
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Nossos projetos de pesquisa abrangem diversas áreas estratégicas da geoenergia,
              sempre focando na inovação e sustentabilidade.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="bg-gradient-to-br from-lirge-teal/20 to-lirge-cyan/20 border border-lirge-cyan/20"
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={researchAreas[currentSlide].image}
                        alt={researchAreas[currentSlide].title}
                        loading="lazy"
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-lirge-darker/80 to-transparent" />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-12 h-12 bg-lirge-cyan/20 rounded-full flex items-center justify-center border border-lirge-cyan/40"
                      >
                        {React.createElement(researchAreas[currentSlide].icon, {
                          className: 'text-lirge-cyan',
                          size: 24,
                        })}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl lg:text-3xl font-bold text-white mb-4"
                      >
                        {researchAreas[currentSlide].title}
                      </motion.h3>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 mb-6 leading-relaxed"
                      >
                        {researchAreas[currentSlide].description}
                      </motion.p>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3"
                      >
                        <h4 className="text-lirge-cyan font-semibold">Principais Focos:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {researchAreas[currentSlide].features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-lirge-cyan rounded-full" />
                              <span className="text-sm text-gray-300">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevSlide}
                className="p-3 bg-lirge-teal/20 hover:bg-lirge-teal/40 border border-lirge-cyan/20 hover:border-lirge-cyan/60 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="text-lirge-cyan" size={24} />
              </button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {researchAreas.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-lirge-cyan'
                        : 'bg-lirge-cyan/30 hover:bg-lirge-cyan/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 bg-lirge-teal/20 hover:bg-lirge-teal/40 border border-lirge-cyan/20 hover:border-lirge-cyan/60 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="text-lirge-cyan" size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Research;