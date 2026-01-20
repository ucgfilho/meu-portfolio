import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/* =============================================================================
   Navigation - Material 3 Expressive
   
   DESIGN:
   - Top App Bar seguindo M3 guidelines
   - Glass effect com backdrop blur quando scrollado
   - Links com underline indicator no hover (M3 navigation)
   
   ACESSIBILIDADE:
   - Menu mobile acessível por teclado
   - Focus states visíveis
   - Aria labels para botões
   ============================================================================= */

const navItems = [
  { label: "Sobre", href: "#about" },
  { label: "Formação", href: "#education" },
  { label: "Experiência", href: "#experience" },
  { label: "Certificações", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* M3 Top App Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-m3-emphasized ${
          isScrolled
            ? "glass-card shadow-elevation-2 py-3"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo/Brand - M3 Title Large */}
          <motion.a
            href="#"
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Meu Portfólio
          </motion.a>

          {/* Desktop Navigation - M3 Navigation Rail style adapted */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 rounded-xl hover:bg-primary/8 group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, ease: [0, 0, 0, 1] }}
              >
                {item.label}
                {/* M3 Active indicator */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-m3-emphasized group-hover:w-4" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-foreground hover:bg-primary/8 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - M3 Navigation Drawer style */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 z-30 md:hidden"
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="absolute right-0 top-0 bottom-0 w-72 bg-surface-container p-6 pt-24 shadow-elevation-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/8 rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : 20,
                }}
                transition={{ delay: isMobileMenuOpen ? 0.1 * index : 0 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};
