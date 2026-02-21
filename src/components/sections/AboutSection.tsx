import {motion, useInView} from "framer-motion";
import {useRef} from "react";
import {Sparkles, Target} from "lucide-react";
import {useTranslation} from "react-i18next";

/* =============================================================================
   AboutSection - Editorial High-End

   DESIGN:
   - Layout assimétrico com imagem e texto
   - Cards minimalistas e flat
   - Tipografia clara com hierarquia forte
   - Animações sutis de entrada
   ============================================================================= */

export const AboutSection = () => {
    const {t} = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: 0.15},
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]},
        },
    };

    return (
        <section id="about" className="py-24 md:py-32 relative" ref={ref}>
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center max-w-6xl mx-auto"
                >
                    {/* Profile Image */}
                    <motion.div variants={itemVariants} className="order-first">
                        <div
                            className="relative overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0 bg-surface-container">
                            <img
                                src="/images/profile-photo.png"
                                alt={t("about.imageAlt")}
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle gradient overlay */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"/>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div variants={containerVariants} className="space-y-8">
                        {/* Section Header */}
                        <motion.div
                            variants={itemVariants}
                            className="section-header justify-center"
                        >
              <span className="section-label">
                {t("about.title")}
              </span>
                        </motion.div>

                        {/* Bio */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("about.bio1")}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("about.bio2")}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("about.bio3")}
                            </p>
                        </motion.div>

                        {/* Feature Cards */}
                        <motion.div
                            variants={itemVariants}
                            className="grid sm:grid-cols-2 gap-4 pt-4"
                        >
                            <div className="card group">
                                <div className="flex flex-col gap-3">
                                    <div className="icon-container-sm group-hover:bg-accent/20 transition-colors">
                                        <Target className="w-5 h-5"/>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground mb-1">
                                            {t("about.goalTitle")}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {t("about.goalDescription")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card group">
                                <div className="flex flex-col gap-3">
                                    <div className="icon-container-sm group-hover:bg-accent/20 transition-colors">
                                        <Sparkles className="w-5 h-5"/>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground mb-1">
                                            {t("about.differentialTitle")}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {t("about.differentialDescription")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
