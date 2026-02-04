import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";

/* =============================================================================
   ExperienceSection - Editorial High-End
   
   DESIGN:
   - Card único com layout limpo
   - Badge de status para período atual
   - Lista de responsabilidades com marcadores discretos
   - Tipografia hierárquica clara
   ============================================================================= */

const experiences = [
  {
    company: "CPDS",
    role: "Analista de QA",
    period: "Jul/2025 – Atual",
    isCurrent: true,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            variants={itemVariants}
            className="section-header justify-center"
          >
            <span className="section-label">Experiência Profissional</span>
          </motion.div>

          {/* Experience cards */}
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={expIndex}
              variants={itemVariants}
              className="card p-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-medium text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-accent font-medium">{exp.company}</p>
                </div>

                <div className="flex items-center gap-3">
                  {exp.isCurrent && (
                    <span className="status-badge">
                      <span className="status-dot" />
                      Atual
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-4">
                {exp.responsibilities.map((responsibility, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex gap-4"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      {responsibility}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
