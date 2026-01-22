import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FolderKanban, ExternalLink, Github } from "lucide-react";

/* =============================================================================
   ProjectsSection - iOS 26 Liquid Glass
   
   DESIGN:
   - Cards Liquid Glass com bordas de luz graduais
   - Hover que intensifica o brilho
   - Chips glassmorphism para tecnologias
   - Animações spring fluidas
   ============================================================================= */

const projects = [
  {
    name: "SGDoctor Acadêmico",
    description:
      "Atuação como QA no SGDoctor Acadêmico, com testes manuais e exploratórios, validação de requisitos e documentação de bugs.",
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
    name: "Automação E2E no SauceDemo",
    description:
      "Suite completa de testes E2E automatizados com Cypress, incluindo relatórios com JUnit e Mochawesome, integração contínua com GitHub Actions.",
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
    name: "Automação de API com CodeceptJS",
    description:
      "Projeto de automação de testes de API utilizando CodeceptJS com framework Mocha e relatórios detalhados com Allure.",
    technologies: ["CodeceptJS", "Mocha", "Allure", "API Testing"],
    link: "https://github.com/ucgfilho/ProjetoCodeceptJS",
  },
  {
    name: "Automação E2E no Automation Practice",
    description:
      "Testes E2E automatizados para e-commerce Automation Practice, utilizando dados dinâmicos com FakerJS para cenários realistas.",
    technologies: ["Cypress", "FakerJS", "E2E Testing"],
    link: "https://github.com/ucgfilho/cypress-qazando",
  },
  {
    name: "Automação API no Restful API Dev",
    description:
      "Testes automatizados de API REST utilizando Cypress, validando endpoints, respostas e fluxos de dados.",
    technologies: ["Cypress", "API Testing", "REST"],
    link: "https://github.com/ucgfilho/cypress-api-test",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="section-header">
            <div className="section-header-icon">
              <FolderKanban className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Projetos
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
                aria-label={`Abrir repositório do projeto ${project.name}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * index,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card-interactive group relative rounded-3xl p-6 overflow-hidden"
              >
                {/* Aurora glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
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
                  <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-75 tracking-wide">
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
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-75"
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
                  <div className="inline-flex items-center gap-2 text-sm text-primary/70 group-hover:text-primary transition-colors duration-75 font-medium">
                    Acessar repositório
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-75" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* GitHub CTA - Liquid Glass Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
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
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-foreground font-medium transition-all duration-75 group"
              style={{
                background: "hsl(0 0% 100% / 0.05)",
                border: "1px solid hsl(0 0% 100% / 0.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1)",
              }}
              transition={{ duration: 0.05 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#333333",
                borderColor: "#333333",
                color: "#ffffff",
                boxShadow:
                  "inset 0 1px 2px 0 hsl(0 0% 100% / 0.2), 0 8px 30px -5px rgba(51, 51, 51, 0.5)",
                transition: { duration: 0.05 },
              }}
              whileTap={{
                scale: 0.97,
                backgroundColor: "#1a1a1a",
                borderColor: "#1a1a1a",
                transition: { duration: 0.05 },
              }}
            >
              <Github className="w-5 h-5 transition-colors duration-75 group-hover:text-white" />
              Ver GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
