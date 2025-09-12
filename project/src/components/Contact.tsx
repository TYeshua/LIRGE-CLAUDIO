import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Building } from 'lucide-react';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-mail',
      content: 'lirge@ufpa.br',
      action: () => window.open('mailto:lirge@ufpa.br'),
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '+55 (91) 3201-7000',
      action: () => window.open('tel:+559132017000'),
    },
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Campus Universitário do Guamá\nRua Augusto Corrêa, 01\nBelém - PA, 66075-110',
      action: () => window.open('https://maps.google.com/?q=UFPA+Belem'),
    },
    {
      icon: Clock,
      title: 'Horário',
      content: 'Segunda a Sexta\n08:00 - 17:00',
      action: null,
    },
  ];

  const links = [
    {
      title: 'UFPA - Universidade Federal do Pará',
      url: 'https://portal.ufpa.br',
    },
    {
      title: 'Instituto de Geociências',
      url: 'https://www.ig.ufpa.br',
    },
    {
      title: 'Portal de Periódicos CAPES',
      url: 'https://www.periodicos.capes.gov.br',
    },
    {
      title: 'CNPq - Conselho Nacional de Desenvolvimento Científico',
      url: 'https://www.cnpq.br',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-lirge-darker via-lirge-teal/10 to-lirge-darker" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="text-lirge-cyan">Contato</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-lirge-cyan to-lirge-teal mx-auto mb-8" />
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Entre em contato conosco para saber mais sobre nossos projetos de pesquisa,
              colaborações ou oportunidades acadêmicas.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Informações de Contato
              </h3>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={info.action ? { scale: 1.02 } : {}}
                  className={`group ${info.action ? 'cursor-pointer' : ''}`}
                  onClick={info.action || undefined}
                >
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-lirge-teal/10 to-lirge-cyan/10 rounded-xl border border-lirge-cyan/20 backdrop-blur-sm hover:border-lirge-cyan/40 transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-br from-lirge-cyan to-lirge-teal rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <info.icon className="text-white" size={24} />
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-lirge-cyan transition-colors">
                        {info.title}
                      </h4>
                      <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Links and Resources */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Links Institucionais
              </h3>

              <div className="space-y-4">
                {links.map((link, index) => (
                  <motion.a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group block"
                  >
                    <div className="flex items-center justify-between p-4 bg-gradient-to-br from-lirge-teal/10 to-lirge-cyan/10 rounded-xl border border-lirge-cyan/20 backdrop-blur-sm hover:border-lirge-cyan/40 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <Building className="text-lirge-cyan" size={20} />
                        <span className="text-white group-hover:text-lirge-cyan transition-colors">
                          {link.title}
                        </span>
                      </div>
                      <ExternalLink className="text-gray-400 group-hover:text-lirge-cyan transition-colors" size={16} />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-br from-lirge-teal/10 to-lirge-cyan/10 rounded-xl border border-lirge-cyan/20 backdrop-blur-sm overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-lirge-teal/20 to-lirge-cyan/20 flex items-center justify-center relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center"
                    >
                      <MapPin className="text-lirge-cyan mx-auto mb-2" size={32} />
                      <p className="text-white font-semibold">Campus Universitário do Guamá</p>
                      <p className="text-gray-300 text-sm">Universidade Federal do Pará</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;