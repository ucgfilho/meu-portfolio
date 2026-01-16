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
        <div className="grid lg:grid-cols-[40%_1fr] gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative group order-first"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img
                src="/images/profile-photo.png"
                alt="Ubirajara Filho"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient for text readability if needed, or just aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Sobre Mim</h2>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sou um profissional apaixonado por qualidade de software, com
                foco em
                <span className="text-primary font-medium">
                  {" "}
                  automação de testes
                </span>
                ,{" "}
                <span className="text-secondary font-medium">
                  práticas DevOps
                </span>{" "}
                e implementação de cultura de qualidade desde o planejamento.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Atualmente cursando{" "}
                <span className="text-accent font-medium">
                  Sistemas de Informação
                </span>{" "}
                na UESB, busco constantemente aprimorar minhas habilidades e
                contribuir para projetos que valorizem a excelência técnica e a
                entrega contínua.
              </p>
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-lg bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Objetivo
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Atuar como Analista de QA valorizando automação, DevOps e
                      qualidade desde o planejamento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-5 border border-border/50 hover:border-secondary/30 transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-lg bg-secondary/10">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Diferencial
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Identificação técnica de falhas, arquiteturas de testes
                      escaláveis e shift-left testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
