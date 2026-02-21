import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {Menu, X} from "lucide-react";
import {useTranslation} from "react-i18next";
import {LanguageSwitcher} from "./LanguageSwitcher";

/* =============================================================================
   Navigation - Editorial High-End

   DESIGN:
   - Navbar minimalista e clean
   - Backdrop blur sutil quando scrollado
   - Transições suaves
   - Mobile menu elegante
   ============================================================================= */

export const Navigation = () => {
    const {t} = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        {label: t("nav.about"), href: "#about"},
        {label: t("nav.education"), href: "#education"},
        {label: t("nav.experience"), href: "#experience"},
        {label: t("nav.certifications"), href: "#certifications"},
        {label: t("nav.skills"), href: "#skills"},
        {label: t("nav.projects"), href: "#projects"},
        {label: t("nav.contact"), href: "#contact"},
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
                initial={{y: -100, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]}}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    isScrolled ? "py-4" : "py-6"
                }`}
            >
                {/* Background */}
                <div
                    className={`absolute inset-0 transition-all duration-300 ${
                        isScrolled
                            ? "bg-background/80 backdrop-blur-md border-b border-border"
                            : "bg-transparent"
                    }`}
                />

                <div className="container mx-auto px-6 flex items-center justify-center relative">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-background transition-colors duration-200 hover:bg-foreground"
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
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
                            <LanguageSwitcher/>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden absolute right-6 p-2 text-foreground hover:bg-foreground hover:text-background transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    pointerEvents: isMobileMenuOpen ? "auto" : "none",
                }}
                transition={{duration: 0.2}}
                className="fixed inset-0 z-30 md:hidden"
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{opacity: 0}}
                    animate={{opacity: isMobileMenuOpen ? 1 : 0}}
                />

                {/* Menu panel */}
                <motion.div
                    className="absolute inset-x-0 top-0 p-6 pt-24"
                    initial={{y: -20, opacity: 0}}
                    animate={{
                        y: isMobileMenuOpen ? 0 : -20,
                        opacity: isMobileMenuOpen ? 1 : 0,
                    }}
                    transition={{duration: 0.3, ease: "easeOut"}}
                >
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className="px-4 py-4 text-lg font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{opacity: 0, x: -20}}
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

                        {/* Language Switcher for Mobile */}
                        <div className="mt-4 px-4">
                            <LanguageSwitcher/>
                        </div>
                    </nav>
                </motion.div>
            </motion.div>
        </>
    );
};
