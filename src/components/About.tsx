import React from 'react';
import { Target, Rocket, Eye, Zap } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'Objetivo',
      description:
        'Laboratório de PD&I dedicado à investigação, desenvolvimento e inovação de soluções em geoenergias, com atuação em áreas como: Exploração e Produção de Energia, Carbon Capture, Utilization and Storage (CCUS), Segurança e Integridade de Poços, além de Modelagem e Simulação Geológica.',
    },
    {
      icon: Rocket,
      title: 'Missão',
      description:
        'Impulsionar o avanço do conhecimento e o desenvolvimento de tecnologias inovadoras no campo das geoenergias, contribuindo para a transição energética sustentável, a segurança e eficiência na exploração de recursos geológicos e a mitigação de impactos ambientais.',
    },
    {
      icon: Eye,
      title: 'Visão',
      description:
        'Consolidar-se como referência internacional em pesquisa, inovação e desenvolvimento tecnológico em geoenergia, promovendo a segurança energética, a sustentabilidade ambiental e a evolução das tecnologias de exploração e aproveitamento de recursos geológicos.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-lirge-darker via-lirge-teal/10 to-lirge-darker" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Sobre o <span className="text-lirge-cyan">LIRGE</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-lirge-cyan to-lirge-teal mx-auto mb-8" />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                O <strong className="text-lirge-cyan">Laboratório de Pesquisa Integrada em Geoenergia (LIRGE)</strong> é um centro de excelência vinculado à Universidade Federal do Pará (UFPA), dedicado ao desenvolvimento de pesquisas inovadoras na interseção entre geociências e energia.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Nossa missão é contribuir para o avanço do conhecimento científico e tecnológico no setor energético, promovendo soluções sustentáveis e formando profissionais altamente qualificados para enfrentar os desafios contemporâneos da geoenergia.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Com uma abordagem multidisciplinar, o LIRGE desenvolve projetos que abrangem desde pesquisas básicas até aplicações práticas, sempre alinhado com os mais altos padrões de qualidade acadêmica e relevância social.
              </p>
            </div>

            {/* Illustrative Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-lirge-cyan/20 to-lirge-teal/20 rounded-2xl p-8 border border-lirge-cyan/20">
                <img
                  src="https://images.pexels.com/photos/159775/oil-rig-sea-water-ocean-159775.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Pesquisa em Geoenergia"
                  loading="lazy"
                  className="w-full h-64 lg:h-80 object-cover rounded-xl"
                />
                <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-lirge-cyan rounded-full bg-lirge-darker/80 flex items-center justify-center">
                  <Zap className="text-lirge-cyan" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-wrap justify-center gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group w-full sm:w-[300px] max-w-sm"
              >
                <div className="h-full flex flex-col justify-between bg-gradient-to-br from-lirge-teal/20 to-lirge-cyan/20 rounded-xl p-6 border border-lirge-cyan/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-lirge-cyan to-lirge-teal rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed text-justify">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
