import {
  BarChart3,
  ClipboardList,
  Code2,
  Gauge,
  GitBranch,
  Cloud,
  Database,
  FileSearch,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  SiCypress,
  SiGit,
  SiGithub,
  SiDocker,
  SiGithubactions,
  SiPostman,
  SiJunit5,
  SiAppium,
  SiRobotframework,
  SiMysql,
  SiGitlab,
  SiJavascript,
  SiTypescript,
  SiPuppeteer,
  SiDotnet,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { LogoLoop } from "../LogoLoop";

/* =============================================================================
   SkillsSection - Swiss Editorial Technical Design System
   - Unified border-collapsed specification matrix instead of uneven floating cards
   - Monospaced technical tags & framed technology marquee
   ============================================================================= */

export const SkillsSection = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t("skills.backendDevelopment"),
      icon: Code2,
      skills: ["C#", ".NET", "ASP.NET", "TypeScript"],
    },
    {
      title: t("skills.browserAutomation"),
      icon: Wrench,
      skills: ["Puppeteer", "Playwright"],
    },
    {
      title: t("skills.cloudPersistence"),
      icon: Cloud,
      skills: ["Amazon Web Services"],
    },
    {
      title: t("skills.documentProcessing"),
      icon: FileSearch,
      skills: ["AWS Textract", "PyTesseract", "Tesseract OCR"],
    },
    {
      title: t("skills.dataOrchestration"),
      icon: Database,
      skills: ["PostgreSQL", "MySQL"],
    },
    {
      title: t("skills.qualityEngineering"),
      icon: Gauge,
      skills: ["Cypress", "Selenium", "Appium", "Robot Framework", "Jest", "k6", "Postman"],
    },
    {
      title: t("skills.devops"),
      icon: GitBranch,
      skills: ["Git", "GitHub Actions", "GitLab CI/CD", "Docker"],
    },
    {
      title: t("skills.automatedReports"),
      icon: BarChart3,
      skills: ["Mochawesome", "JUnit", "Allure"],
    },
    {
      title: t("skills.testManagement"),
      icon: ClipboardList,
      skills: ["Xray"],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-28 relative border-b border-border">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Section Header */}
          <div className="section-header-editorial">
            <span className="section-index" aria-hidden="true">03 // CAPABILITIES</span>
            <h2 className="section-title">{t("skills.title")}</h2>
          </div>

          {/* Unified Architectural Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {skillCategories.map((category, idx) => (
              <div
                key={category.title}
                className="border-r border-b border-border p-6 lg:p-7 bg-surface/50 hover:bg-surface-container transition-colors duration-200 flex flex-col justify-between gap-6"
              >
                {/* Category header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="icon-container-sm shrink-0">
                      <category.icon className="w-4 h-4 text-foreground" aria-hidden="true" />
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-medium text-foreground leading-snug">
                      {category.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] text-muted-foreground/70 select-none"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* All technologies strip */}
          <div className="mt-14 pt-8 border-t border-border">
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {t("skills.allTechnologies")}
              </p>
              <span aria-hidden="true" className="flex-1 h-px bg-border" />
            </div>
            <div className="relative overflow-hidden py-3">
              <LogoLoop
                logos={[
                  {
                    node: <SiDotnet className="logoloop__brand-node" color="#512BD4" />,
                    title: "C# / .NET",
                  },
                  {
                    node: <SiTypescript className="logoloop__brand-node" color="#3178C6" />,
                    title: "TypeScript",
                  },
                  {
                    node: <SiPuppeteer className="logoloop__brand-node" color="#40B5A4" />,
                    title: "Puppeteer",
                  },
                  {
                    node: <SiJavascript className="logoloop__brand-node" color="#F7DF1E" />,
                    title: "JavaScript",
                  },
                  {
                    node: <SiMysql className="logoloop__brand-node" color="#4479A1" />,
                    title: "MySQL",
                  },
                  {
                    node: <SiCypress className="logoloop__brand-node" color="#a3e7cb" />,
                    title: "Cypress",
                  },
                  {
                    node: <SiPostman className="logoloop__brand-node" color="#FF6C37" />,
                    title: "Postman",
                  },
                  {
                    node: <SiAppium className="logoloop__brand-node" color="#EE376D" />,
                    title: "Appium",
                  },
                  {
                    node: <SiRobotframework className="logoloop__brand-node" color="#00c0b5" />,
                    title: "Robot Framework",
                  },
                  {
                    node: <SiJunit5 className="logoloop__brand-node" color="#25A162" />,
                    title: "JUnit",
                  },
                  {
                    node: (
                      <img
                        src="/images/k6-logo.svg"
                        alt="k6"
                        width={36}
                        height={36}
                        className="logoloop__brand-image"
                        style={{ height: "32px", width: "auto" }}
                      />
                    ),
                    title: "Grafana k6",
                  },
                  {
                    node: <SiGit className="logoloop__brand-node" color="#F05032" />,
                    title: "Git",
                  },
                  {
                    node: <SiGithub className="logoloop__brand-node" color="#3e75c3" />,
                    title: "GitHub",
                  },
                  {
                    node: <SiGitlab className="logoloop__brand-node" color="#FC6D26" />,
                    title: "GitLab CI/CD",
                  },
                  {
                    node: <SiGithubactions className="logoloop__brand-node" color="#2088FF" />,
                    title: "GitHub Actions",
                  },
                  {
                    node: <SiDocker className="logoloop__brand-node" color="#2496ED" />,
                    title: "Docker",
                  },
                  {
                    node: <FaAws className="logoloop__brand-node" color="#FF9900" />,
                    title: "AWS",
                  },
                ]}
                speed={65}
                direction="left"
                logoHeight={32}
                gap={48}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                ariaLabel="Todas as tecnologias"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

