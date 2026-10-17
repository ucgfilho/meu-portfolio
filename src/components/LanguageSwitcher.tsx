import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
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

    const currentLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        if (typeof document !== "undefined" && currentLanguage?.code) {
            document.documentElement.lang = currentLanguage.code;
        }
    }, [currentLanguage.code]);

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
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="min-h-[40px] sm:min-h-[42px] h-auto px-2.5 sm:px-3 py-1.5 gap-2 border border-border bg-surface-container/60 hover:bg-surface-elevated text-foreground rounded-sm"
                >
                    <span
                        aria-hidden="true"
                        className="flex items-center justify-center w-5 h-3.5 overflow-hidden shrink-0 border border-border/60"
                    >
                        <currentLanguage.FlagIcon
                            style={{width: "100%", height: "100%", display: "block"}}
                        />
                    </span>
                    <span className="font-mono text-xs font-medium text-foreground whitespace-nowrap">
                        {currentLanguage.label}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden="true"/>
                    <span className="sr-only">{t("languageSwitcher.label")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-44 bg-surface-elevated border border-border-strong rounded-sm p-1 shadow-elevated"
            >
                {languages.map((lang) => {
                    const isSelected = i18n.language === lang.code;
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`cursor-pointer text-xs font-mono py-2.5 px-3 rounded-sm flex items-center justify-between transition-colors ${
                                isSelected
                                    ? "bg-foreground text-background font-semibold"
                                    : "text-foreground hover:bg-surface-container-high"
                            }`}
                        >
                            <span className="flex items-center gap-2.5">
                                <span
                                    aria-hidden="true"
                                    className="w-5 h-3.5 overflow-hidden flex items-center justify-center shrink-0 border border-border/50"
                                >
                                    <lang.FlagIcon
                                        style={{width: "100%", height: "100%", display: "block"}}
                                    />
                                </span>
                                <span>{lang.label}</span>
                            </span>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

