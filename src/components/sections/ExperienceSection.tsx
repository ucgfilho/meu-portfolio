import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    company: "CPDS",
    role: "Analista de QA",
    period: "Jul/2025 – Atual",
    responsibilities: [
      "Elaborei testes automatizados de Web e API em 2 módulos (pacientes e estoque) do sistema do SGDoctor, no qual tive que validar todas as funcionalidades e respostas da API previstas nas regras de negócio",
      "Resultou na agilização e antecipação da finalização do projeto, possibilitando a entrega de 2 módulos completos e sem bugs que impactassem negativamente a experiência do usuário",
      "Para atingir esses resultados, analisei as regras de negócio, defini cenários de teste, automatizei fluxos críticos de Web e API, validei status code e dados retornados e executei testes recorrentes para identificar e reportar inconsistências de forma preventiva",
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Experiência Profissional
            </h2>
          </div>

          {/* Experience cards */}
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={expIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-75"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-lg text-primary font-medium">
                    {exp.company}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </span>
              </div>

              {/* Responsibilities */}
              <div className="space-y-4">
                {exp.responsibilities.map((responsibility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors duration-75"
                  >
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                    <p className="text-muted-foreground leading-relaxed">
                      {responsibility}
                    </p>
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
