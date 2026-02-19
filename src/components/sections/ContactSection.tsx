import {motion, useInView} from "framer-motion";
import {useRef} from "react";
import {ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone,} from "lucide-react";
import {GitLabIcon} from "@/components/icons/GitLabIcon";
import {useTranslation} from "react-i18next";
import {TypewriterText} from "@/components/TypewriterText";

/* =============================================================================
   ContactSection - Editorial High-End
   
   DESIGN:
   - Layout centralizado com tipografia elegante
   - Cards de contato minimalistas com hover sutil
   - Footer discreto integrado
   ============================================================================= */

export const ContactSection = () => {
    const {t} = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    const contactLinks = [
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/ucgfilho/",
            icon: Linkedin,
            description: t("contact.linkedinDescription"),
        },
        {
            name: "GitHub",
            href: "https://github.com/ucgfilho",
            icon: Github,
            description: t("contact.githubDescription"),
        },
        {
            name: "GitLab",
            href: "https://gitlab.com/ucgfilho",
            icon: GitLabIcon,
            description: t("contact.gitlabDescription"),
        },
        {
            name: "Email",
            href: "mailto:ucgf.profissional@gmail.com",
            icon: Mail,
            description: t("contact.emailDescription"),
        },
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: 0.08},
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94]},
        },
    };

    return (
        <section id="contact" className="py-24 md:py-32 relative" ref={ref}>
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Section header */}
                    <motion.div
                        variants={itemVariants}
                        className="section-header justify-center"
                    >
            <span className="section-label">
                <TypewriterText text={t("contact.title")} speed={20} enabled={isInView}/>
              </span>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        <TypewriterText text={t("contact.description")} speed={8} startDelay={200} enabled={isInView}/>
                    </motion.p>

                    {/* Contact info chips */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-3 mb-14"
                    >
                        <div className="chip-outline inline-flex items-center gap-2">
                            <Phone className="w-4 h-4 text-accent"/>
                            <span>{t("contact.phone")}</span>
                        </div>
                        <div className="chip-outline inline-flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent"/>
                            <span>{t("contact.location")}</span>
                        </div>
                    </motion.div>

                    {/* Contact links grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {contactLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                aria-label={t("contact.openLink", {platform: link.name})}
                                variants={itemVariants}
                                className="card-interactive p-6 text-center group"
                            >
                                {/* Icon */}
                                <div
                                    className="icon-container mx-auto mb-4 group-hover:bg-accent/15 group-hover:border-accent/30 transition-colors duration-200">
                                    <link.icon
                                        className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-200"/>
                                </div>

                                <h3 className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors duration-200">
                                    {link.name}
                                </h3>
                                <p className="text-xs text-muted-foreground truncate">
                                    {link.description}
                                </p>

                                {/* Arrow indicator */}
                                <ArrowUpRight
                                    className="w-4 h-4 text-muted-foreground mx-auto mt-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"/>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mt-24 pt-8 border-t border-border"
            >
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Ubirajara Filho
                    </p>
                </div>
            </motion.footer>
        </section>
    );
};
