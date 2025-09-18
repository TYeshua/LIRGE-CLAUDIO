import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Instagram,
  Linkedin as LinkedinIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { title: "UFPA - Salinópolis Campus", url: "https://campussalinopolis.ufpa.br/" },
    { title: "Instituto de Geociências", url: "https://www.ig.ufpa.br" },
    {
      title: "CNPq - National Council for Scientific and Technological Development",
      url: "https://www.cnpq.br",
    },
  ];

  const socialLinks = [
    { Icon: Instagram, url: "#", label: "Instagram" },
    { Icon: LinkedinIcon, url: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-cyan-50 border-t border-cyan-700 dark:bg-lirge-darker dark:border-lirge-cyan/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Logo & Contact */}
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
            <p className="text-[#04363e] text-sm leading-relaxed max-w-sm dark:text-gray-300">
              {t("hero.subtitle")}
            </p>
            <div className="space-y-3 text-sm text-[#04363e] dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-cyan-700" />
                <span>lirge@ufpa.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-cyan-700" />
                <span>+55 (84) 99898-8983</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-cyan-700 mt-0.5" />
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
            <h3 className="text-lg font-semibold text-[#04363e] dark:text-white">
              {t("footer.quickLinks")}
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-[#04363e] dark:text-gray-300 hover:text-cyan-700 dark:hover:text-lirge-cyan transition-colors duration-200 group"
                >
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 text-cyan-700 dark:text-lirge-cyan transition-opacity"
                  />
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
            <h3 className="text-lg font-semibold text-[#04363e] dark:text-white">
              {t("footer.social")}
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, url, label }) => (
                <motion.a
                  key={label}
                  href={url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-[#04363e] text-cyan-50 border border-cyan-700 rounded-full flex items-center justify-center dark:bg-gradient-to-br dark:from-lirge-cyan/20 dark:to-lirge-teal/20 dark:border-lirge-cyan/30 hover:border-cyan-700 dark:hover:border-lirge-cyan/60 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-[#04363e] dark:text-gray-300">
              {t("footer.follow")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="border-t border-cyan-700 dark:border-lirge-cyan/20 py-6 transition-colors duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-[#04363e] dark:text-gray-400 text-center sm:text-left">
            {t("footer.rights")}
          </p>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#04363e] dark:text-gray-400">
              {t("footer.developedBy")}
            </span>
            <span className="flex items-center space-x-2 text-cyan-700 dark:text-lirge-cyan">
              <a
                href="https://www.linkedin.com/in/thiagoyeshua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:underline"
              >
                <LinkedinIcon size={12} className="text-cyan-700 dark:text-lirge-cyan" />
                <span>{t("footer.creators.thiago")}</span>
              </a>
              <span className="text-[#04363e] dark:text-gray-400">e</span>
              <a
                href="https://www.linkedin.com/in/josuedias"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:underline"
              >
                <LinkedinIcon size={12} className="text-cyan-700 dark:text-lirge-cyan" />
                <span>{t("footer.creators.josue")}</span>
              </a>
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;