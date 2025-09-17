import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Instagram,
  Linkedin,
} from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { title: 'UFPA', url: 'https://campussalinopolis.ufpa.br/' },
    { title: 'Instituto de Geociências', url: 'https://www.ig.ufpa.br' },
    { title: 'CNPq', url: 'https://www.cnpq.br' },
  ];

  return (
    <footer className="relative bg-lirge-darker border-t border-lirge-cyan/20">
      <div className="absolute inset-0 bg-gradient-to-t from-lirge-darker via-lirge-teal/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={`${import.meta.env.BASE_URL}images/logos2.png`}
                  alt="Logo LIRGE"
                  className="h-12 w-auto"
                />
              </div>

              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                Laboratório de Pesquisa Integrada em Geoenergia da UFPA. Centro de excelência em pesquisas sobre energia e geociências.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Mail size={16} className="text-lirge-cyan" />
                  <span>lirge@ufpa.br</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Phone size={16} className="text-lirge-cyan" />
                  <span>+55 (84) 99898-8983</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-300">
                  <MapPin size={16} className="text-lirge-cyan mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Campus Universitário Salinópolis<br />
                    Rua Raimundo Santana Cruz, s/n - Bairro São Tomé<br />
                    Salinópolis - PA, 68721-000
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white">Links Úteis</h3>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <motion.a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 text-gray-300 hover:text-lirge-cyan transition-colors duration-200 group"
                  >
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm">{link.title}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white">Redes Sociais</h3>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-br from-lirge-cyan/20 to-lirge-teal/20 rounded-full flex items-center justify-center border border-lirge-cyan/30 hover:border-lirge-cyan/60 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="text-lirge-cyan" />
                  </motion.a>
                ))}
              </div>

              <p className="text-sm text-gray-300">
                Acompanhe nossas pesquisas e descobertas mais recentes.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-lirge-cyan/20 py-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © 2025 LIRGE - Laboratório de Pesquisa Integrada em Geoenergia. Todos os direitos reservados.
            </p>

            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>Desenvolvido por</span>
              <span className="flex items-center space-x-2 text-lirge-cyan">
                <a
                  href="https://www.linkedin.com/in/thiagoyeshua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:underline"
                >
                  <Linkedin size={12} className="text-lirge-cyan" />
                  <span>Thiago Yeshua</span>
                </a>
                <span className="text-gray-400">e</span>
                <a
                  href="www.linkedin.com/in/thiagoyeshua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:underline"
                >
                  <Linkedin size={12} className="text-lirge-cyan" />
                  <span>Josué Dias</span>
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;