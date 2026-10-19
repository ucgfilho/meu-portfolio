import {createRoot, hydrateRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/i18n";

if (typeof window !== "undefined" && "trustedTypes" in window) {
    const tt = (
        window as unknown as {
            trustedTypes?: {
                defaultPolicy?: unknown;
                createPolicy?: (
                    name: string,
                    rules: Record<string, (input: string) => string>,
                ) => unknown;
            };
        }
    ).trustedTypes;
    if (tt && !tt.defaultPolicy && typeof tt.createPolicy === "function") {
        try {
            tt.createPolicy("default", {
                createHTML: (s: string) => s,
                createScriptURL: (s: string) => s,
                createScript: (s: string) => s,
            });
        } catch {
            // Ignore if default policy is already registered
        }
    }
}

if (typeof document !== "undefined") {
    const fontSheet = document.getElementById("google-fonts-stylesheet") as HTMLLinkElement | null;
    if (fontSheet && fontSheet.media === "print") {
        fontSheet.media = "all";
    }
}

const rootEl = document.getElementById("root")!;
const savedLang = (() => {
    try {
        return typeof window !== "undefined" ? window.localStorage?.getItem("language") : null;
    } catch {
        return null;
    }
})();

if (
    rootEl.hasChildNodes() &&
    typeof window !== "undefined" &&
    window.location.pathname === "/" &&
    (!savedLang || savedLang === "pt-BR")
) {
    hydrateRoot(rootEl, <App/>);
} else {
    createRoot(rootEl).render(<App/>);
}
