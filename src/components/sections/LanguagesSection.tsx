import {motion, useInView} from "framer-motion";
import {useRef} from "react";
import {useTranslation} from "react-i18next";
import {TypewriterText} from "@/components/TypewriterText";

/* =============================================================================
   LanguagesSection - Editorial High-End
   
   DESIGN:
   - Grid de cards de idiomas minimalistas
   - Barra de proficiência horizontal simples
   - Tipografia limpa e hierárquica
   ============================================================================= */

export const LanguagesSection = () => {
    const {t} = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    const languages = [
        {
            name: t("languagesSection.portuguese.name"),
            level: t("languagesSection.portuguese.level"),
            proficiency: 100,
            flag: "🇧🇷",
        },
        {
            name: t("languagesSection.spanish.name"),
            level: t("languagesSection.spanish.level"),
            proficiency: 85,
            flag: "🇪🇸",
        },
        {
            name: t("languagesSection.english.name"),
            level: t("languagesSection.english.level"),
            proficiency: 60,
            flag: "🇺🇸",
        },
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
        <section className="py-24 md:py-32 relative" ref={ref}>
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
                <TypewriterText text={t("languagesSection.title")} speed={20} enabled={isInView}/>
              </span>
                    </motion.div>

                    {/* Languages grid */}
                    <div className="grid sm:grid-cols-3 gap-5">
                        {languages.map((lang) => (
                            <motion.div
                                key={lang.name}
                                variants={itemVariants}
                                className="card p-6 text-center group hover:border-accent/30 transition-colors duration-200"
                            >
                                {/* Flag */}
                                <div className="text-4xl mb-4">{lang.flag}</div>

                                {/* Name and level */}
                                <h3 className="text-lg font-medium text-foreground mb-1">
                                    {lang.name}
                                </h3>
                                <p className="text-sm text-accent font-medium mb-5">
                                    {lang.level}
                                </p>

                                {/* Proficiency bar */}
                                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-accent rounded-full"
                                        initial={{width: 0}}
                                        animate={isInView ? {width: `${lang.proficiency}%`} : {}}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {lang.proficiency}%
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
