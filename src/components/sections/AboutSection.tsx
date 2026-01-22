import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, Sparkles } from "lucide-react";

/* =============================================================================
   AboutSection - Material 3 Expressive
   
   DESIGN:
   - Layout em grid com imagem e conteúdo
   - Cards usando M3 filled card style
   - Tipografia seguindo M3 type scale
   
   ACESSIBILIDADE:
   - Imagem com alt text descritivo
   - Contraste adequado em todo o texto
   - Hierarquia visual clara
   ============================================================================= */

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[40%_1fr] gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Image Column - M3 Image card style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0, 0, 0, 1] }}
            className="relative group order-first"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-elevation-3 aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <img
                src="/images/profile-photo.png"
                alt="Foto de Ubirajara Filho - Analista de QA"
                className="w-full h-full object-cover transition-transform duration-700 ease-m3-emphasized group-hover:scale-105"
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-40" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0, 0, 0, 1] }}
            className="space-y-8"
          >
            {/* Header - M3 section header style */}
            <div className="section-header">
              <div className="section-header-icon">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Sobre Mim
              </h2>
            </div>

            {/* Bio - M3 Body Large */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sou um profissional apaixonado por qualidade de software, com
                foco em
                <span className="text-primary font-medium">
                  {" "}
                  automação de testes
                </span>,
                <span className="text-primary font-medium">
                  {" "}
                  práticas de DevOps
                </span>{" "}
                e implementação da
                <span className="text-primary font-medium">
                  {" "}
                  cultura de qualidade
                </span>{" "}
                desde o planejamento.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Atualmente cursando{" "}
                <span className="text-tertiary font-medium">
                  Sistemas de Informação
                </span>{" "}
                na UESB, busco constantemente aprimorar minhas habilidades e
                contribuir para projetos que valorizem a excelência técnica e a
                entrega contínua.
              </p>
            </div>

            {/* Cards - M3 Filled cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl p-5 bg-surface-container border border-border/30 hover:bg-surface-container-high hover:border-primary/30 transition-all duration-300 ease-m3-emphasized">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-xl bg-primary/12">
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

              <div className="rounded-2xl p-5 bg-surface-container border border-border/30 hover:bg-surface-container-high hover:border-secondary/30 transition-all duration-300 ease-m3-emphasized">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-xl bg-secondary/12">
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
