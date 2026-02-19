import {motion, useInView} from "framer-motion";
import {useRef} from "react";
import {Award, BadgeCheck} from "lucide-react";
import {useTranslation} from "react-i18next";
import {TypewriterText} from "@/components/TypewriterText";

/* =============================================================================
   CertificationsSection - Editorial High-End
   
   DESIGN:
   - Grid compacto de certificações
   - Cards minimalistas com hover sutil
   - Badge de verificação no hover
   ============================================================================= */

const certificationLinks = [
    "https://drive.google.com/file/d/1SMeGIPXYZP6oh8SpnSLeGCWohVbs_t-T/view?usp=sharing",
    "https://drive.google.com/file/d/1zzldKSmnzYpmRlMwfoMsLWVZ1reW7YI6/view?usp=sharing",
    "https://drive.google.com/file/d/1S0nTY65t5CUNDdyY2CoRAvckwJZQjxQ1/view?usp=sharing",
    "https://drive.google.com/file/d/1p9FAC8J214H5ju4S1QeBd7OYudK0pJdz/view?usp=sharing",
    "https://drive.google.com/file/d/1M6rHLPVWspNrQnOKeYTnVx1d-iKKGHlk/view?usp=sharing",
    "https://drive.google.com/file/d/1bLFgUDzLqMDnNqAh9xLMxxKPWCLzEZIh/view?usp=sharing",
    "https://drive.google.com/file/d/1bEZYTjOdl503_JG9hqZaH3oWhsD-XwaM/view?usp=sharing",
    "https://drive.google.com/file/d/1jGf_jDHtM7T25RckbEBEuyhcV3-ooY_a/view?usp=sharing",
    "https://drive.google.com/file/d/1kgliMsclVQNqfjWVZrorU9Afxpj3fQYN/view?usp=sharing",
    "https://drive.google.com/file/d/1nlrAHCCcXxTfNRW4heLJzAlKAyOya0Io/view?usp=sharing",
    "https://drive.google.com/file/d/1L_v-brBLNZBfHGQe6QeH9th2LjlzP9mJ/view?usp=sharing",
    "https://drive.google.com/file/d/1Zica5n5aI4SepIaPsvosXu8nACgvVf2J/view?usp=sharing",
];

export const CertificationsSection = () => {
    const {t} = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-100px"});

    const certifications = [
        {
            ...t("certifications.list.0", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[0],
        },
        {
            ...t("certifications.list.1", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[1],
        },
        {
            ...t("certifications.list.2", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[2],
        },
        {
            ...t("certifications.list.3", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[3],
        },
        {
            ...t("certifications.list.4", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[4],
        },
        {
            ...t("certifications.list.5", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[5],
        },
        {
            ...t("certifications.list.6", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[6],
        },
        {
            ...t("certifications.list.7", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[7],
        },
        {
            ...t("certifications.list.8", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[8],
        },
        {
            ...t("certifications.list.9", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[9],
        },
        {
            ...t("certifications.list.10", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[10],
        },
        {
            ...t("certifications.list.11", {returnObjects: true}),
            icon: Award,
            link: certificationLinks[11],
        },
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: 0.05},
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 15},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94]},
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
                    <motion.div
                        variants={itemVariants}
                        className="section-header justify-center"
                    >
            <span className="section-label">
                <TypewriterText text={t("certifications.title")} speed={20} enabled={isInView}/>
              </span>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {certifications.map((cert, index) => {
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
                                    key={index}
                                    variants={itemVariants}
                                    className={`card p-5 group hover:border-accent/30 transition-colors duration-200 ${
                                        cert.link ? "cursor-pointer" : ""
                                    }`}
                                    {...cardProps}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="icon-container-sm group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors duration-200">
                                            <cert.icon
                                                className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-200"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-foreground text-sm mb-1 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                                                {cert.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                        <BadgeCheck
                                            className="w-4 h-4 text-muted-foreground/30 group-hover:text-accent transition-colors duration-200 flex-shrink-0"/>
                                    </div>
                                </CardWrapper>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
