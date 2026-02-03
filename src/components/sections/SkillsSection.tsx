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
} from "lucide-react";
import { useTranslation } from "react-i18next";

/* =============================================================================
   SkillsSection - iOS 26 Liquid Glass
   
   DESIGN:
   - Cards Liquid Glass com bordas de luz
   - Progress bars com glow aurora
   - Chips com glassmorphism
   - Animações spring
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
      icon: TestTube,
      skills: ["Appium", "Robot Framework", "BrowserStack"],
    },
    {
      title: t("skills.automatedReports"),
      icon: BarChart3,
      skills: ["Mochawesome", "JUnit", "Allure Report"],
    },
    {
      title: t("skills.languages"),
      icon: Code2,
      skills: ["JavaScript", "Python", "SQL"],
    },
    {
      title: t("skills.devops"),
      icon: GitBranch,
      skills: ["Git", "GitHub Actions", "GitLab CI/CD", "Docker"],
    },
    {
      title: t("skills.documentation"),
      icon: FileText,
      skills: [t("skills.testDocumentation"), t("skills.bugDocumentation")],
    },
  ];

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="section-header">
            <div className="section-header-icon">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              {t("skills.title")}
            </h2>
          </div>

          {/* Skills Grid - Liquid Glass Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.05 + categoryIndex * 0.05,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
                className="glass-card-interactive rounded-3xl p-6"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="p-2.5 rounded-2xl"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                      boxShadow:
                        "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1), 0 0 12px hsl(var(--primary) / 0.15)",
                    }}
                  >
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + categoryIndex * 0.05 + skillIndex * 0.03,
                      }}
                      className="px-3 py-1.5 rounded-full text-sm font-medium text-foreground bg-primary/10 border border-primary/20"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags cloud - Glass Chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.3,
            }}
            className="mt-14 text-center"
          >
            <h3 className="text-lg font-light text-muted-foreground mb-6 tracking-wide">
              Todas as tecnologias
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Cypress",
                "Git",
                "Docker",
                "CodeceptJS",
                "GitHub Actions",
                "GitLab CI/CD",
                "BDD",
                "Gherkin",
                "Postman",
                "Allure Report",
                "Jira",
                "Mochawesome",
                "JUnit",
                "Insomnia",
                "Appium",
                "Robot Framework",
                "BrowserStack",
                "Python",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.02,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-chip cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
