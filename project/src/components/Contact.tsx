import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const copyEmail = () => {
    navigator.clipboard.writeText('lirge@ufpa.br');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-mail Institucional',
      value: 'lirge@ufpa.br',
      action: copyEmail,
      interactive: true
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '+55 (91) 3201-7000',
      interactive: false
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Instituto de Geociências - UFPA\nCampus Básico - Belém/PA',
      interactive: false
    }
  ];

  return (
    <section id="contato" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Entre em <span className="text-cyan-400">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Conecte-se conosco para colaborações, parcerias ou informações sobre nossas pesquisas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300 ${
                  item.interactive ? 'cursor-pointer hover:bg-slate-700/50' : ''
                }`}
                onClick={item.action}
                whileHover={item.interactive ? { scale: 1.02 } : {}}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 whitespace-pre-line">{item.value}</p>
                    {item.interactive && (
                      <div className="flex items-center mt-3 text-cyan-400 text-sm">
                        {copiedEmail ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            <span>E-mail copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            <span>Clique para copiar</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Map/Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg"
                alt="Universidade Federal do Pará - Campus"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-sky-600/30"></div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <MapPin className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">UFPA</h3>
                  <p className="text-lg">Instituto de Geociências</p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-20 h-20 border-2 border-cyan-400/30 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-sky-400/40 to-cyan-500/40 rounded-full blur-sm"
            ></motion.div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-600/20">
            <h3 className="text-2xl font-bold text-white mb-4">Horário de Funcionamento</h3>
            <p className="text-slate-300 text-lg mb-2">Segunda a Sexta: 8:00 - 18:00</p>
            <p className="text-slate-400">Para agendamentos e visitas técnicas, entre em contato previamente</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;