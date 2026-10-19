import {ArrowUp} from "lucide-react";
import {useEffect, useState} from "react";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 360);
        };

        window.addEventListener("scroll", toggleVisibility, {passive: true});
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="fixed bottom-6 right-6 z-40 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-border-strong bg-surface-elevated/95 backdrop-blur-md text-foreground hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer shadow-panel animate-fade-in"
        >
            <ArrowUp className="w-4 h-4" aria-hidden="true"/>
        </button>
    );
};

