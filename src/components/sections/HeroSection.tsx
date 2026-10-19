import {Button} from "@/components/ui/button";
import {ArrowRight, Github, Linkedin, Mail} from "lucide-react";
import {GitLabIcon} from "@/components/icons/GitLabIcon";
import {useTranslation} from "react-i18next";
import {HorizonBloom} from "@/components/HorizonBloom";

/* =============================================================================
   HeroSection - Swiss Editorial Technical Design System
   - Centered composition over Horizon Bloom planetary sunrise background
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
        <section className="relative overflow-hidden">
            <HorizonBloom
                colors={["#FF9FFC", "#5227FF"]}
                horizon={0.72}
                curvature={1}
                tilt={0}
                sunPosition={0.15}
                sunrise={1}
                spread={0.4}
                atmosphere={1}
                thickness={1}
                rim={1}
                flare={1}
                airglow={0.5}
                clouds={0.5}
                stars={0.5}
                aurora={1}
                speed={0.5}
                drift={0.5}
                parallax={0.5}
                bloom={0.5}
                grain={0.25}
                interactive
                intro
                className="min-h-[calc(100svh-4rem)]"
            >
                <div className="min-h-[calc(100svh-4rem)] pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-center">
                    <div className="container mx-auto">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                            {/* Greeting */}
                            <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground mb-3">
                                {t("hero.greeting")}
                            </span>

                            {/* Name - Display Typography */}
                            <h1 className="text-display text-foreground mb-4">
                                {t("hero.name")}
                            </h1>

                            {/* Role Subtitle */}
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <span aria-hidden="true" className="w-6 h-[2px] bg-foreground shrink-0"/>
                                <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 tracking-tight">
                                    {t("hero.title")}
                                </p>
                                <span aria-hidden="true" className="w-6 h-[2px] bg-foreground shrink-0"/>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 w-full sm:w-auto">
                                <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
                                    <a href="#projects" className="group">
                                        <span>{t("hero.viewProjects")}</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true"/>
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                                    <a href="#contact">
                                        <span>{t("hero.contact")}</span>
                                        <Mail className="w-4 h-4" aria-hidden="true"/>
                                    </a>
                                </Button>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center justify-center gap-2.5 w-full sm:w-auto">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={t("hero.visitProfile", {platform: social.label})}
                                        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-border bg-surface-container/80 backdrop-blur-sm text-muted-foreground hover:text-background hover:bg-foreground hover:border-foreground transition-colors duration-200 cursor-pointer"
                                    >
                                        <social.icon className="w-4 h-4" aria-hidden="true"/>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </HorizonBloom>

            {/* Bottom fade to blend seamlessly with the section below without any border/separation */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-[2]"
            />
        </section>
    );
};
