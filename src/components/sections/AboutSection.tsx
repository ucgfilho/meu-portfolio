import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[40%_1fr] gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Image Column - M3 Image card style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="relative group order-first"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-elevation-3 aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <img
                src="/images/profile-photo.png"
                alt={t("about.imageAlt")}
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-40" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Header - M3 section header style */}
            <div className="section-header">
              <div className="section-header-icon">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("about.title")}
              </h2>
            </div>

            {/* Bio - M3 Body Large */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.bio1")}{" "}
                <span className="text-primary font-medium">
                  {t("about.bio1Highlight1")}
                </span>
                ,{" "}
                <span className="text-primary font-medium">
                  {t("about.bio1Highlight2")}
                </span>{" "}
                e implementação da{" "}
                <span className="text-primary font-medium">
                  {t("about.bio1Highlight3")}
                </span>{" "}
                {t("about.bio1End")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.bio2Start")}{" "}
                <span className="text-tertiary font-medium">
                  {t("about.bio2Course")}
                </span>{" "}
                {t("about.bio2End")}
              </p>
            </div>

            {/* Cards - M3 Filled cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl p-5 bg-surface-container border border-border/30 hover:bg-surface-container-high hover:border-primary/30 transition-all duration-200">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-xl bg-primary/12">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t("about.goalTitle")}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("about.goalDescription")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-surface-container border border-border/30 hover:bg-surface-container-high hover:border-secondary/30 transition-all duration-200">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-xl bg-secondary/12">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t("about.differentialTitle")}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("about.differentialDescription")}
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
