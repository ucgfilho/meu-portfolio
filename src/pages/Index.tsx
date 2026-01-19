import { lazy, Suspense, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";

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
            <Suspense
              fallback={<div className="sr-only">Carregando seções...</div>}
            >
              <HeroSection />
              <AboutSection />
              <EducationSection />
              <ExperienceSection />
              <CertificationsSection />
              <SkillsSection />
              <ProjectsSection />
              <LanguagesSection />
              <ContactSection />
            </Suspense>
          </main>
        </div>
      )}
    </>
  );
};

export default Index;
