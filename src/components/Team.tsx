import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, User, GraduationCap } from 'lucide-react';

const Team: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const coordinators = [
    {
      name: 'Prof. Dr. João Silva Santos',
      role: 'Coordenador Geral',
      area: 'Geofísica e Exploração Energética',
      email: 'joao.santos@ufpa.br',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Profa. Dra. Maria Oliveira Costa',
      role: 'Vice-Coordenadora',
      area: 'Energia Renovável e Sustentabilidade',
      email: 'maria.costa@ufpa.br',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const students = [
    {
      name: 'Ana Paula Ferreira',
      role: 'Doutoranda',
      area: 'Modelagem de Reservatórios',
      email: 'ana.ferreira@ufpa.br',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Carlos Eduardo Lima',
      role: 'Mestrando',
      area: 'Energia Solar Fotovoltaica',
      email: 'carlos.lima@ufpa.br',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Beatriz Santos Rocha',
      role: 'Bolsista IC',
      area: 'Análise Sísmica',
      email: 'beatriz.rocha@ufpa.br',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Diego Almeida Souza',
      role: 'Bolsista IC',
      area: 'Geoquímica do Petróleo',
      email: 'diego.souza@ufpa.br',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Fernanda Silva Mendes',
      role: 'Doutoranda',
      area: 'Biomassa e Biocombustíveis',
      email: 'fernanda.mendes@ufpa.br',
      image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Gabriel Pereira Nunes',
      role: 'Mestrando',
      area: 'Hidrogeologia',
      email: 'gabriel.nunes@ufpa.br',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    // You could add a toast notification here
  };

  return (
    <section id="team" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-lirge-darker via-lirge-teal/10 to-lirge-darker" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Nossa <span className="text-lirge-cyan">Equipe</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-lirge-cyan to-lirge-teal mx-auto mb-8" />
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Conheça os pesquisadores e bolsistas que fazem do LIRGE um centro de excelência
              em pesquisa e inovação.
            </p>
          </motion.div>

          {/* Coordenadores */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-lirge-cyan">
              Coordenação
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coordinators.map((coord, index) => (
                <motion.div
                  key={coord.name}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-lirge-teal/20 to-lirge-cyan/20 rounded-2xl p-6 border-2 border-lirge-cyan/30 backdrop-blur-sm hover:border-lirge-cyan/60 transition-all duration-300 hover:shadow-2xl hover:shadow-lirge-cyan/20">
                    <div className="relative mb-6">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={coord.image}
                        alt={coord.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-lirge-cyan/50"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.2 }}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-lirge-cyan to-lirge-teal rounded-full flex items-center justify-center"
                      >
                        <GraduationCap size={16} className="text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-lirge-cyan transition-colors">
                        {coord.name}
                      </h4>
                      <p className="text-lirge-cyan font-semibold mb-2">{coord.role}</p>
                      <p className="text-gray-300 text-sm mb-4">{coord.area}</p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyEmail(coord.email)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-lirge-teal/30 hover:bg-lirge-teal/50 rounded-full text-sm text-white transition-all duration-200 border border-lirge-cyan/30 hover:border-lirge-cyan/60"
                      >
                        <Mail size={16} />
                        <span>{coord.email}</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bolsistas e Estudantes */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-lirge-cyan">
              Pesquisadores e Bolsistas
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student, index) => (
                <motion.div
                  key={student.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-lirge-teal/10 to-lirge-cyan/10 rounded-xl p-6 border border-lirge-cyan/20 backdrop-blur-sm hover:border-lirge-cyan/40 transition-all duration-300 hover:shadow-xl hover:shadow-lirge-cyan/10">
                    <div className="flex items-center mb-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={student.image}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-lirge-cyan/40"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-semibold text-white group-hover:text-lirge-cyan transition-colors">
                          {student.name}
                        </h4>
                        <p className="text-lirge-cyan text-sm font-medium">{student.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{student.area}</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => copyEmail(student.email)}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-lirge-teal/20 hover:bg-lirge-teal/30 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200 border border-lirge-cyan/20 hover:border-lirge-cyan/40"
                    >
                      <Mail size={14} />
                      <span>{student.email}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Team;