import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BadgeCheck, Trophy, BookOpen } from "lucide-react";

/* =============================================================================
   CertificationsSection - Editorial High-End
   
   DESIGN:
   - Grid compacto de certificações
   - Cards minimalistas com hover sutil
   - Badge de verificação no hover
   ============================================================================= */

const certifications = [
  { name: "JavaScript para Testers", issuer: "Qazando", icon: BookOpen },
  {
    name: "Automação de Testes de API com JavaScript",
    issuer: "Qazando",
    icon: BookOpen,
  },
  {
    name: "Automação de Testes Web com Cypress",
    issuer: "Qazando",
    icon: BookOpen,
  },
  {
    name: "Conceitos de Testes de Software",
    issuer: "Qazando",
    icon: BookOpen,
  },
  {
    name: "Automação Mobile com Appium e Robot",
    issuer: "Qazando",
    icon: Trophy,
  },
  { name: "Jornada QA 2025", issuer: "EBAC", icon: Trophy },
  { name: "Introdução ao Bootcamp - Java e QA", issuer: "DIO", icon: BookOpen },
  { name: "Estruturas de Controle em Java", issuer: "DIO", icon: BookOpen },
  { name: "Fundamentos de Java", issuer: "DIO", icon: BookOpen },
  { name: "Curso de Algoritmos", issuer: "Curso em Vídeo", icon: BookOpen },
  {
    name: "Olimpíada Brasileira de Informática",
    issuer: "UNICAMP",
    icon: Trophy,
  },
  { name: "Versionamento com Git e GitHub", issuer: "DIO", icon: Trophy },
];

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="certifications" className="py-24 md:py-32 relative" ref={ref}>
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
            <span className="section-label">Certificações</span>
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-5 group hover:border-accent/30 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="icon-container-sm group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors duration-200">
                    <cert.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm mb-1 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                  <BadgeCheck className="w-4 h-4 text-muted-foreground/30 group-hover:text-accent transition-colors duration-200 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
