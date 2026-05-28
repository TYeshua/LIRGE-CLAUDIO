import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, GraduationCap } from 'lucide-react';

const Team: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advisors = [
    {
      name: 'Dr. Maria Silva',
      role: 'Coordenadora do LIRGE',
      specialization: 'Geociências Energéticas',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      email: 'maria.silva@ufpa.br'
    },
    {
      name: 'Dr. João Santos',
      role: 'Professor Orientador',
      specialization: 'Geologia Estrutural',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
      email: 'joao.santos@ufpa.br'
    },
    {
      name: 'Dra. Ana Costa',
      role: 'Professora Orientadora',
      specialization: 'Geoquímica Aplicada',
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
      email: 'ana.costa@ufpa.br'
    }
  ];

  const students = [
    {
      name: 'Carlos Oliveira',
      role: 'Mestrando',
      specialization: 'Modelagem Geológica',
      image: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg'
    },
    {
      name: 'Fernanda Lima',
      role: 'Doutoranda',
      specialization: 'Energia Geotérmica',
      image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg'
    },
    {
      name: 'Rafael Souza',
      role: 'Bolsista IC',
      specialization: 'Análise Estrutural',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg'
    },
    {
      name: 'Júlia Ferreira',
      role: 'Bolsista PIBIC',
      specialization: 'Geoquímica',
      image: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg'
    },
    {
      name: 'Pedro Almeida',
      role: 'Mestrando',
      specialization: 'Reservatórios',
      image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg'
    },
    {
      name: 'Luciana Rocha',
      role: 'Doutoranda',
      specialization: 'Sustentabilidade',
      image: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg'
    }
  ];

  return (
    <section id="equipe" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nossa <span className="text-cyan-400">Equipe</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Profissionais qualificados e estudantes dedicados trabalhando juntos pela excelência em pesquisa
          </p>
        </motion.div>

        {/* Orientadores */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Orientadores Responsáveis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-700/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-sky-600/20 rounded-full"></div>
                    <div className="absolute inset-0 ring-4 ring-cyan-400/30 rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-2">{advisor.name}</h4>
                  <p className="text-cyan-400 font-semibold mb-2">{advisor.role}</p>
                  <p className="text-slate-300 mb-4">{advisor.specialization}</p>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={`mailto:${advisor.email}`}
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-full flex items-center justify-center hover:from-cyan-300 hover:to-sky-400 transition-all duration-300"
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </motion.a>
                    <div className="w-10 h-10 bg-slate-600/50 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bolsistas e Estudantes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Estudantes e Bolsistas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {students.map((student, index) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/20 hover:border-cyan-500/40 transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-3 relative">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-600/10 rounded-full"></div>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{student.name}</h4>
                <p className="text-cyan-400 text-xs mb-1">{student.role}</p>
                <p className="text-slate-400 text-xs">{student.specialization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;