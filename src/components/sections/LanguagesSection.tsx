import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Languages } from "lucide-react";

const languages = [
  {
    name: "Português",
    level: "Nativo",
    proficiency: 100,
    flag: "🇧🇷",
  },
  {
    name: "Espanhol",
    level: "Avançado",
    proficiency: 85,
    flag: "🇪🇸",
  },
  {
    name: "Inglês",
    level: "Intermediário",
    proficiency: 60,
    flag: "🇺🇸",
  },
];

export const LanguagesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
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
              <Languages className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Idiomas</h2>
          </div>

          {/* Languages grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                whileHover={{ scale: 1.03 }}
                className="glass-card rounded-2xl p-6 border border-border/50 hover:border-secondary/50 transition-all duration-200 text-center group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + index * 0.05,
                    type: "spring",
                  }}
                  className="text-5xl mb-4"
                >
                  {lang.flag}
                </motion.div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {lang.name}
                </h3>
                <p className="text-secondary font-medium mb-4">{lang.level}</p>

                {/* Proficiency circle */}
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      className="text-muted"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      r="32"
                      cx="40"
                      cy="40"
                    />
                    <motion.circle
                      className="text-secondary"
                      strokeWidth="6"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="32"
                      cx="40"
                      cy="40"
                      initial={{ strokeDasharray: "0 201" }}
                      animate={
                        isInView
                          ? {
                              strokeDasharray: `${(lang.proficiency / 100) * 201} 201`,
                            }
                          : {}
                      }
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                    {lang.proficiency}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
