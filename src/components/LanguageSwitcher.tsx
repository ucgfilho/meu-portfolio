import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import BR from "country-flag-icons/react/3x2/BR";
import US from "country-flag-icons/react/3x2/US";
import ES from "country-flag-icons/react/3x2/ES";

/* =============================================================================
   LanguageSwitcher - Editorial High-End

   DESIGN:
   - Dropdown menu minimalista
   - Transições suaves
   - Estilo limpo e elegante
   ============================================================================= */

const languages = [
    {code: "pt-BR", label: "Português", shortLabel: "PT", FlagIcon: BR},
    {code: "en", label: "English", shortLabel: "EN", FlagIcon: US},
    {code: "es", label: "Español", shortLabel: "ES", FlagIcon: ES},
];

export const LanguageSwitcher = () => {
    const {i18n} = useTranslation();

    const currentLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem("language", langCode);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 px-3 gap-2 transition-colors flex items-center hover:bg-foreground hover:text-background group"
                >
                    <motion.div
                        key={currentLanguage.code}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="flex items-center justify-center w-6 h-4 overflow-hidden flex-shrink-0 border-0"
                    >
                        <currentLanguage.FlagIcon
                            style={{width: "100%", height: "100%", display: "block"}}
                        />
                    </motion.div>
                    <span
                        className="text-sm font-medium text-foreground group-hover:text-background hidden sm:inline whitespace-nowrap">
            {currentLanguage.label}
          </span>
                    <span className="sr-only">Alternar idioma</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-48 bg-surface-container border-border"
            >
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`cursor-pointer text-sm py-2.5 flex items-center ${
                            i18n.language === lang.code
                                ? "bg-accent/10 text-accent font-medium"
                                : "hover:bg-foreground hover:text-background"
                        }`}
                    >
                        <div
                            className="mr-3 w-7 h-5 overflow-hidden flex items-center justify-center flex-shrink-0 border-0">
                            <lang.FlagIcon
                                style={{width: "100%", height: "100%", display: "block"}}
                            />
                        </div>
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
