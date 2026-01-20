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

/* =============================================================================
   SkillsSection - Material 3 Expressive
   
   DESIGN:
   - Cards usando M3 filled card style
   - Progress bars com gradiente M3
   - Chips para tags de tecnologias
   
   ACESSIBILIDADE:
   - Barras de progresso com valores percentuais visíveis
   - Contraste adequado em todos os elementos
   ============================================================================= */

const skillCategories = [
  {
    title: "Testes Funcionais",
    icon: TestTube,
    color: "primary",
    skills: [
      { name: "Cypress", level: 90 },
      { name: "CodeceptJS", level: 85 },
      { name: "Gherkin", level: 82 },
      { name: "BDD", level: 80 },
    ],
  },
  {
    title: "Testes de API",
    icon: Wrench,
    color: "secondary",
    skills: [
      { name: "Postman", level: 88 },
      { name: "Insomnia", level: 86 },
    ],
  },
  {
    title: "Relatórios Automatizados",
    icon: BarChart3,
    color: "tertiary",
    skills: [
      { name: "Mochawesome", level: 92 },
      { name: "JUnit", level: 90 },
      { name: "Allure Report", level: 94 },
    ],
  },
  {
    title: "Linguagens",
    icon: Code2,
    color: "primary",
    skills: [
      { name: "JavaScript", level: 100 },
      { name: "SQL", level: 72 },
      { name: "Java", level: 30 },
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
    color: "tertiary",
    skills: [
      { name: "Documentação de testes", level: 100 },
      { name: "Documentação de bugs", level: 100 },
    ],
  },
];

/* M3 Progress Bar com animação de entrada */
const SkillBar = ({
  name,
  level,
  delay,
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
        <span className="text-xs text-muted-foreground font-medium">
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
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
          transition={{ duration: 0.8, ease: [0, 0, 0, 1] }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header - M3 style */}
          <div className="section-header">
            <div className="section-header-icon">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Competências Técnicas
            </h2>
          </div>

          {/* Skills Grid - M3 Filled Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + categoryIndex * 0.1,
                  ease: [0, 0, 0, 1],
                }}
                className="rounded-2xl p-6 bg-surface-container border border-border/30 hover:bg-surface-container-high hover:border-primary/20 transition-all duration-300 ease-m3-emphasized"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-xl bg-${category.color}/12`}>
                    <category.icon
                      className={`w-5 h-5 text-${category.color}`}
                    />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills list */}
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

          {/* Tags cloud - M3 Chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0, 0, 0, 1] }}
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
                "Gherkin",
                "Postman",
                "Allure Report",
                "Jira",
                "Mochawesome",
                "JUnit",
                "Insomnia",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  /* M3 Assist Chip style */
                  className="px-4 py-2 rounded-full bg-surface-container-high border border-border/30 hover:bg-primary/10 hover:border-primary/30 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 ease-m3-emphasized cursor-default"
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
