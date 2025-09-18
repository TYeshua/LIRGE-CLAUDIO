import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail as MailIcon,
  Clock,
  ExternalLink,
  Building,
} from 'lucide-react';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactInfo = [
    {
      icon: MailIcon,
      title: 'E-mail',
      content: 'lirge@ufpa.br',
      action: () => window.open('mailto:lirge@ufpa.br'),
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '+55 (84) 99898-8983',
      action: () => window.open('tel:+5584998988983'),
    },
    {
      icon: MapPin,
      title: 'Endereço',
      content:
        'Campus Universitário de Salinópolis\nRua Raimundo Santana Cruz, s/n - Bairro São Tomé\nSalinópolis - PA, 68721-000',
      action: () =>
        window.open('https://maps.google.com/?q=UFPA+Salinópolis'),
    },
    {
      icon: Clock,
      title: 'Horário',
      content: 'Segunda a Sexta\n08:00 - 18:00',
      action: null,
    },
  ];

  const links = [
    {
      title: 'UFPA - Campus Salinópolis',
      url: 'https://campussalinopolis.ufpa.br/',
    },
    { title: 'Instituto de Geociências', url: 'https://www.ig.ufpa.br' },
    {
      title: 'CNPq - Conselho Nacional de Desenvolvimento Científico',
      url: 'https://www.cnpq.br',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 relative bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#04363e] dark:text-white">
              <span className="text-lirge-cyan">Contato</span>
            </h2>
            <div className="w-24 h-1 bg-lirge-cyan mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Entre em contato conosco para saber mais sobre nossos projetos de
              pesquisa, colaborações ou oportunidades acadêmicas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#04363e] dark:text-white mb-8">
                Informações de Contato
              </h3>

              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className={`group ${info.action ? 'cursor-pointer' : ''}`}
                  onClick={info.action || undefined}
                >
                  <div className="flex items-start space-x-4 p-6  bg-gradient-to-br
                    from-[#7bc3cf]
                    to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:bg-gradient-to-br
                   dark:from-lirge-teal/20
                    dark:to-lirge-cyan/20
                    dark:border-lirge-cyan/20
                    transition-colors duration-300">
                    <div className="w-12 h-12 bg-[#04363e] dark:bg-gradient-to-br dark:from-lirge-cyan dark:to-lirge-teal rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon
                        className="text-cyan-50 dark:text-white"
                        size={24}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#04363e] dark:text-white mb-2">
                        {info.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Links and Resources */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-[#04363e] dark:text-white mb-8">
                Links Institucionais
              </h3>

              <div className="space-y-4">
                {links.map((link) => (
                  <a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex items-center justify-between p-4  bg-gradient-to-br
                    from-[#7bc3cf]
                    to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:bg-gradient-to-br
                   dark:from-lirge-teal/20
                    dark:to-lirge-cyan/20
                    dark:border-lirge-cyan/20
                    transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <Building
                          className="text-cyan-700 dark:text-lirge-cyan"
                          size={20}
                        />
                        <span className="text-[#04363e] dark:text-white">
                          {link.title}
                        </span>
                      </div>
                      <ExternalLink
                        className="text-cyan-700 dark:text-gray-400"
                        size={16}
                      />
                    </div>
                  </a>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-br
                    from-[#7bc3cf]
                    to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:bg-gradient-to-br
                   dark:from-lirge-teal/20
                    dark:to-lirge-cyan/20
                    dark:border-lirge-cyan/20
                    transition-colors duration-300 rounded-xl overflow-hidden">
                  {/* Mapa incorporado */}
                  <div className="h-64 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.999682634279!2d-47.3418561!3d-0.6310413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a8991aa9bcb021%3A0x9d2277db2e684e09!2sUniversidade%20Federal%20do%20Par%C3%A1%20-%20Campus%20Salin%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1713200000000!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>

                  {/* Informações abaixo do mapa */}
                  <div className="p-4 text-center">
                    <MapPin
                      className="text-cyan-700 dark:text-lirge-cyan mx-auto mb-2"
                      size={32}
                    />
                    <p className="text-[#04363e] dark:text-white font-semibold">
                      <a
                        href="https://maps.app.goo.gl/juruUVibaRdvjP5K9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        UFPA - Campus Salinópolis
                      </a>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <a
                        href="https://www.google.com/maps/place/Universidade+Federal+do+Par%C3%A1+-+Campus+Salin%C3%B3polis/@-0.6310413,-47.3418561,17z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Universidade Federal do Pará
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;