import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import BR from "country-flag-icons/react/3x2/BR";
import US from "country-flag-icons/react/3x2/US";
import ES from "country-flag-icons/react/3x2/ES";

const languages = [
    {code: "pt-BR", label: "Português", shortLabel: "PT", FlagIcon: BR},
    {code: "en", label: "English", shortLabel: "EN", FlagIcon: US},
    {code: "es", label: "Español", shortLabel: "ES", FlagIcon: ES},
];

export const LanguageSwitcher = () => {
    const {t, i18n} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        if (typeof document !== "undefined" && currentLanguage?.code) {
            document.documentElement.lang = currentLanguage.code;
        }
    }, [currentLanguage.code]);

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        try {
            if (typeof window !== "undefined" && typeof window.localStorage?.setItem === "function") {
                window.localStorage.setItem("language", langCode);
            }
        } catch {
            // Ignore storage errors in private browsing
        }
        if (typeof document !== "undefined") {
            document.documentElement.lang = langCode;
        }
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative inline-block">
            <Button
                type="button"
                variant="ghost"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="min-h-[40px] sm:min-h-[42px] h-auto px-2.5 sm:px-3 py-1.5 gap-2 border border-border bg-surface-container/60 hover:bg-surface-elevated text-foreground rounded-lg cursor-pointer"
            >
                <span
                    aria-hidden="true"
                    className="flex items-center justify-center w-5 h-3.5 overflow-hidden shrink-0 border border-border/60 rounded-[2px]"
                >
                    <currentLanguage.FlagIcon
                        style={{width: "100%", height: "100%", display: "block"}}
                    />
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                    {currentLanguage.label}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden="true"/>
                <span className="sr-only">{t("languageSwitcher.label")}</span>
            </Button>

            {isOpen && (
                <div
                    role="menu"
                    aria-label={t("languageSwitcher.label")}
                    className="absolute right-0 mt-1.5 z-50 w-44 bg-surface-elevated border border-border-strong rounded-lg p-1 shadow-elevated"
                >
                    {languages.map((lang) => {
                        const isSelected = i18n.language === lang.code;
                        return (
                            <button
                                key={lang.code}
                                type="button"
                                role="menuitemradio"
                                aria-checked={isSelected}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full cursor-pointer text-xs sm:text-sm font-medium py-2.5 px-3 rounded-sm flex items-center justify-between transition-colors ${
                                    isSelected
                                        ? "bg-foreground text-background font-semibold"
                                        : "text-foreground hover:bg-surface-container-high"
                                }`}
                            >
                                <span className="flex items-center gap-2.5">
                                    <span
                                        aria-hidden="true"
                                        className="w-5 h-3.5 overflow-hidden flex items-center justify-center shrink-0 border border-border/50 rounded-[2px]"
                                    >
                                        <lang.FlagIcon
                                            style={{width: "100%", height: "100%", display: "block"}}
                                        />
                                    </span>
                                    <span>{lang.label}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

