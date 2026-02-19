import {lazy, Suspense} from "react";
import {AnimatedBackground} from "@/components/AnimatedBackground";
import {Navigation} from "@/components/Navigation";
import {ScrollToTop} from "@/components/ScrollToTop";

const HeroSection = lazy(() =>
    import("@/components/sections/HeroSection").then((module) => ({
        default: module.HeroSection,
    })),
);
const AboutSection = lazy(() =>
    import("@/components/sections/AboutSection").then((module) => ({
        default: module.AboutSection,
    })),
);
const EducationSection = lazy(() =>
    import("@/components/sections/EducationSection").then((module) => ({
        default: module.EducationSection,
    })),
);
const ExperienceSection = lazy(() =>
    import("@/components/sections/ExperienceSection").then((module) => ({
        default: module.ExperienceSection,
    })),
);
const CertificationsSection = lazy(() =>
    import("@/components/sections/CertificationsSection").then((module) => ({
        default: module.CertificationsSection,
    })),
);
const SkillsSection = lazy(() =>
    import("@/components/sections/SkillsSection").then((module) => ({
        default: module.SkillsSection,
    })),
);
const ProjectsSection = lazy(() =>
    import("@/components/sections/ProjectsSection").then((module) => ({
        default: module.ProjectsSection,
    })),
);
const LanguagesSection = lazy(() =>
    import("@/components/sections/LanguagesSection").then((module) => ({
        default: module.LanguagesSection,
    })),
);
const ContactSection = lazy(() =>
    import("@/components/sections/ContactSection").then((module) => ({
        default: module.ContactSection,
    })),
);

const Index = () => {
    // Aplicar tema dark
    if (typeof document !== "undefined") {
        document.documentElement.classList.add("dark");
    }

    return (
        <div className="min-h-screen relative">
            <AnimatedBackground/>
            <Navigation/>
            <ScrollToTop/>

            <main>
                <Suspense
                    fallback={<div className="sr-only">Carregando seções...</div>}
                >
                    <HeroSection/>
                    <AboutSection/>
                    <EducationSection/>
                    <ExperienceSection/>
                    <CertificationsSection/>
                    <SkillsSection/>
                    <ProjectsSection/>
                    <LanguagesSection/>
                    <ContactSection/>
                </Suspense>
            </main>
        </div>
    );
};

export default Index;
