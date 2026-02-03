import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FolderKanban, ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

/* =============================================================================
   ProjectsSection - iOS 26 Liquid Glass
   
   DESIGN:
   - Cards Liquid Glass com bordas de luz graduais
   - Hover que intensifica o brilho
   - Chips glassmorphism para tecnologias
   - Animações spring fluidas
   ============================================================================= */

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      name: t("projects.sgdoctor.name"),
      description: t("projects.sgdoctor.description"),
      technologies: [
        "Testes Manuais",
        "Testes Exploratórios",
        "Casos de Teste",
        "API",
        "Bug Tracking",
      ],
      link: "https://gitlab.com/cpdsjq/sgdoctor_academico",
    },
    {
      name: t("projects.saucedemo.name"),
      description: t("projects.saucedemo.description"),
      technologies: [
        "Cypress",
        "JUnit",
        "Mochawesome",
        "CI/CD",
        "GitHub Actions",
      ],
      link: "https://github.com/ucgfilho/ProjetoCY",
    },
    {
      name: t("projects.codeceptjs.name"),
      description: t("projects.codeceptjs.description"),
      technologies: ["CodeceptJS", "Mocha", "Allure", "API Testing"],
      link: "https://github.com/ucgfilho/ProjetoCodeceptJS",
    },
    {
      name: t("projects.automationPractice.name"),
      description: t("projects.automationPractice.description"),
      technologies: ["Cypress", "FakerJS", "E2E Testing"],
      link: "https://github.com/ucgfilho/cypress-qazando",
    },
    {
      name: t("projects.restfulApi.name"),
      description: t("projects.restfulApi.description"),
      technologies: ["Cypress", "API Testing", "REST"],
      link: "https://github.com/ucgfilho/cypress-api-test",
    },
    {
      name: t("projects.mobileAutomation.name"),
      description: t("projects.mobileAutomation.description"),
      technologies: ["Appium", "Robot Framework", "BrowserStack"],
      link: "https://github.com/ucgfilho/robot-appium",
    },
  ];

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
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
              <FolderKanban className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              {t("projects.title")}
            </h2>
          </div>

          {/* Projects Grid - Liquid Glass Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("projects.openRepository", {
                  projectName: project.name,
                })}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * index,
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card-interactive group relative rounded-3xl p-6 overflow-hidden"
              >
                {/* Aurora glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
                  }}
                />

                <div className="relative z-10">
                  {/* Project icon - Glass container */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                      boxShadow:
                        "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1), 0 0 16px hsl(var(--primary) / 0.15)",
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <FolderKanban className="w-6 h-6 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-200 tracking-wide">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-3 font-light">
                    {project.description}
                  </p>

                  {/* Technologies - Glass Chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                        style={{
                          background: "hsl(0 0% 100% / 0.05)",
                          border: "1px solid hsl(0 0% 100% / 0.08)",
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link indicator */}
                  <div className="inline-flex items-center gap-2 text-sm text-primary/70 group-hover:text-primary transition-colors duration-200 font-medium">
                    Acessar repositório
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* GitHub CTA - Liquid Glass Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.3,
            }}
            className="text-center mt-14"
          >
            <p className="text-muted-foreground mb-5 font-light tracking-wide">
              Veja mais projetos no meu GitHub
            </p>
            <motion.a
              href="https://github.com/ucgfilho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-foreground font-medium transition-all duration-200 group"
              style={{
                background: "hsl(0 0% 100% / 0.05)",
                border: "1px solid hsl(0 0% 100% / 0.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1)",
              }}
              transition={{ duration: 0.15 }}
              whileHover={{
                scale: 1.03,
                y: -3,
                backgroundColor: "#333333",
                borderColor: "#333333",
                color: "#ffffff",
                boxShadow:
                  "inset 0 1px 2px 0 hsl(0 0% 100% / 0.2), 0 8px 25px -5px rgba(51, 51, 51, 0.5)",
              }}
              whileTap={{
                scale: 0.95,
                backgroundColor: "#1a1a1a",
                borderColor: "#1a1a1a",
              }}
            >
              <Github className="w-5 h-5 transition-colors duration-200 group-hover:text-white" />
              Ver GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
