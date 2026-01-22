import { motion } from "framer-motion";

/* =============================================================================
   AnimatedBackground - iOS 26 Liquid Glass
   
   DESIGN:
   - Deep Space Black background
   - Aurora Borealis orbs com gradientes animados e muito desfocados
   - Background fixo (não acompanha o scroll)
   - Movimento orgânico e fluido
   ============================================================================= */

export const AnimatedBackground = () => {
  return (
    <div className="aurora-background">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-background" />

      {/* Aurora Orb 1 - Primary (top-left) */}
      <motion.div
        className="aurora-orb w-[600px] h-[600px] opacity-30"
        style={{
          top: "5%",
          left: "10%",
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Orb 2 - Secondary (top-right) */}
      <motion.div
        className="aurora-orb w-[500px] h-[500px] opacity-25"
        style={{
          top: "15%",
          right: "5%",
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.5) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Aurora Orb 3 - Tertiary (center) */}
      <motion.div
        className="aurora-orb w-[700px] h-[700px] opacity-20"
        style={{
          top: "40%",
          left: "30%",
          background:
            "radial-gradient(circle, hsl(var(--tertiary) / 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Aurora Orb 4 - Primary/Secondary blend (bottom) */}
      <motion.div
        className="aurora-orb w-[550px] h-[550px] opacity-25"
        style={{
          bottom: "10%",
          right: "20%",
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--secondary) / 0.2) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Smaller accent orbs */}
      <motion.div
        className="aurora-orb w-[300px] h-[300px] opacity-20"
        style={{
          top: "70%",
          left: "5%",
          background:
            "radial-gradient(circle, hsl(var(--tertiary) / 0.5) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Noise texture overlay - muito sutil */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
