import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

/* =============================================================================
   EducationSection - Editorial High-End
   
   DESIGN:
   - Card único com layout limpo
   - Badge de status para cursando
   - Tipografia hierárquica clara
   ============================================================================= */

const education = [
  {
    period: "2022 - 2026",
    degree: "Sistemas de Informação",
    institution: "Universidade Estadual do Sudoeste da Bahia - UESB",
    status: "Cursando",
    isCurrent: true,
  },
];

export const EducationSection = () => {
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
    <section id="education" className="py-24 md:py-32 relative" ref={ref}>
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
            <span className="section-label">Formação Acadêmica</span>
          </motion.div>

          {/* Education cards */}
          {education.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {item.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.institution}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.isCurrent && (
                    <span className="status-badge">
                      <span className="status-dot" />
                      {item.status}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {item.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
