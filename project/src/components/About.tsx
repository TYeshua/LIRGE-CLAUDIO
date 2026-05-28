import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Microscope, Users, Target, Award } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Microscope,
      title: 'Pesquisa Avançada',
      description: 'Desenvolvimento de estudos inovadores em geoenergia com metodologias de ponta.'
    },
    {
      icon: Users,
      title: 'Equipe Qualificada',
      description: 'Professores doutores e estudantes dedicados à excelência em pesquisa.'
    },
    {
      icon: Target,
      title: 'Foco Estratégico',
      description: 'Soluções integradas para os desafios do setor energético brasileiro.'
    },
    {
      icon: Award,
      title: 'Reconhecimento',
      description: 'Publicações em revistas internacionais e parcerias com a indústria.'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Sobre o <span className="text-cyan-400">LIRGE</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Excelência em Pesquisa Energética
            </h3>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              O LIRGE é um laboratório de pesquisa de excelência vinculado à Universidade Federal do Pará, 
              dedicado ao desenvolvimento de estudos integrados em geoenergia. Nossa missão é produzir 
              conhecimento científico de alta qualidade que contribua para o avanço sustentável do setor energético.
            </p>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Trabalhamos com uma abordagem multidisciplinar, integrando geociências, engenharia e tecnologia 
              para enfrentar os desafios contemporâneos da exploração e produção de recursos energéticos, 
              sempre priorizando a sustentabilidade e a inovação.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                Geociências
              </span>
              <span className="px-4 py-2 bg-sky-500/20 text-sky-400 rounded-full text-sm font-medium border border-sky-500/30">
                Energia
              </span>
              <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                Sustentabilidade
              </span>
              <span className="px-4 py-2 bg-sky-500/20 text-sky-400 rounded-full text-sm font-medium border border-sky-500/30">
                Inovação
              </span>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/30">
              <img
                src="https://images.pexels.com/photos/6648818/pexels-photo-6648818.jpeg"
                alt="Laboratório de pesquisa em geoenergia"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-sky-600/20"></div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400/30 to-sky-500/30 rounded-full blur-xl"
            ></motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-sky-400/30 to-cyan-500/30 rounded-full blur-lg"
            ></motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-xl bg-slate-700/30 border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;