import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * ThemeToggle - Botão M3 para alternar entre modo claro/escuro
 *
 * ACESSIBILIDADE:
 * - Aria-label descritivo para leitores de tela
 * - Contraste adequado em ambos os modos
 * - Feedback visual claro do estado atual
 */
export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Define dark mode como padrão
    document.documentElement.classList.add("dark");
    // Atualiza meta theme-color para mobile
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", "#0F1419");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");

    // Atualiza meta theme-color para mobile
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", newIsDark ? "#0F1419" : "#F8FAFC");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass-card border border-border/50 hover:border-primary/50 transition-all duration-75 ease-m3-emphasized"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-secondary" />
        ) : (
          <Moon className="w-5 h-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};
