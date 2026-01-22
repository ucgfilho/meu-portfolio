import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full text-foreground transition-all duration-75"
          style={{
            background: "hsl(0 0% 100% / 0.08)",
            border: "1px solid hsl(0 0% 100% / 0.12)",
            backdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1)",
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "hsl(217 91% 60%)",
            borderColor: "hsl(217 91% 60%)",
            color: "#ffffff",
            boxShadow:
              "inset 0 1px 2px 0 hsl(0 0% 100% / 0.2), 0 8px 25px -5px hsl(217 91% 60% / 0.5)",
            transition: { duration: 0.05 },
          }}
          whileTap={{
            scale: 0.95,
            backgroundColor: "hsl(217 80% 50%)",
            borderColor: "hsl(217 80% 50%)",
            transition: { duration: 0.05 },
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
