/* =============================================================================
   AnimatedBackground - Editorial High-End
   
   DESIGN:
   - Gradiente sutil do topo para o fundo
   - Ruído de textura muito sutil para dar profundidade
   - Sem orbs ou animações pesadas - minimalista
   - Performance otimizada para mobile e desktop
   ============================================================================= */

export const AnimatedBackground = () => {
  return (
    <div className="minimal-background">
      {/* Base background */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle gradient overlay - top accent glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[40vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Subtle gradient overlay - bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--accent) / 0.03) 0%, transparent 100%)",
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
