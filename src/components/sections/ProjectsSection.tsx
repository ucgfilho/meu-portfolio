import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FolderKanban, ExternalLink, Github } from "lucide-react";

/* =============================================================================
   ProjectsSection - Material 3 Expressive
   
   DESIGN:
   - Cards usando M3 Outlined Card style com hover elevation
   - Chips para tecnologias seguindo M3 chip guidelines
   - Gradiente sutil no hover para feedback visual
   
   ACESSIBILIDADE:
   - Links com aria-label descritivos
   - Contraste adequado em todos os elementos
   - Focus states visíveis
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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0, 0, 0, 1] }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header - M3 style */}
          <div className="section-header">
            <div className="section-header-icon">
              <FolderKanban className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Projetos
            </h2>
          </div>

          {/* Projects Grid - M3 Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir repositório do projeto ${project.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: [0, 0, 0, 1],
                }}
                whileHover={{ y: -6 }}
                /* M3 Outlined Card: borda sutil, hover com tonal elevation */
                className="group relative rounded-2xl p-6 border border-border/50 bg-surface-container hover:bg-surface-container-high hover:border-primary/30 transition-all duration-300 ease-m3-emphasized overflow-hidden"
              >
                {/* Glow effect sutil no hover - M3 Expressive feedback */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  {/* Project icon - M3 Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-primary/12 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300 ease-m3-emphasized">
                    <FolderKanban className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content - M3 Typography */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies - M3 Chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        /* M3 Chip: surface container high com texto foreground */
                        className="px-3 py-1 rounded-full bg-surface-container-highest text-muted-foreground text-xs font-medium transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link indicator */}
                  <div className="inline-flex items-center gap-2 text-sm text-primary/70 group-hover:text-primary transition-colors duration-300">
                    Acessar repositório
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* GitHub CTA - M3 Outlined Button style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0, 0, 0, 1] }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              Veja mais projetos no meu GitHub
            </p>
            <a
              href="https://github.com/ucgfilho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 ease-m3-emphasized"
            >
              <Github className="w-5 h-5" />
              Ver GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
