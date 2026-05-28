import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Portal UFPA', href: 'https://portal.ufpa.br' },
    { name: 'Instituto de Geociências', href: 'https://www.ig.ufpa.br' },
    { name: 'Pós-Graduação', href: 'https://ppgeo.propesp.ufpa.br' },
    { name: 'Pesquisa UFPA', href: 'https://www.propesp.ufpa.br' }
  ];

  const socialLinks = [
    { name: 'Research Gate', icon: ExternalLink },
    { name: 'LinkedIn', icon: ExternalLink },
    { name: 'Academia.edu', icon: ExternalLink }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-white opacity-80"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-400">LIRGE</h3>
                <p className="text-sm text-slate-400">UFPA</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Laboratório de Pesquisa Integrada em Geoenergia da Universidade Federal do Pará, 
              dedicado à excelência em pesquisa energética e sustentabilidade.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-slate-400">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">lirge@ufpa.br</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">+55 (91) 3201-7000</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Links Úteis</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Redes Acadêmicas</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-cyan-400 rounded-lg transition-all duration-300 border border-slate-600/30 hover:border-cyan-500/50"
                >
                  <social.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-slate-700/50 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} LIRGE - Laboratório de Pesquisa Integrada em Geoenergia. 
              Universidade Federal do Pará.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <motion.a
                whileHover={{ color: '#00B4D8' }}
                href="#"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Política de Privacidade
              </motion.a>
              <motion.a
                whileHover={{ color: '#00B4D8' }}
                href="#"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Termos de Uso
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
    </footer>
  );
};

export default Footer;