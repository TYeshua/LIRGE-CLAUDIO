import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const Team: React.FC = () => {
  const ref = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const coordinators = [
    {
      name: 'Prof. Dr. Cláudio Regis S. Lucas',
      role: 'Coordenador Geral',
      area: '-------------------------------------------------------',
      email: 'claudiolucas@ufpa.br',
      image: `${import.meta.env.BASE_URL}images/claudio.png`,
      linkedin: 'https://www.linkedin.com/in/cl%C3%A1udio-lucas-a7186020',
    },
    {
      name: 'Prof. Dr. Daniel Nobre Nunes da Sila',
      role: 'Vice-Coordenador',
      area: '-------------------------------------------------------',
      email: 'danielnobre@ufpa.br',
      image: `${import.meta.env.BASE_URL}images/daniel.png`,
      linkedin: 'https://www.linkedin.com/in/daniel-nobre-02856442/',
    },
  ];

  const students = [
    {
      name: 'Igor Alexandre Rocha Barreto',
      role: 'Doutorando',
      area: '-------------------------------------------------------',
      email: 'Igorbarreto@ufpa.br',
      image: `${import.meta.env.BASE_URL}images/ana.png`,
      linkedin: 'https://www.linkedin.com/in/igor-barreto-phd-405485104',
    },
    {
      name: 'João Rafael Barroso Sampaio da Silveira',
      role: 'Doutorando',
      area: '-------------------------------------------------------',
      email: 'joao.silveira@ig.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/carlos.png`,
      linkedin: 'https://www.linkedin.com/in/joao-rafael-sampaio-da-silveira/',
    },
    {
      name: 'Jessica Nascimento Pereira',
      role: 'Mestranda',
      area: '-------------------------------------------------------',
      email: 'jessica.pereira@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/beatriz.png`,
      linkedin: 'https://www.linkedin.com/in/jessica-pereira-engenhariadepetroleo',
    },
    {
      name: 'Paloma Andrade Rebouças',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'paloma.reboucas@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/diego.png`,
      linkedin: 'http://www.linkedin.com/in/paloma-rebou%C3%A7as-386a02289',
    },
    {
      name: 'João Victor da Silva Fonseca',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'joao.fonseca@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/fernanda.png`,
      linkedin: 'http://www.linkedin.com/in/jo%C3%A3o-victor58',
    },
    {
      name: 'Pedro Pantoja dos Santos',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'natalino.souza@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/gabriel.png`,
      linkedin: 'http://www.linkedin.com/in/natalino-souza-a592851ab',
    },
    {
      name: 'Natalino da Silva Souza',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'natalino.souza@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/gabriel.png`,
      linkedin: 'http://www.linkedin.com/in/natalino-souza-a592851ab',
    },
    {
      name: 'Yasmin Yukari Ferreira Ishii',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'yasmin.ishii@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/gabriel.png`,
      linkedin: 'http://linkedin.com/in/yukari-ishii-999aa49369',
    },
    {
      name: 'Nathalya de Fátima de Lima do Vale',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'nathalya.vale@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/gabriel.png`,
      linkedin: 'http://www.linkedin.com/in/nathalya-vale-6bab02369',
    },
    {
      name: 'Sophia Macedo Pereira',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'sophia.pereira@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/gabriel.png`,
      linkedin:
        'https://www.linkedin.com/in/sophia-macedo-pereira-10643a1a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      name: 'Eliel Silva da Cruz',
      role: 'Bolsista IC',
      area: '-------------------------------------------------------',
      email: 'eliel.cruz@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/gabriel.png`,
      linkedin:
        'https://www.linkedin.com/in/eliel-silva-8662b023b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
  ];

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % students.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + students.length) % students.length);
  };

  return (
    <section id="team" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-lirge-darker via-lirge-teal/10 to-lirge-darker" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Nossa <span className="text-lirge-cyan">Equipe</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-lirge-cyan to-lirge-teal mx-auto mb-8" />
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Conheça os pesquisadores e bolsistas que fazem do LIRGE um centro de
              excelência em pesquisa e inovação.
            </p>
          </div>

          {/* Coordinators */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-lirge-cyan">
              Coordenação
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coordinators.map((coord) => (
                <div key={coord.name} className="group">
                  <div className="bg-gradient-to-br from-lirge-teal/20 to-lirge-cyan/20 rounded-2xl p-6 border-2 border-lirge-cyan/30">
                    <div className="relative mb-6">
                      <a
                        href={coord.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-lirge-cyan/50"
                      >
                        <img
                          src={coord.image}
                          alt={coord.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-lirge-cyan to-lirge-teal rounded-full flex items-center justify-center">
                        <GraduationCap size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{coord.name}</h4>
                      <p className="text-lirge-cyan font-semibold mb-2">{coord.role}</p>
                      <p className="text-gray-300 text-sm mb-4">{coord.area}</p>
                      <button
                        onClick={() => copyEmail(coord.email)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-lirge-teal/30 rounded-full text-sm text-white"
                      >
                        <Mail size={16} />
                        <span>{coord.email}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students Carousel */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-lirge-cyan">
              Pesquisadores e Bolsistas
            </h3>

            <div className="relative max-w-3xl mx-auto">
              <div className="overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-lirge-teal/10 to-lirge-cyan/10 border border-lirge-cyan/20 p-6"
                  >
                    <div className="flex flex-col items-center text-center">
                      <a
                        href={students[currentSlide].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-24 h-24 rounded-full overflow-hidden border-4 border-lirge-cyan/40 mb-4"
                      >
                        <img
                          src={students[currentSlide].image}
                          alt={students[currentSlide].name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {students[currentSlide].name}
                      </h4>
                      <p className="text-lirge-cyan text-sm font-medium mb-2">
                        {students[currentSlide].role}
                      </p>
                      <p className="text-gray-300 text-sm mb-4">{students[currentSlide].area}</p>
                      <button
                        onClick={() => copyEmail(students[currentSlide].email)}
                        className="flex items-center space-x-2 px-4 py-2 bg-lirge-teal/30 rounded-full text-sm text-white border border-lirge-cyan/30"
                      >
                        <Mail size={16} />
                        <span>{students[currentSlide].email}</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-lirge-teal/20 border border-lirge-cyan/20 rounded-full"
                >
                  <ChevronLeft className="text-lirge-cyan" size={20} />
                </button>

                <div className="flex space-x-2">
                  {students.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentSlide ? 'bg-lirge-cyan' : 'bg-lirge-cyan/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-3 bg-lirge-teal/20 border border-lirge-cyan/20 rounded-full"
                >
                  <ChevronRight className="text-lirge-cyan" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
