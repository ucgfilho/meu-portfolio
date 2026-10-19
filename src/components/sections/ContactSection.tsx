import {ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone} from "lucide-react";
import {GitLabIcon} from "@/components/icons/GitLabIcon";
import {useTranslation} from "react-i18next";

/* =============================================================================
   ContactSection - Swiss Editorial Technical Design System
   - Asymmetric 12-column closing layout (5-col prompt & coordinates + 7-col channel directory)
   - Full untruncated email/descriptions & visible interactive indicators
   ============================================================================= */

export const ContactSection = () => {
    const {t} = useTranslation();

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

    return (
        <section id="contact" className="pt-20 md:pt-28 pb-12 relative">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Editorial Section Header */}
                    <div className="section-header-editorial">
                        <span className="section-index" aria-hidden="true">07 // CONTACT</span>
                        <h2 className="section-title">
                            {t("contact.title")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        {/* Left Column — Editorial Prompt & Direct Coordinates */}
                        <div className="lg:col-span-5 space-y-8">
                            <p className="text-lg text-foreground/90 leading-[1.7]">
                                {t("contact.description")}
                            </p>

                            <div className="space-y-3 pt-4 border-t border-border">
                                <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
                                    <span className="icon-container-sm shrink-0" aria-hidden="true">
                                        <Phone className="w-3.5 h-3.5 text-foreground"/>
                                    </span>
                                    <span>{t("contact.phone")}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="icon-container-sm shrink-0" aria-hidden="true">
                                        <MapPin className="w-3.5 h-3.5 text-foreground"/>
                                    </span>
                                    <span>{t("contact.location")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column — 2x2 Channel Directory */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-border rounded-lg overflow-hidden">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                    className="border-r border-b border-border p-6 bg-surface-container hover:bg-surface-elevated transition-colors duration-200 group flex flex-col justify-between gap-6 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between gap-4" aria-hidden="true">
                                        <div className="icon-container group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors duration-200">
                                            <link.icon className="w-4 h-4"/>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                                            {link.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground break-all sm:break-normal">
                                            {link.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Colophon */}
            <footer className="mt-20 pt-8 border-t border-border">
                <div className="container mx-auto">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="font-mono text-xs text-muted-foreground">
                            © {new Date().getFullYear()} Ubirajara Filho
                        </p>
                    </div>
                </div>
            </footer>
        </section>
    );
};

