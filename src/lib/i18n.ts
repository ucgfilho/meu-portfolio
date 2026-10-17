import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import ptBR from "@/locales/pt-BR.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

const resources = {
    "pt-BR": {
        translation: ptBR,
    },
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
};

const getInitialLanguage = (): string => {
    try {
        if (typeof window !== "undefined" && typeof window.localStorage?.getItem === "function") {
            return window.localStorage.getItem("language") || "pt-BR";
        }
    } catch {
        // Fallback when localStorage is blocked or unavailable
    }
    return "pt-BR";
};

i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "pt-BR",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

