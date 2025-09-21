import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => void;
    };
  }
}

const VLibrasToggle: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const loadVLibras = () => {
    const script = document.createElement("script");
    script.id = "vlibras-plugin";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;

    script.onload = () => {
      // Aguarda o DOM estar pronto
      setTimeout(() => {
        if (window.VLibras) {
          new window.VLibras.Widget("https://vlibras.gov.br/app");
          setIsActive(true);
        }
      }, 500); // tempo suficiente para o React montar os elementos
    };

    document.body.appendChild(script);
  };

  const removeVLibras = () => {
    document.getElementById("vlibras-plugin")?.remove();
    document.querySelector(".vlibras")?.remove();
    setIsActive(false);
  };

  const toggleVLibras = () => {
    isActive ? removeVLibras() : loadVLibras();
  };

  useEffect(() => {
    loadVLibras(); // Ativa VLibras ao carregar o site
  }, []);

  return (
    <button
      onClick={toggleVLibras}
      className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-lirge-cyan text-white text-sm shadow-lg hover:bg-cyan-600 transition-all"
      aria-label="Alternar VLibras"
    >
      {isActive ? "Desativar Libras" : "Ativar Libras"}
    </button>
  );
};

export default VLibrasToggle;