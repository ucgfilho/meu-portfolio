import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

/* =============================================================================
   CertificationsSection - Editorial High-End

   DESIGN:
   - Certificações agrupadas por instituição
   - Header de instituição com divisor
   - Cards minimalistas com hover sutil
   ============================================================================= */

const certGroupLinks: Record<string, string[]> = {
  qazando: [
    "https://drive.google.com/file/d/1SMeGIPXYZP6oh8SpnSLeGCWohVbs_t-T/view?usp=sharing",
    "https://drive.google.com/file/d/1zzldKSmnzYpmRlMwfoMsLWVZ1reW7YI6/view?usp=sharing",
    "https://drive.google.com/file/d/1S0nTY65t5CUNDdyY2CoRAvckwJZQjxQ1/view?usp=sharing",
    "https://drive.google.com/file/d/1p9FAC8J214H5ju4S1QeBd7OYudK0pJdz/view?usp=sharing",
    "https://drive.google.com/file/d/1M6rHLPVWspNrQnOKeYTnVx1d-iKKGHlk/view?usp=sharing",
    "https://drive.google.com/file/d/1yPrAE-rwiZH_qi-iHTA0Pymyjj_21sI1/view?usp=sharing",
    "https://drive.google.com/file/d/1pJmI4fQ0JuahG4HQKBkBLd1RnN9AgAAE/view?usp=sharing",
  ],
  ebac: ["https://drive.google.com/file/d/1bLFgUDzLqMDnNqAh9xLMxxKPWCLzEZIh/view?usp=sharing"],
  dio: [
    "https://drive.google.com/file/d/1bEZYTjOdl503_JG9hqZaH3oWhsD-XwaM/view?usp=sharing",
    "https://drive.google.com/file/d/1kgliMsclVQNqfjWVZrorU9Afxpj3fQYN/view?usp=sharing",
    "https://drive.google.com/file/d/1jGf_jDHtM7T25RckbEBEuyhcV3-ooY_a/view?usp=sharing",
    "https://drive.google.com/file/d/1L_v-brBLNZBfHGQe6QeH9th2LjlzP9mJ/view?usp=sharing",
  ],
  unicamp: ["https://drive.google.com/file/d/1nlrAHCCcXxTfNRW4heLJzAlKAyOya0Io/view?usp=sharing"],
};

export const CertificationsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const groups = (
    t("certifications.groups", { returnObjects: true }) as Array<{
      key: string;
      institution: string;
      certs: string[];
    }>
  ).map((group) => ({
    ...group,
    certs: group.certs.map((name, i) => ({
      name,
      link: certGroupLinks[group.key]?.[i] ?? "",
    })),
  }));

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
          <motion.div variants={itemVariants} className="section-header justify-center">
            <span className="section-label">{t("certifications.title")}</span>
          </motion.div>

          {/* Groups */}
          <div className="space-y-10">
            {groups.map((group) => (
              <motion.div key={group.key} variants={itemVariants}>
                {/* Institution header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {group.institution}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Certs grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.certs.map((cert, i) => {
                    const CardWrapper = cert.link ? motion.a : motion.div;
                    const cardProps = cert.link
                      ? {
                          href: cert.link,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `${t("certifications.viewCertificate")}: ${cert.name}`,
                        }
                      : {};

                    return (
                      <CardWrapper
                        key={i}
                        variants={itemVariants}
                        className={`card p-5 group transition-colors duration-200 ${
                          cert.link ? "cursor-pointer" : ""
                        }`}
                        {...cardProps}
                      >
                        <div className="flex items-start gap-4">
                          <div className="icon-container-sm group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors duration-200">
                            <Award className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-200" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground text-sm mb-1 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                              {cert.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{group.institution}</p>
                          </div>
                          <BadgeCheck className="w-4 h-4 text-muted-foreground/30 group-hover:text-accent transition-colors duration-200 flex-shrink-0" />
                        </div>
                      </CardWrapper>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
