import {AnimatedBackground} from "@/components/AnimatedBackground";
import {Navigation} from "@/components/Navigation";
import {ScrollToTop} from "@/components/ScrollToTop";
import {HeroSection} from "@/components/sections/HeroSection";
import {AboutSection} from "@/components/sections/AboutSection";
import {ExperienceSection} from "@/components/sections/ExperienceSection";
import {SkillsSection} from "@/components/sections/SkillsSection";
import {ProjectsSection} from "@/components/sections/ProjectsSection";
import {EducationSection} from "@/components/sections/EducationSection";
import {LanguagesSection} from "@/components/sections/LanguagesSection";
import {ContactSection} from "@/components/sections/ContactSection";

const Index = () => {
    return (
        <div className="min-h-screen relative bg-background text-foreground">
            <AnimatedBackground/>
            <Navigation/>
            <ScrollToTop/>

            <main id="main-content">
                <HeroSection/>
                <AboutSection/>
                <ExperienceSection/>
                <SkillsSection/>
                <ProjectsSection/>
                <EducationSection/>
                <LanguagesSection/>
                <ContactSection/>
            </main>
        </div>
    );
};

export default Index;

