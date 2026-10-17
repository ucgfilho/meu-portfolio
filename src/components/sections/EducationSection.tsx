import {Calendar, GraduationCap, MapPin} from "lucide-react";
import {useTranslation} from "react-i18next";

/* =============================================================================
   EducationSection - Swiss Editorial Technical Design System
   - Horizontal academic credential ledger (distinct from Experience & Projects)
   - Semantic h2 and h3 hierarchy
   ============================================================================= */

export const EducationSection = () => {
    const {t} = useTranslation();

    return (
        <section id="education" className="py-20 md:py-28 relative border-b border-border">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Editorial Section Header */}
                    <div className="section-header-editorial">
                        <span className="section-index" aria-hidden="true">05 // ACADEMIC BACKGROUND</span>
                        <h2 className="section-title">
                            {t("education.title")}
                        </h2>
                    </div>

                    {/* Academic Credential Ledger */}
                    <div className="arch-panel p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start lg:items-center">
                        {/* Left metadata — Period & Status */}
                        <div className="lg:col-span-4 flex flex-wrap items-center gap-3">
                            <span className="status-badge">
                                <span className="status-dot" aria-hidden="true"/>
                                {t("education.status")}
                            </span>
                            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true"/>
                                {t("education.period")}
                            </span>
                        </div>

                        {/* Right — Degree & Institution */}
                        <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:border-l lg:border-border lg:pl-10">
                            <div className="space-y-2">
                                <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground">
                                    {t("education.degree")}
                                </h3>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4 shrink-0" aria-hidden="true"/>
                                    <span className="text-sm sm:text-base">{t("education.institution")}</span>
                                </div>
                            </div>

                            <div className="icon-container shrink-0 hidden sm:flex" aria-hidden="true">
                                <GraduationCap className="w-5 h-5 text-muted-foreground"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

