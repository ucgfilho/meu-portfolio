import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

/* =============================================================================
   Navigation - Editorial High-End

   DESIGN:
   - Navbar minimalista e clean
   - Backdrop blur sutil quando scrollado
   - Transições suaves
   - Mobile menu elegante
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
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled
              ? "bg-background/55 backdrop-blur-xl border-b border-border/70 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
              : "bg-background/30 backdrop-blur-md border-b border-border/40"
          }`}
        />

        <div className="container mx-auto px-6 flex items-center justify-center relative">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="px-2.5 lg:px-3 xl:px-4 py-2 text-sm font-medium text-foreground/80 hover:text-background transition-colors duration-200 hover:bg-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.05,
                  duration: 0.4,
                }}
              >
                {item.label}
              </motion.a>
            ))}

            {/* Language Switcher */}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Right actions: Download CV & Mobile Menu Button */}
          <div className="absolute right-6 flex items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1xCiolo4vc35d92N6LmUeDl9VOH6U4TWS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 bg-white text-black text-xs md:text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-sm"
              aria-label={t("nav.downloadCv")}
            >
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{t("nav.downloadCv")}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:bg-foreground hover:text-background transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-30 md:hidden"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/95 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        />

        {/* Menu panel */}
        <motion.div
          className="absolute inset-x-0 top-0 p-6 pt-24"
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: isMobileMenuOpen ? 0 : -20,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="px-4 py-4 text-lg font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{
                  delay: isMobileMenuOpen ? 0.1 + index * 0.05 : 0,
                  duration: 0.3,
                }}
              >
                {item.label}
              </motion.a>
            ))}

            {/* Download CV Button for Mobile */}
            <div className="mt-4 px-4">
              <a
                href="https://drive.google.com/file/d/1xCiolo4vc35d92N6LmUeDl9VOH6U4TWS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-sm"
                aria-label={t("nav.downloadCv")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                <span>{t("nav.downloadCv")}</span>
              </a>
            </div>

            {/* Language Switcher for Mobile */}
            <div className="mt-2 px-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </motion.div>
      </motion.div>
    </>
  );
};
