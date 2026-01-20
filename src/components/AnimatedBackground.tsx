import { motion } from "framer-motion";

/* =============================================================================
   AnimatedBackground - Material 3 Expressive
   
   DESIGN:
   - Gradientes sutis usando as cores primary, secondary e tertiary
   - Movimento orgânico e fluido seguindo M3 Motion principles
   - Opacidade reduzida para não competir com o conteúdo
   
   PERFORMANCE:
   - Usa will-change implícito do Framer Motion
   - Blobs posicionados com fixed para evitar reflow
   ============================================================================= */

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - M3 surface com gradientes sutis */}
      <div className="absolute inset-0 animated-bg" />

      {/* Animated blobs - cores M3 expressivas com opacidade reduzida */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.3) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--tertiary) / 0.3) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid pattern overlay - muito sutil para textura */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};
