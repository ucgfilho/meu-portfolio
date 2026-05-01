import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

/* =============================================================================
   ExperienceSection - Editorial High-End

   DESIGN:
   - Lista de cards com layout limpo
   - Badge de status para período atual (condicional)
   - Localização com ícone discreto
   - Lista de responsabilidades com marcadores
   - Tipografia hierárquica clara
   ============================================================================= */

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  responsibilities: string[];
}

export const ExperienceSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experienceItems = t("experience.items", { returnObjects: true }) as ExperienceItem[];

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
          <motion.div variants={itemVariants} className="section-header justify-center mb-16">
            <span className="section-label">{t("experience.title")}</span>
          </motion.div>

          <div className="space-y-12">
            {experienceItems.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-medium text-foreground mb-1">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <p className="text-accent font-medium">{item.company}</p>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.isCurrent && (
                      <span className="status-badge">
                        <span className="status-dot" />
                        {t("experience.current") || "Atual"}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-4">
                  {item.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <p className="text-foreground/90 leading-relaxed">{responsibility}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
