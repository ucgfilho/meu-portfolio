import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const education = [
  {
    period: "2022 - 2026",
    degree: "Sistemas de Informação",
    institution: "Universidade Estadual do Sudoeste da Bahia - UESB",
    status: "Cursando",
  },
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
              <GraduationCap className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Formação Acadêmica
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="absolute left-2 w-5 h-5 rounded-full border-2 border-secondary bg-background shadow-[0_0_20px_hsl(var(--neon-cyan)/0.5)]"
                />

                {/* Card */}
                <div className="glass-card rounded-xl p-6 border border-border/50 hover:border-secondary/50 transition-all duration-200 group hover:shadow-lg">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors duration-200">
                    {item.degree}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.institution}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
