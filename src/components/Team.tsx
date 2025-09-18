import React, { useState, useRef, useEffect } from 'react';
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
      image: `${import.meta.env.BASE_URL}images/claudio.jpg`,
      linkedin: 'https://www.linkedin.com/in/cl%C3%A1udio-lucas-a7186020',
    },
    {
      name: 'Prof. Dr. Daniel Nobre Nunes da Sila',
      role: 'Vice-Coordenador',
      area: '-------------------------------------------------------',
      email: 'danielnobre@ufpa.br',
      image: `${import.meta.env.BASE_URL}images/daniel.jpg`,
      linkedin: 'https://www.linkedin.com/in/daniel-nobre-02856442/',
    },
  ];

  const students = [
    {
      name: 'Igor Alexandre Rocha Barreto',
      role: 'Doutorando',
      area: 'Mineralogia Aplicada',
      email: 'Igorbarreto@ufpa.br',
      image: `${import.meta.env.BASE_URL}images/igor.jpg`,
      linkedin: 'https://www.linkedin.com/in/igor-barreto-phd-405485104',
    },
    {
      name: 'João Rafael Barroso Sampaio da Silveira',
      role: 'Doutorando',
      area: 'Inteligência Artificial Aplicada à Geociências',
      email: 'joao.silveira@ig.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/joao.jpg`,
      linkedin: 'https://www.linkedin.com/in/joao-rafael-sampaio-da-silveira/',
    },
    {
      name: 'Jessica Nascimento Pereira',
      role: 'Mestranda',
      area: 'Mineralogia e Reatividade de Rochas Carbonáticas',
      email: 'jessica.pereira@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/jess.jpg`,
      linkedin: 'https://www.linkedin.com/in/jessica-pereira-engenhariadepetroleo',
    },
    {
      name: 'Paloma Andrade Rebouças',
      role: 'Bolsista IC',
      area: 'Análise Petrofísica e CCUS',
      email: 'paloma.reboucas@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/diego.png`,
      linkedin: 'http://www.linkedin.com/in/paloma-rebou%C3%A7as-386a02289',
    },
    {
      name: 'João Victor da Silva Fonseca',
      role: 'Bolsista IC',
      area: 'Análise Petrofísica e CCUS',
      email: 'joao.fonseca@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/joao.jpg`,
      linkedin: 'http://www.linkedin.com/in/jo%C3%A3o-victor58',
    },
    {
      name: 'Pedro Pantoja dos Santos',
      role: 'Bolsista IC',
      area: 'Análise Petrofísica e CCUS',
      email: 'natalino.souza@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/pantoja.jpg`,
      linkedin:
        'https://www.linkedin.com/in/pedro-pantoja-1aa566326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      name: 'Natalino da Silva Souza',
      role: 'Bolsista IC',
      area: 'Análise Petrofísica e CCUS',
      email: 'natalino.souza@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/natalino.jpg`,
      linkedin: 'http://www.linkedin.com/in/natalino-souza-a592851ab',
    },
    {
      name: 'Yasmin Yukari Ferreira Ishii',
      role: 'Bolsista IC',
      area: 'Introdução a Simulação Computacional',
      email: 'yasmin.ishii@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/yasmin.jpg`,
      linkedin: 'https://www.linkedin.com/in/yukari-ishii-99aa49369',
    },
    {
      name: 'Nathalya de Fátima de Lima do Vale',
      role: 'Bolsista IC',
      area: 'Introdução a Propriedades Petrofísicas',
      email: 'nathalya.vale@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/nath.jpg`,
      linkedin: 'http://www.linkedin.com/in/nathalya-vale-6bab02369',
    },
    {
      name: 'Sophia Macedo Pereira',
      role: 'Bolsista IC',
      area: 'Análise Petrofísica e CCUS',
      email: 'sophia.pereira@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/sophia.jpg`,
      linkedin:
        'https://www.linkedin.com/in/sophia-macedo-pereira-10643a1a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      name: 'Eliel Silva da Cruz',
      role: 'Bolsista IC',
      area: 'Avaliação de Formações',
      email: 'eliel.cruz@salinopolis.ufpa.br',
      image: `${import.meta.env.BASE_URL}images/eliel.jpg`,
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

  // 🔹 Auto Scroll a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section
      id="team"
      className="py-20 lg:py-32 relative bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#04363e] dark:text-white">
              Nossa <span className="text-lirge-cyan">Equipe</span>
            </h2>
            <div className="w-24 h-1 bg-lirge-cyan mx-auto mb-8" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Conheça os pesquisadores e bolsistas que fazem do LIRGE um centro de excelência em
              pesquisa e inovação.
            </p>
          </div>

          {/* Coordinators */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-cyan-700 dark:text-lirge-cyan">
              Coordenação
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coordinators.map((coord) => (
                <div key={coord.name} className="group">
                  <div
                    className="bg-gradient-to-br
                      from-[#7bc3cf]
                      to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:bg-gradient-to-br
                    dark:from-lirge-teal/20
                    dark:to-lirge-cyan/20
                    dark:border-lirge-cyan/20
                    transition-colors duration-300 rounded-2xl p-6"
                  >
                    <div className="relative mb-6">
                      <a
                        href={coord.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-cyan-700 dark:border-lirge-cyan/50"
                      >
                        <img
                          src={coord.image}
                          alt={coord.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#04363e] dark:bg-gradient-to-r dark:from-lirge-cyan dark:to-lirge-teal rounded-full flex items-center justify-center">
                        <GraduationCap size={16} className="text-cyan-50 dark:text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-[#04363e] dark:text-white mb-2">
                        {coord.name}
                      </h4>
                      <p className="text-cyan-700 dark:text-lirge-cyan font-semibold mb-2">
                        {coord.role}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{coord.area}</p>
                      <button
                        onClick={() => copyEmail(coord.email)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-[#04363e] dark:bg-lirge-teal/30 rounded-full text-sm text-cyan-50 dark:text-white"
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
            <h3 className="text-2xl font-bold text-center mb-8 text-cyan-700 dark:text-lirge-cyan">
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
                    className="
                    bg-gradient-to-br
                      from-[#7bc3cf]
                      to-[#7bc3cf]
                    border border-[#81D4FA]
                    dark:bg-gradient-to-br
                    dark:from-lirge-teal/20
                    dark:to-lirge-cyan/20
                    dark:border-lirge-cyan/20
                    transition-colors duration-300
                  "
                  >
                    <div className="flex flex-col items-center text-center">
                      <a
                        href={students[currentSlide].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-700 dark:border-lirge-cyan/40 mb-4"
                      >
                        <img
                          src={students[currentSlide].image}
                          alt={students[currentSlide].name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <h4 className="text-lg font-semibold text-[#04363e] dark:text-white mb-1">
                        {students[currentSlide].name}
                      </h4>
                      <p className="text-cyan-700 dark:text-lirge-cyan text-sm font-medium mb-2">
                        {students[currentSlide].role}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        {students[currentSlide].area}
                      </p>
                      <button
                        onClick={() => copyEmail(students[currentSlide].email)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#04363e] dark:bg-lirge-teal/30 rounded-full text-sm text-cyan-50 dark:text-white border border-cyan-700 dark:border-lirge-cyan/30"
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
                  className="p-3 bg-[#7bc3cf] border border-cyan-700 rounded-full dark:bg-lirge-teal/20 dark:border-lirge-cyan/20 transition-colors duration-200"
                >
                  <ChevronLeft className="text-cyan-700" size={20} />
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
                  className="p-3 bg-[#7bc3cf] border border-cyan-700 rounded-full dark:bg-lirge-teal/20 dark:border-lirge-cyan/20 transition-colors duration-200"
                >
                  <ChevronRight className="text-cyan-700" size={20} />
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
