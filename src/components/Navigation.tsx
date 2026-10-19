import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

/* =============================================================================
   Navigation - Swiss Editorial Technical Design System
   - Proper 3-zone responsive layout (no absolute positioning overlap or 0px mobile collapse)
   - Active section tracking with aria-current="location"
   - Accessible 44x44px touch targets & Escape key support
   ============================================================================= */

export const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.education"), href: "#education" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sectionIds = ["about", "experience", "skills", "projects", "education", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    const observeSections = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    const timer = setTimeout(observeSections, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav
        aria-label={t("nav.title")}
        className={`transition-colors duration-200 ${
          isMobileMenuOpen
            ? "bg-background/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-3 h-16 md:h-[72px]">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-sm ${
                    isActive
                      ? "text-foreground bg-surface-elevated"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-container"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 -bottom-[1px] h-[2px] bg-foreground"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: Language Switcher, Download CV & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <a
              href="https://drive.google.com/file/d/1xCiolo4vc35d92N6LmUeDl9VOH6U4TWS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[40px] sm:min-h-[42px] px-3 sm:px-4 py-2 rounded-sm bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-foreground/90 transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
              <span>{t("nav.downloadCv")}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm border border-border bg-surface-container text-foreground hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden fixed inset-x-0 top-16 md:top-[72px] bottom-0 z-30 flex flex-col"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="relative z-10 bg-surface border-b border-border px-5 py-6 shadow-elevated max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <div className="container mx-auto flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-center justify-between px-4 py-3.5 min-h-[48px] text-base font-medium border-b border-border/60 last:border-b-0 transition-colors duration-200 ${
                      isActive
                        ? "text-foreground bg-surface-elevated"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-container"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href="https://drive.google.com/file/d/1xCiolo4vc35d92N6LmUeDl9VOH6U4TWS/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-sm bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>{t("nav.downloadCv")}</span>
                </a>

                <div className="flex justify-start sm:justify-end">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

