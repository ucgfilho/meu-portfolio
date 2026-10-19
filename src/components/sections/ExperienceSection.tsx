import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

/* =============================================================================
   ExperienceSection - Swiss Editorial Technical Design System
   - Split-column career ledger (4-col metadata + 8-col engineering impact statements)
   - Semantic h2 and h3 hierarchy
   ============================================================================= */

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  responsibilities: string[];
}

export const ExperienceSection = () => {
  const { t } = useTranslation();

  const experienceItems = t("experience.items", { returnObjects: true }) as ExperienceItem[];

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Section Header */}
          <div className="section-header-editorial">
            <span className="section-index" aria-hidden="true">02 // EXPERIENCE</span>
            <h2 className="section-title">{t("experience.title")}</h2>
          </div>

          <div className="divide-y divide-border">
            {experienceItems.map((item, idx) => (
              <article
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 first:pt-2 last:pb-2"
              >
                {/* Left Column — Metadata & Organization */}
                <div className="lg:col-span-4 flex flex-col items-start justify-between gap-4">
                  <div className="space-y-3 w-full">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {item.period}
                      </span>
                      {item.isCurrent && (
                        <span className="status-badge">
                          <span className="status-dot" aria-hidden="true" />
                          {t("experience.current") || "Atual"}
                        </span>
                      )}
                    </div>

                    <p className="font-display text-lg font-semibold text-foreground leading-snug">
                      {item.company}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Right Column — Role & Engineering Impact */}
                <div className="lg:col-span-8">
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-6 pb-4 border-b border-border/70">
                    {item.role}
                  </h3>

                  <ul className="space-y-5">
                    {item.responsibilities.map((responsibility, index) => (
                      <li key={index} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-muted-foreground select-none"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-foreground/90 text-base leading-[1.75] max-w-[68ch]">
                          {responsibility}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

