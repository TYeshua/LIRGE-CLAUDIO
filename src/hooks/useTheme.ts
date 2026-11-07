import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// O index.html já aplica a classe "dark" antes da primeira pintura;
// o estado inicial parte dela para não haver troca de tema ao carregar.
const initialTheme = (): Theme =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* armazenamento indisponível: o tema vale só para esta visita */
    }
  }, [theme]);

  return { theme, setTheme };
}
