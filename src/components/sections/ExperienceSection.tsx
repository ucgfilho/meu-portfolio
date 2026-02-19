import {motion, useInView} from "framer-motion";
import {useRef} from "react";
import {Calendar} from "lucide-react";
import {useTranslation} from "react-i18next";
import {TypewriterText} from "@/components/TypewriterText";

/* =============================================================================
   ExperienceSection - Editorial High-End
   
   DESIGN:
   - Card único com layout limpo
   - Badge de status para período atual
   - Lista de responsabilidades com marcadores discretos
   - Tipografia hierárquica clara
   ============================================================================= */

export const ExperienceSection = () => {
    const {t} = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    const responsibilities = [
        t("experience.responsibilities.0"),
        t("experience.responsibilities.1"),
        t("experience.responsibilities.2"),
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: 0.1},
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94]},
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
                    <motion.div
                        variants={itemVariants}
                        className="section-header justify-center"
                    >
            <span className="section-label">
                <TypewriterText text={t("experience.title")} speed={20} enabled={isInView}/>
              </span>
                    </motion.div>

                    {/* Experience card */}
                    <motion.div variants={itemVariants} className="card p-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                            <div>
                                <h3 className="text-2xl font-medium text-foreground mb-1">
                                    <TypewriterText text={t("experience.role")} speed={15} startDelay={200}
                                                    enabled={isInView}/>
                                </h3>
                                <p className="text-accent font-medium">
                                    {t("experience.company")}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                <span className="status-badge">
                  <span className="status-dot"/>
                    {t("experience.current")}
                </span>
                                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4"/>
                                    {t("experience.period")}
                </span>
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <ul className="space-y-4">
                            {responsibilities.map((responsibility, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className="flex gap-4"
                                >
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {responsibility}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
