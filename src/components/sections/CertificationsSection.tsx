import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BadgeCheck, Trophy, BookOpen } from "lucide-react";

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
  { name: "Jornada QA 2025", issuer: "EBAC", icon: Trophy },
  {
    name: "Curso de Algoritmos",
    issuer: "Curso em Vídeo (Gustavo Guanabara)",
    icon: BookOpen,
  },
  {
    name: "Olimpíada Brasileira de Informática",
    issuer: "UNICAMP",
    icon: Trophy,
  },
];

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Certificações</h2>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-card rounded-xl p-5 border border-border/50 hover:border-accent/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <cert.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-accent transition-colors line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                  <BadgeCheck className="w-5 h-5 text-accent/50 group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
