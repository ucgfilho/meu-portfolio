import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BarChart3,
  ClipboardList,
  Code2,
  FileText,
  Gauge,
  GitBranch,
  Smartphone,
  TestTube,
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
  SiPython,
  SiMysql,
  SiGitlab,
  SiJira,
  SiJavascript,
  SiInsomnia,
  SiCodeceptjs,
} from "react-icons/si";
import { LogoLoop } from "../LogoLoop";

/* =============================================================================
   SkillsSection - Editorial High-End

   DESIGN:
   - Cards flat com borda sutil
   - Chips minimalistas
   - Grid responsivo 3 colunas
   - Animações stagger suaves
   ============================================================================= */

export const SkillsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: t("skills.webTests"),
      icon: TestTube,
      skills: ["Cypress", "CodeceptJS", "Gherkin", "BDD"],
    },
    {
      title: t("skills.apiTests"),
      icon: Wrench,
      skills: ["Postman", "Insomnia"],
    },
    {
      title: t("skills.mobileTests"),
      icon: Smartphone,
      skills: ["Appium", "Robot Framework", "BrowserStack"],
    },
    {
      title: t("skills.performanceTests"),
      icon: Gauge,
      skills: ["Grafana k6"],
    },
    {
      title: t("skills.automatedReports"),
      icon: BarChart3,
      skills: ["Mochawesome", "JUnit", "Allure"],
    },
    {
      title: t("skills.languages"),
      icon: Code2,
      skills: ["JavaScript", "Python", "SQL"],
    },
    {
      title: t("skills.devops"),
      icon: GitBranch,
      skills: ["Git", "GitHub Actions", "Docker", "GitLab CI/CD"],
    },
    {
      title: t("skills.documentation"),
      icon: FileText,
      skills: [t("skills.testDocumentation"), t("skills.bugDocumentation")],
    },
    {
      title: t("skills.testManagement"),
      icon: ClipboardList,
      skills: ["Jira", "Xray"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="section-header justify-center">
            <span className="section-label">{t("skills.title")}</span>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="card p-6 group transition-colors duration-200"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="icon-container-sm">
                    <category.icon className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="font-medium text-foreground">{category.title}</h3>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* All technologies */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-6">{t("skills.allTechnologies")}</p>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <LogoLoop
                logos={[
                  {
                    node: <SiJavascript className="logoloop__brand-node" color="#F7DF1E" />,
                    title: "JavaScript",
                  },
                  {
                    node: <SiMysql className="logoloop__brand-node" color="#4479A1" />,
                    title: "SQL",
                  },
                  {
                    node: <SiPython className="logoloop__brand-node" color="#f7ba13" />,
                    title: "Python",
                  },
                  {
                    node: <SiCypress className="logoloop__brand-node" color="#a3e7cb" />,
                    title: "Cypress",
                  },
                  {
                    node: <SiCodeceptjs className="logoloop__brand-node" color="#F6E05E" />,
                    title: "CodeceptJS",
                  },
                  {
                    node: <SiPostman className="logoloop__brand-node" color="#FF6C37" />,
                    title: "Postman",
                  },
                  {
                    node: <SiInsomnia className="logoloop__brand-node" color="#4000BF" />,
                    title: "Insomnia",
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
                        className="logoloop__brand-image"
                        style={{ height: "36px", width: "auto" }}
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
                    node: <SiJira className="logoloop__brand-node" color="#0052CC" />,
                    title: "Jira",
                  },
                ]}
                speed={80}
                direction="left"
                logoHeight={36}
                gap={48}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                ariaLabel="Todas as tecnologias"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
