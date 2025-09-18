import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const menuItems = [
    { id: 'home', label: t('menu.home') },
    { id: 'news', label: t('menu.news') },
    { id: 'events-publications', label: t('menu.eventsPublications') },
    { id: 'about', label: t('menu.about') },
    { id: 'research', label: t('menu.research') },
    { id: 'team', label: t('menu.team') },
    { id: 'partners', label: t('menu.partners') },
    { id: 'contact', label: t('menu.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md shadow-2xl ${
        isScrolled ? 'bg-cyan-50 dark:bg-lirge-darker/95' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/logos2.png`}
              alt="Logo LIRGE"
              className="h-8 lg:h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-lirge-cyan'
                    : 'text-gray-900 dark:text-white hover:text-lirge-cyan'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lirge-cyan"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Botões Tema + Idioma */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-lirge-cyan text-white dark:bg-white dark:text-lirge-darker shadow-md transition-all"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={toggleLanguage}
                className="px-3 py-2 rounded-md bg-lirge-cyan text-white dark:bg-white dark:text-lirge-darker text-sm font-medium shadow-md transition-all"
              >
                {i18n.language === 'pt' ? 'EN' : 'PT'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-900 dark:text-white hover:text-lirge-cyan transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/90 dark:bg-lirge-darker/95 backdrop-blur-md border-t border-lirge-teal/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'text-lirge-cyan bg-lirge-teal/10'
                        : 'text-gray-900 dark:text-white hover:text-lirge-cyan hover:bg-lirge-teal/5'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Botão Tema no Mobile */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="mt-3 w-full flex items-center justify-center gap-2 p-2 rounded-md bg-lirge-cyan text-white dark:bg-white dark:text-lirge-darker shadow-md transition-all"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={18} /> <span>{t('theme.light')}</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} /> <span>{t('theme.dark')}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;