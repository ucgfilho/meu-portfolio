import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  TestTube,
  GitBranch,
  Wrench,
  FileText,
  BarChart3,
  Smartphone,
} from "lucide-react";
import { useTranslation } from "react-i18next";

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
      title: t("skills.functionalTests"),
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
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
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
          <motion.div
            variants={itemVariants}
            className="section-header justify-center"
          >
            <span className="section-label">{t("skills.title")}</span>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="card p-6 group hover:border-accent/30 transition-colors duration-200"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="icon-container-sm">
                    <category.icon className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="font-medium text-foreground">
                    {category.title}
                  </h3>
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
            <p className="text-sm text-muted-foreground mb-6">
              {t("skills.allTechnologies")}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Cypress",
                "Git",
                "Docker",
                "CodeceptJS",
                "GitHub Actions",
                "BDD",
                "Gherkin",
                "Postman",
                "Allure",
                "Jira",
                "JUnit",
                "Insomnia",
                "Appium",
                "Robot Framework",
                "BrowserStack",
                "Python",
                "GitLab CI/CD",
              ].map((tech) => (
                <span key={tech} className="chip-outline">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
