import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* =============================================================================
   AnimatedBackground - iOS 26 Liquid Glass
   
   DESIGN:
   - Deep Space Black background
   - Aurora Borealis orbs com gradientes animados e muito desfocados
   - Background fixo (não acompanha o scroll)
   - Otimizado para mobile (remove animações pesadas)
   ============================================================================= */

export const AnimatedBackground = () => {
  const isMobile = useIsMobile();

  // Mobile: Versão estática e leve para evitar travamentos
  if (isMobile) {
    return (
      <div className="aurora-background">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-background" />

        {/* Static gradients for mobile */}
        <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-full h-[50%] bg-gradient-to-t from-secondary/10 to-transparent blur-3xl opacity-30" />

        {/* Simple Orb 1 */}
        <div
          className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-20"
          style={{ background: "hsl(var(--primary))" }}
        />

        {/* Simple Orb 2 */}
        <div
          className="absolute bottom-[20%] right-[5%] w-[250px] h-[250px] rounded-full blur-[80px] opacity-15"
          style={{ background: "hsl(var(--secondary))" }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  }

  // Desktop: Versão animada completa
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
          x: [0, 50, -30, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
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
          x: [0, -40, 25, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
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
          x: [0, 35, -50, 0],
          y: [0, -35, 50, 0],
          scale: [1, 1.08, 0.97, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
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
          x: [0, -25, 40, 0],
          y: [0, 35, -25, 0],
          scale: [1, 0.97, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4.5,
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
          x: [0, 18, -18, 0],
          y: [0, -25, 18, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
