import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FolderKanban, ExternalLink, Github } from "lucide-react";

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
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <FolderKanban className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Projetos</h2>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${project.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  {/* Project icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FolderKanban className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 rounded-md bg-muted/50 text-muted-foreground text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm text-primary/80 group-hover:text-primary transition-colors">
                    Acessar repositório
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              Veja mais projetos no meu GitHub
            </p>
            <a
              href="https://github.com/ucgfilho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
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
