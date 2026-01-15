import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, TestTube, GitBranch, Wrench, FileText } from "lucide-react";

const skillCategories = [
  {
    title: "Testes & QA",
    icon: TestTube,
    color: "primary",
    skills: [
      { name: "Cypress", level: 90 },
      { name: "CodeceptJS", level: 85 },
      { name: "Postman", level: 88 },
      { name: "BDD", level: 80 },
      { name: "Gestão de Testes", level: 85 },
      { name: "Criação de Testes", level: 90 },
    ],
  },
  {
    title: "DevOps & CI/CD",
    icon: GitBranch,
    color: "secondary",
    skills: [
      { name: "Git", level: 92 },
      { name: "GitHub Actions", level: 85 },
      { name: "GitLab CI/CD", level: 82 },
      { name: "Docker", level: 75 },
    ],
  },
  {
    title: "Documentação",
    icon: FileText,
    color: "accent",
    skills: [{ name: "Documentação Técnica", level: 88 }],
  },
];

const SkillBar = ({
  name,
  level,
  delay,
  color,
}: {
  name: string;
  level: number;
  delay: number;
  color: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
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
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Competências Técnicas
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
                className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-${category.color}/10`}>
                    <category.icon
                      className={`w-5 h-5 text-${category.color}`}
                    />
                  </div>
                  <h3 className="font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.3 + categoryIndex * 0.1 + skillIndex * 0.1}
                      color={category.color}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg font-semibold text-muted-foreground mb-6">
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
                "Postman",
                "Allure",
                "Jira",
                "Testes Exploratórios",
                "Testes de API",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full glass-card border border-border/50 hover:border-primary/50 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 cursor-default"
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
