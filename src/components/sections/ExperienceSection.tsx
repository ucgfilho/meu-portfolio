import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    company: "CPDS",
    role: "Desenvolvedor Front-End",
    period: "Jul/2025 – Atual",
    achievements: [
      {
        title: "Arquitetura SGDoctor Acadêmico",
        description: "Estruturei a arquitetura para 5 perfis de acesso, garantindo segurança e consistência através de controle estrito de permissões e componentização de DataTables.",
        technologies: ["Vue.js", "TypeScript"],
      },
      {
        title: "Módulo de Assinaturas Digitais",
        description: "Assegurei 100% de rastreabilidade clínica e integridade dos dados ao desenvolver o módulo de assinaturas digitais e prontuários.",
        technologies: ["Axios", "Inertia.js"],
      },
      {
        title: "Refatoração do Módulo de Estoque",
        description: "Melhorei a eficiência da gestão de insumos e manutenibilidade do código, implementando validações em tempo real e filtragem dinâmica.",
        technologies: ["Tailwind CSS", "Vue.js"],
      },
    ],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Experiência Profissional</h2>
          </div>

          {/* Experience cards */}
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={expIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-lg text-primary font-medium">{exp.company}</p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </span>
              </div>

              {/* Achievements */}
              <div className="space-y-6">
                {exp.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                    
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {achievement.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {achievement.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium border border-secondary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
