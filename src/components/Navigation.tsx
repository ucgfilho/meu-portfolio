import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

/* =============================================================================
   Navigation - iOS 26 Liquid Glass
   
   DESIGN:
   - Navbar com glassmorphism pesado
   - Blur de 40px quando scrollado
   - Bordas de luz sutis
   - Animações spring para interações
   ============================================================================= */

export const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.education"), href: "#education" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.certifications"), href: "#certifications" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Liquid Glass Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-6 bg-transparent"
        }`}
      >
        {/* Glass effect container */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled
              ? "backdrop-blur-glass bg-background/60 border-b border-white/[0.08]"
              : ""
          }`}
          style={{
            boxShadow: isScrolled
              ? "inset 0 -1px 0 0 hsl(0 0% 100% / 0.05), 0 4px 30px -10px hsl(0 0% 0% / 0.3)"
              : "none",
          }}
        />

        <div className="container mx-auto px-6 flex items-center justify-center relative">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full group"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 * index,
                  duration: 0.3,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Hover background - glass effect */}
                <span className="absolute inset-0 rounded-full bg-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="relative">{item.label}</span>
              </motion.a>
            ))}

            {/* Language Switcher */}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden absolute right-6 p-2 rounded-2xl text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 rounded-2xl bg-white/[0.05]" />
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Liquid Glass style */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{
          duration: 0.3,
        }}
        className="fixed inset-0 z-30 md:hidden"
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        {/* Backdrop with heavy blur */}
        <motion.div
          className="absolute inset-0 backdrop-blur-glass bg-background/80"
          onClick={() => setIsMobileMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        />

        {/* Menu panel */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-80 p-6 pt-24"
          style={{
            background: "hsl(var(--background) / 0.9)",
            backdropFilter: "blur(60px)",
            borderLeft: "1px solid hsl(0 0% 100% / 0.08)",
            boxShadow:
              "inset 1px 0 0 0 hsl(0 0% 100% / 0.05), -20px 0 60px -20px hsl(0 0% 0% / 0.5)",
          }}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative px-5 py-4 text-lg font-medium text-foreground rounded-2xl overflow-hidden group"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : 20,
                }}
                transition={{
                  delay: isMobileMenuOpen ? 0.05 * index : 0,
                  duration: 0.25,
                }}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover glass effect */}
                <span className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="relative">{item.label}</span>
              </motion.a>
            ))}

            {/* Language Switcher for Mobile */}
            <div className="mt-4 px-5">
              <LanguageSwitcher />
            </div>
          </nav>
        </motion.div>
      </motion.div>
    </>
  );
};
