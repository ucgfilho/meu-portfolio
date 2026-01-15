import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { LanguagesSection } from "@/components/sections/LanguagesSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="min-h-screen relative">
          <AnimatedBackground />
          <ThemeToggle />
          <Navigation />
          
          <main>
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <ExperienceSection />
            <CertificationsSection />
            <SkillsSection />
            <ProjectsSection />
            <LanguagesSection />
            <ContactSection />
          </main>
        </div>
      )}
    </>
  );
};

export default Index;
