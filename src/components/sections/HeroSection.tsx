import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {ArrowRight, Github, Linkedin, Mail} from "lucide-react";
import {GitLabIcon} from "@/components/icons/GitLabIcon";
import {useTranslation} from "react-i18next";
import {TypewriterText} from "@/components/TypewriterText";

/* =============================================================================
   HeroSection - Editorial High-End
   
   DESIGN:
   - Tipografia display gigante e impactante
   - Layout minimalista com muito respiro
   - Animações sutis de fade-in
   - Contraste forte entre texto e fundo
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
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl"
                >
                    {/* Status badge */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="status-badge">
                            <span className="status-dot"/>
                            <span className="text-sm tracking-wide">
                {t("hero.availableStatus")}
              </span>
                        </div>
                    </motion.div>

                    {/* Nome - Display Typography */}
                    <motion.div variants={itemVariants} className="mb-6">
            <span className="block text-muted-foreground text-lg md:text-xl tracking-wide mb-2">
              <TypewriterText text={t("hero.greeting")} speed={25} startDelay={200}/>
            </span>
                        <h1 className="text-display text-foreground">
                            <TypewriterText text={t("hero.name")} speed={30} startDelay={600}/>
                        </h1>
                    </motion.div>

                    {/* Título */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-3xl lg:text-4xl font-medium text-accent mb-6 tracking-tight"
                    >
                        <TypewriterText text={t("hero.title")} speed={20} startDelay={1200}/>
                    </motion.h2>

                    {/* Descrição */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
                    >
                        <TypewriterText text={t("hero.description")} speed={10} startDelay={1600}/>
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
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1.5, duration: 0.8}}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <a href="#about" className="scroll-indicator group">
          <span
              className="text-xs font-medium tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
            {t("hero.scrollDown")}
          </span>
                    <div className="scroll-indicator-line"/>
                </a>
            </motion.div>
        </section>
    );
};
