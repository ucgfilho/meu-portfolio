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
   SkillsSection - iOS 26 Liquid Glass
   
   DESIGN:
   - Cards Liquid Glass com bordas de luz
   - Progress bars com glow aurora
   - Chips com glassmorphism
   - Animações spring
   ============================================================================= */

const skillCategories = [
  {
    title: "Testes Funcionais",
    icon: TestTube,
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
    skills: [
      { name: "Postman", level: 88 },
      { name: "Insomnia", level: 86 },
    ],
  },
  {
    title: "Relatórios Automatizados",
    icon: BarChart3,
    skills: [
      { name: "Mochawesome", level: 92 },
      { name: "JUnit", level: 90 },
      { name: "Allure Report", level: 94 },
    ],
  },
  {
    title: "Linguagens",
    icon: Code2,
    skills: [
      { name: "JavaScript", level: 100 },
      { name: "SQL", level: 72 },
      { name: "Java", level: 30 },
    ],
  },
  {
    title: "DevOps & CI/CD",
    icon: GitBranch,
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
    skills: [
      { name: "Documentação de testes", level: 100 },
      { name: "Documentação de bugs", level: 100 },
    ],
  },
];

/* Liquid Glass Progress Bar */
const SkillBar = ({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground tracking-wide">{name}</span>
        <span className="text-xs text-muted-foreground font-light">
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ 
            duration: 1.2, 
            delay, 
            ease: [0.34, 1.56, 0.64, 1]
          }}
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
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            ease: [0.34, 1.56, 0.64, 1]
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="section-header">
            <div className="section-header-icon">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Competências Técnicas
            </h2>
          </div>

          {/* Skills Grid - Liquid Glass Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + categoryIndex * 0.1,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
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
                      boxShadow: "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1), 0 0 12px hsl(var(--primary) / 0.15)",
                    }}
                  >
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground tracking-wide">
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
                      delay={0.3 + categoryIndex * 0.1 + skillIndex * 0.08}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags cloud - Glass Chips */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.6, 
              ease: [0.34, 1.56, 0.64, 1]
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
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + index * 0.04,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
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
