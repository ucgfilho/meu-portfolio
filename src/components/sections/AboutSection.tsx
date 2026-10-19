import {useTranslation} from "react-i18next";

/* =============================================================================
   AboutSection - Swiss Editorial Technical Design System
   - Semantic h2 heading with editorial index
   - Asymmetric 12-column layout (4-col portrait frame + 8-col structured prose)
   - Lead paragraph differentiation + 2-column technical bio breakdown
   ============================================================================= */

export const AboutSection = () => {
    const {t} = useTranslation();

    return (
        <section id="about" className="py-20 md:py-28 relative">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Editorial Section Header */}
                    <div className="section-header-editorial">
                        <span className="section-index" aria-hidden="true">01 // PROFILE</span>
                        <h2 className="section-title">
                            {t("about.title")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        {/* Profile Image — 4 Columns */}
                        <div className="lg:col-span-4">
                            <div className="relative p-2 border border-border bg-surface-container rounded-lg max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                                <div className="relative overflow-hidden aspect-[3/4] bg-surface rounded-none">
                                    <picture>
                                        <source
                                            type="image/webp"
                                            srcSet="/images/profile-photo-320.webp 320w, /images/profile-photo-540.webp 540w, /images/profile-photo-640.webp 640w"
                                            sizes="(max-width: 640px) 302px, 368px"
                                        />
                                        <img
                                            src="/images/profile-photo.png"
                                            alt={t("about.imageAlt")}
                                            loading="lazy"
                                            decoding="async"
                                            width={368}
                                            height={491}
                                            className="w-full h-full object-cover"
                                        />
                                    </picture>
                                </div>
                            </div>
                        </div>

                        {/* Editorial Bio Content — 8 Columns */}
                        <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
                            {/* Lead Paragraph */}
                            <p className="text-lg sm:text-xl text-foreground leading-[1.65] font-normal pb-8 border-b border-border max-w-[68ch]">
                                {t("about.bio1")}
                            </p>

                            {/* Secondary Paragraphs in 2-Column Editorial Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                <p className="text-base text-muted-foreground leading-[1.75]">
                                    {t("about.bio2")}
                                </p>
                                <p className="text-base text-muted-foreground leading-[1.75]">
                                    {t("about.bio3")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

