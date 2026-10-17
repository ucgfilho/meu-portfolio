import {Button} from "@/components/ui/button";
import {ArrowRight, Github, Linkedin, Mail} from "lucide-react";
import {GitLabIcon} from "@/components/icons/GitLabIcon";
import {useTranslation} from "react-i18next";
import {TerminalAnimation} from "@/components/TerminalAnimation";

/* =============================================================================
   HeroSection - Swiss Editorial Technical Design System
   - Balanced 12-column composition (7:5 ratio on desktop, clean stack on tablet/mobile)
   - Immediate visibility of critical identity and CTAs (no content hidden behind scroll/delay)
   - Accessible 44x44px social links and primary/secondary CTAs
   ============================================================================= */

export const HeroSection = () => {
    const {t} = useTranslation();

    const socialLinks = [
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
    ];

    return (
        <section className="min-h-[calc(100svh-4rem)] pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-center relative border-b border-border">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center max-w-6xl mx-auto">
                    {/* Left column — Identity & Actions */}
                    <div className="lg:col-span-7 flex flex-col items-start">
                        {/* Greeting */}
                        <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3">
                            {t("hero.greeting")}
                        </span>

                        {/* Name - Display Typography */}
                        <h1 className="text-display text-foreground mb-4">
                            {t("hero.name")}
                        </h1>

                        {/* Role Subtitle */}
                        <div className="flex items-center gap-3 mb-8">
                            <span aria-hidden="true" className="w-6 h-[2px] bg-foreground shrink-0"/>
                            <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 tracking-tight">
                                {t("hero.title")}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
                            <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
                                <a href="#projects" className="group">
                                    <span>{t("hero.viewProjects")}</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"/>
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                                <a href="#contact">
                                    <span>{t("hero.contact")}</span>
                                    <Mail className="w-4 h-4"/>
                                </a>
                            </Button>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2.5 pt-6 border-t border-border w-full sm:w-auto">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={t("hero.visitProfile", {platform: social.label})}
                                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm border border-border bg-surface-container text-muted-foreground hover:text-background hover:bg-foreground hover:border-foreground transition-colors duration-200 cursor-pointer"
                                >
                                    <social.icon className="w-4 h-4"/>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right column — Architectural Test Runner Console */}
                    <div className="lg:col-span-5 w-full max-w-lg lg:max-w-none mx-auto">
                        <TerminalAnimation/>
                    </div>
                </div>
            </div>
        </section>
    );
};

