import { ArrowUpRight, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

/* =============================================================================
   ProjectsSection - Swiss Editorial Technical Design System
   - Architectural case dossiers with visible external indicators (touch-friendly)
   - Semantic h2/h3 hierarchy & design-token monospaced stack tags
   ============================================================================= */

export const ProjectsSection = () => {
  const { t } = useTranslation();

  const projects = [
    {
      name: t("projects.portdata.name"),
      description: t("projects.portdata.description"),
      technologies: ["C#", "TypeScript", "Puppeteer"],
      link: "https://www.portdata.tech/",
    },
    {
      name: t("projects.sgdoctor.name"),
      description: t("projects.sgdoctor.description"),
      technologies: ["Laravel", "Vue", "Inertia"],
      link: "https://sgdoctor.cpds.tech/",
    },
    {
      name: t("projects.microsservico.name"),
      description: t("projects.microsservico.description"),
      technologies: ["C#", "ASP.NET", "Entity Framework", "MariaDB", "JWT", "SOLID", "Scalar"],
      link: "https://github.com/ucgfilho/microservice-cs",
    },
    {
      name: t("projects.xpathCatcher.name"),
      description: t("projects.xpathCatcher.description"),
      technologies: ["JavaScript", "XPath"],
      link: "https://addons.mozilla.org/pt-BR/firefox/addon/xpath-catcher/",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Section Header */}
          <div className="section-header-editorial">
            <span className="section-index" aria-hidden="true">04 // SELECTED WORK</span>
            <h2 className="section-title">{t("projects.title")}</h2>
          </div>

          {/* Projects Architectural Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="arch-panel-interactive group p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata bar */}
                  <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-border/70">
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-muted-foreground tracking-wider"
                    >
                      PRJ // {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="w-8 h-8 inline-flex items-center justify-center border border-border bg-surface text-muted-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors duration-200"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-[1.7] mb-8">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="mt-12 p-6 sm:p-8 border border-border bg-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("projects.viewMoreGithub")}
            </p>
            <a
              href="https://github.com/ucgfilho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded-sm bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors duration-200 group cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>{t("projects.viewGithubButton")}</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

