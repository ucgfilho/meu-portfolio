import {useTranslation} from "react-i18next";
import BR from "country-flag-icons/react/3x2/BR";
import ES from "country-flag-icons/react/3x2/ES";
import US from "country-flag-icons/react/3x2/US";

/* =============================================================================
   LanguagesSection - Swiss Editorial Technical Design System
   - Replaces emoji flags with crisp SVG flag icons (country-flag-icons)
   - Replaces arbitrary progress bars with an architectural specification strip
   - Preserves all language names, levels, and metrics
   ============================================================================= */

export const LanguagesSection = () => {
    const {t} = useTranslation();

    const languages = [
        {
            name: t("languagesSection.portuguese.name"),
            level: t("languagesSection.portuguese.level"),
            proficiency: 100,
            code: "PT-BR",
            FlagIcon: BR,
        },
        {
            name: t("languagesSection.spanish.name"),
            level: t("languagesSection.spanish.level"),
            proficiency: 85,
            code: "ES",
            FlagIcon: ES,
        },
        {
            name: t("languagesSection.english.name"),
            level: t("languagesSection.english.level"),
            proficiency: 60,
            code: "EN",
            FlagIcon: US,
        },
    ];

    return (
        <section id="languages" className="py-20 md:py-28 relative">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Editorial Section Header */}
                    <div className="section-header-editorial">
                        <span className="section-index" aria-hidden="true">06 // LANGUAGES</span>
                        <h2 className="section-title">
                            {t("languagesSection.title")}
                        </h2>
                    </div>

                    {/* 3-Column Specification Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-border">
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                className="border-r border-b border-border p-6 sm:p-8 bg-surface/50 hover:bg-surface-container transition-colors duration-200 flex flex-col justify-between gap-6"
                            >
                                {/* Top bar: SVG Flag & ISO code */}
                                <div className="flex items-center justify-between gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="w-7 h-5 overflow-hidden flex items-center justify-center border border-border shrink-0"
                                    >
                                        <lang.FlagIcon
                                            style={{width: "100%", height: "100%", display: "block"}}
                                        />
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="font-mono text-xs text-muted-foreground tracking-wider"
                                    >
                                        {lang.code}
                                    </span>
                                </div>

                                {/* Name & Level */}
                                <div className="pt-2 border-t border-border/60 flex items-baseline justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-1">
                                            {lang.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {lang.level}
                                        </p>
                                    </div>
                                    <span className="font-mono text-xs text-muted-foreground">
                                        {lang.proficiency}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

