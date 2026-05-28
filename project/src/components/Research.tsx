import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Zap, Droplets, Mountain, Atom } from 'lucide-react';

const Research: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const researchAreas = [
    {
      icon: Zap,
      title: 'Energia Geotérmica',
      description: 'Estudos sobre o aproveitamento de recursos geotérmicos para geração de energia limpa e sustentável.',
      image: 'https://images.pexels.com/photos/9875426/pexels-photo-9875426.jpeg',
      topics: ['Gradiente geotérmico', 'Modelagem térmica', 'Sustentabilidade energética']
    },
    {
      icon: Droplets,
      title: 'Petróleo e Gás',
      description: 'Pesquisas avançadas em exploração e produção de hidrocarbonetos com foco em eficiência e sustentabilidade.',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      topics: ['Reservatórios', 'Modelagem geológica', 'Recuperação avançada']
    },
    {
      icon: Mountain,
      title: 'Geologia Estrutural',
      description: 'Análise de estruturas geológicas e sua influência na acumulação e migração de fluidos.',
      image: 'https://images.pexels.com/photos/6648813/pexels-photo-6648813.jpeg',
      topics: ['Análise estrutural', 'Tectônica', 'Caracterização rochosa']
    },
    {
      icon: Atom,
      title: 'Geoquímica',
      description: 'Estudos geoquímicos para caracterização de fluidos e rochas em sistemas energéticos.',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
      topics: ['Análise geoquímica', 'Fluidos de formação', 'Biogeoquímica']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % researchAreas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + researchAreas.length) % researchAreas.length);
  };

  return (
    <section id="pesquisa" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Áreas de <span className="text-cyan-400">Pesquisa</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Desenvolvemos pesquisas multidisciplinares que abrangem diferentes aspectos da geoenergia
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 bg-slate-800/50 rounded-2xl border border-slate-700/30">
                  {/* Content */}
                  <div>
                    <div className="flex items-center mb-6">
                      {/* Extract the icon component to a variable */}
                      {(() => {
                        const IconComponent = researchAreas[currentSlide].icon;
                        return (
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-xl flex items-center justify-center mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                        );
                      })()}
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {researchAreas[currentSlide].title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                      {researchAreas[currentSlide].description}
                    </p>

                    <div className="space-y-3 mb-8">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-4">Tópicos de Pesquisa:</h4>
                      {researchAreas[currentSlide].topics.map((topic, index) => (
                        <motion.div
                          key={topic}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center"
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          <span className="text-slate-300">{topic}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-2xl">
                      <img
                        src={researchAreas[currentSlide].image}
                        alt={researchAreas[currentSlide].title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-sky-600/20"></div>
                    </div>
                    
                    {/* Decorative elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-4 -right-4 w-16 h-16 border-2 border-cyan-400/30 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-slate-600/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-slate-600/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {researchAreas.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-cyan-400 scale-125' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;