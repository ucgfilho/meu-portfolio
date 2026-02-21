import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {ArrowRight, Github, Linkedin, Mail} from "lucide-react";
import {GitLabIcon} from "@/components/icons/GitLabIcon";
import {useTranslation} from "react-i18next";
import {TerminalAnimation} from "@/components/TerminalAnimation";

/* =============================================================================
   HeroSection - Editorial High-End

   DESIGN:
   - Tipografia display gigante e impactante
   - Layout minimalista com muito respiro
   - Animações sutis de fade-in
   - Contraste forte entre texto e fundo
   - Terminal animation on the right for visual impact
   ============================================================================= */

export const HeroSection = () => {
    const {t} = useTranslation();

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <section className="min-h-[100svh] flex flex-col justify-center relative overflow-hidden">
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
                    {/* Left column — text content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl md:max-w-none"
                    >
                        {/* Nome - Display Typography */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <span className="block text-muted-foreground text-lg md:text-xl tracking-wide mb-2">
                                {t("hero.greeting")}
                            </span>
                            <h1 className="text-display text-foreground">
                                {t("hero.name")}
                            </h1>
                        </motion.div>

                        {/* Título */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl md:text-3xl lg:text-4xl font-medium text-accent mb-6 tracking-tight"
                        >
                            {t("hero.title")}
                        </motion.h2>

                        {/* Descrição */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
                        >
                            {t("hero.description")}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
                        >
                            <Button variant="default" size="lg" asChild>
                                <a href="#projects" className="group">
                                    {t("hero.viewProjects")}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="#contact">
                                    {t("hero.contact")}
                                    <Mail className="w-4 h-4"/>
                                </a>
                            </Button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-3"
                        >
                            {[
                                {
                                    icon: Linkedin,
                                    href: "https://www.linkedin.com/in/ucgfilho/",
                                    label: "LinkedIn",
                                },
                                {
                                    icon: Github,
                                    href: "https://github.com/ucgfilho",
                                    label: "GitHub",
                                },
                                {
                                    icon: GitLabIcon,
                                    href: "https://gitlab.com/ucgfilho",
                                    label: "GitLab",
                                },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={t("hero.visitProfile", {platform: social.label})}
                                    className="p-3 rounded-xl text-muted-foreground hover:text-background hover:bg-foreground transition-all duration-200"
                                >
                                    <social.icon className="w-5 h-5"/>
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right column — Terminal */}
                    <motion.div
                        initial={{opacity: 0, x: 40}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94]}}
                        className="hidden md:flex self-center w-full max-w-[480px]"
                    >
                        <TerminalAnimation/>
                    </motion.div>
                </div>
            </div>


        </section>
    );
};
