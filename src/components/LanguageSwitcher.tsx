import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BR from "country-flag-icons/react/3x2/BR";
import US from "country-flag-icons/react/3x2/US";
import ES from "country-flag-icons/react/3x2/ES";

/* =============================================================================
   LanguageSwitcher - iOS 26 Liquid Glass
   
   DESIGN:
   - Dropdown menu com glassmorphism
   - Ícone de globo com animações fluidas
   - Liquid Glass hover effects
   ============================================================================= */

const languages = [
  { code: "pt-BR", label: "Português", shortLabel: "PT", FlagIcon: BR },
  { code: "en", label: "English", shortLabel: "EN", FlagIcon: US },
  { code: "es", label: "Español", shortLabel: "ES", FlagIcon: ES },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

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
          className="relative h-11 px-4 rounded-full gap-2.5 hover:scale-105 transition-transform flex items-center"
          style={{
            background: "hsl(0 0% 100% / 0.08)",
            border: "1px solid hsl(0 0% 100% / 0.15)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1), 0 0 20px -5px hsl(var(--primary) / 0.2)",
          }}
        >
          <motion.div
            key={currentLanguage.code}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center w-7 h-5 rounded overflow-hidden shadow-sm flex-shrink-0"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.2)",
            }}
          >
            <currentLanguage.FlagIcon
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </motion.div>
          <span className="text-sm font-medium text-foreground hidden sm:inline whitespace-nowrap">
            {currentLanguage.label}
          </span>
          <span className="sr-only">Alternar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48"
        style={{
          background: "hsl(var(--background) / 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid hsl(0 0% 100% / 0.1)",
          boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.3)",
        }}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer text-base py-3 flex items-center ${
              i18n.language === lang.code
                ? "bg-primary/15 text-primary font-medium"
                : ""
            }`}
          >
            <div
              className="mr-3 w-8 h-6 rounded overflow-hidden shadow-sm flex items-center justify-center flex-shrink-0"
              style={{
                border: `1px solid ${i18n.language === lang.code ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))"}`,
              }}
            >
              <lang.FlagIcon
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </div>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
