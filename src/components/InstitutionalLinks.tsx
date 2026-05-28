import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LinkItem {
  title: string;
  url: string;
}

const InstitutionalLinks: React.FC = () => {
  const { t } = useTranslation();

  const links = t("contact.links", { returnObjects: true }) as LinkItem[];

  return (
    <section
      id="institutional-links"
      className="py-20 lg:py-32 relative bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#04363e] dark:text-white">
              {t("institutionalLinks.title")}{" "}
              <span className="text-lirge-cyan">
                {t("institutionalLinks.highlight")}
              </span>
            </h2>
            <div className="w-24 h-1 bg-lirge-cyan mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t("institutionalLinks.subtitle")}
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {links.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="group block"
              >
                <div
                  className="
                    flex items-center justify-between p-5 rounded-xl
                    bg-gradient-to-br from-[#7bc3cf] to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:from-lirge-teal/20 dark:to-lirge-cyan/20
                    dark:border-lirge-cyan/20
                    transition-all duration-300
                    hover:border-cyan-600 dark:hover:border-lirge-cyan/60
                    hover:shadow-lg
                  "
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#04363e] dark:bg-lirge-cyan/20 rounded-lg flex items-center justify-center">
                      <Building2
                        size={20}
                        className="text-cyan-50 dark:text-lirge-cyan"
                      />
                    </div>
                    <span className="text-[#04363e] dark:text-white font-medium leading-tight">
                      {link.title}
                    </span>
                  </div>
                  <ExternalLink
                    size={18}
                    className="flex-shrink-0 ml-3 text-cyan-700 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-lirge-cyan transition-colors duration-200"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalLinks;
