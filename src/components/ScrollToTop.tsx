import {AnimatePresence, motion} from "framer-motion";
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

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Voltar ao topo"
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 12}}
                    transition={{duration: 0.2}}
                    className="fixed bottom-6 right-6 z-40 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm border border-border-strong bg-surface-elevated/95 backdrop-blur-md text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 cursor-pointer shadow-panel"
                >
                    <ArrowUp className="w-4 h-4"/>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

