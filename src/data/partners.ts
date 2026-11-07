const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export interface Partner {
  name: string;
  logo: string;
  /** Nome escrito abaixo do logotipo, quando a marca não traz o nome */
  caption?: string;
}

// Instituições parceiras e apoiadoras, na ordem em que aparecem no site.
export const partners: Partner[] = [
  { name: "Petrobras", logo: img("petrobras.png") },
  { name: "ANP – Agência Nacional do Petróleo", logo: img("Anp.png") },
  { name: "CAPES", logo: img("capes.png") },
  { name: "FAPESPA – Fundação Amazônia de Amparo a Estudos e Pesquisas", logo: img("fapespa.png") },
  { name: "PetroReconcavo", logo: img("Petroreconcavo.png") },
  { name: "Geowellex", logo: img("geowellex.png") },
  { name: "UFPA – Universidade Federal do Pará", logo: img("ufpa.png") },
  { name: "PROPESP – Pró-Reitoria de Pesquisa e Pós-Graduação da UFPA", logo: img("propesq.png") },
  { name: "PPGG – Programa de Pós-Graduação em Geologia e Geoquímica", logo: img("PPGG.png") },
  { name: "PRH-15 ANP/UFPA", logo: img("PRH-15.png") },
  { name: "FADESP – Fundação de Amparo e Desenvolvimento da Pesquisa", logo: img("fadesp.jpeg") },
  { name: "DAP/PROAD – UFPA", logo: img("DAP_UFPA.jpg") },
  { name: "LEAR", logo: img("LEAR.png") },
  { name: "GSED – Grupo de Análise de Bacias Sedimentares da Amazônia", logo: img("GSED.png") },
  { name: "LabCim – Laboratório de Cimentos (UFRN)", logo: img("LABCIM.png") },
  { name: "LASPORO", logo: img("web/LASPORO.webp") },
  { name: "LCM – Laboratório de Caracterização Mineral (UFPA)", logo: img("LCM.png") },
  { name: "LPSA – Laboratório de Petrossísmica Sustentável da Amazônia", logo: img("LPSA.jpg") },
  { name: "LCPetro – Laboratório de Ciência e Engenharia de Petróleo e Energia", logo: img("lcpetro.jpeg") },
  {
    name: "Laboratório de Física Industrial",
    logo: img("web/fisica-industrial.webp"),
    caption: "Laboratório de Física Industrial",
  },
];
