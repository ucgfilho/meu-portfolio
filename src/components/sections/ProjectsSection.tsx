import {motion, useInView} from "framer-motion";
import {useRef} from "react";
import {ArrowUpRight, Github} from "lucide-react";
import {useTranslation} from "react-i18next";

/* =============================================================================
   ProjectsSection - Editorial High-End

   DESIGN:
   - Cards flat com hover elegante
   - Chips minimalistas para tecnologias
   - Seta de link que aparece no hover
   - Grid responsivo 2 colunas
   ============================================================================= */

export const ProjectsSection = () => {
    const {t} = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    const projects = [
        {
            name: t("projects.saucedemo.name"),
            description: t("projects.saucedemo.description"),
            technologies: ["Cypress", "CI/CD", "GitHub Actions"],
            link: "https://github.com/ucgfilho/ProjetoCY",
        },
        {
            name: t("projects.codeceptjs.name"),
            description: t("projects.codeceptjs.description"),
            technologies: ["CodeceptJS", "Allure", "API Testing"],
            link: "https://github.com/ucgfilho/ProjetoCodeceptJS",
        },
        {
            name: t("projects.automationPractice.name"),
            description: t("projects.automationPractice.description"),
            technologies: ["Cypress", "FakerJS", "E2E"],
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

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: 0.1},
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94]},
        },
    };

    return (
        <section id="projects" className="py-24 md:py-32 relative" ref={ref}>
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
            <span className="section-label">
                {t("projects.title")}
              </span>
                    </motion.div>

                    {/* Projects Grid */}
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
                                variants={itemVariants}
                                className="card-interactive group p-6"
                            >
                                {/* Header with arrow */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                                        {project.name}
                                    </h3>
                                    <ArrowUpRight
                                        className="w-5 h-5 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200"/>
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className="chip-outline">
                      {tech}
                    </span>
                                    ))}
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* GitHub CTA */}
                    <motion.div variants={itemVariants} className="text-center mt-16">
                        <p className="text-sm text-muted-foreground mb-6">
                            {t("projects.viewMoreGithub")}
                        </p>
                        <a
                            href="https://github.com/ucgfilho"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors duration-200 group"
                        >
                            <Github className="w-4 h-4"/>
                            {t("projects.viewGithubButton")}
                            <ArrowUpRight
                                className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200"/>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
