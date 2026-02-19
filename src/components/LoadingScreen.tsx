import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

/* =============================================================================
   LoadingScreen - Material 3 Expressive
   
   DESIGN:
   - Background usando a cor de fundo M3 dark
   - Spinner com cores primary, secondary e tertiary
   - Animações suaves seguindo M3 motion guidelines
   
   ACESSIBILIDADE:
   - Texto de carregamento para screen readers
   ============================================================================= */

export const LoadingScreen = ({onComplete}: { onComplete: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                    /* M3 Surface background color */
                    className="dark fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground"
                    role="status"
                    aria-label="Carregando portfólio"
                >
                    <div className="text-center">
                        {/* Animated logo - M3 style */}
                        <motion.div
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{duration: 0.3}}
                            className="relative mb-8"
                        >
                            {/* Glow effect - M3 primary color */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    boxShadow: "0 0 40px hsl(var(--primary) / 0.3)",
                                }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.4, 0.7, 0.4],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Outer ring */}
                            <motion.div
                                className="w-24 h-24 rounded-full border-4 border-surface-container-highest flex items-center justify-center"
                                animate={{rotate: 360}}
                                transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                            >
                                {/* Inner spinner with M3 colors */}
                                <motion.div
                                    className="w-16 h-16 rounded-full border-4 border-t-primary border-r-secondary border-b-tertiary border-l-transparent"
                                    animate={{rotate: -360}}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Text - M3 typography */}
                        <motion.div
                            initial={{opacity: 0, y: 15}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.3}}
                        >
                            <h2 className="text-2xl font-semibold gradient-text mb-3">
                                Carregando portfólio...
                            </h2>
                            {/* Loading dots */}
                            <motion.div
                                className="flex items-center justify-center gap-1.5"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 0.3, duration: 0.3}}
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-2 h-2 rounded-full bg-primary"
                                        animate={{scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5]}}
                                        transition={{
                                            duration: 0.6,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
