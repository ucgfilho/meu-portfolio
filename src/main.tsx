import {createRoot} from "react-dom/client";
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

createRoot(document.getElementById("root")!).render(<App/>);
