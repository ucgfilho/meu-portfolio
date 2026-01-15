import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, Sparkles } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Sobre Mim</h2>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sou um profissional apaixonado por qualidade de software, com foco em 
                <span className="text-primary font-medium"> automação de testes</span>,{" "}
                <span className="text-secondary font-medium">práticas DevOps</span> e 
                implementação de cultura de qualidade desde o planejamento.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Atualmente cursando <span className="text-accent font-medium">Sistemas de Informação</span> na 
                UESB, busco constantemente aprimorar minhas habilidades e contribuir para 
                projetos que valorizem a excelência técnica e a entrega contínua.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Objetivo</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Atuar como Analista de QA em uma empresa que valorize automação de testes, 
                      práticas DevOps e cultura de qualidade desde o planejamento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 border border-border/50 hover:border-secondary/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Diferencial</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Contribuo com identificação técnica de falhas, construção de arquiteturas 
                      de testes escaláveis e implementação de shift-left testing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
