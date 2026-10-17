/* =============================================================================
   AnimatedBackground — Architectural Grid & Subtle Luminance
   - Zero-JS CSS rendering for optimal LCP/INP and zero GPU overhead
   - Subtle architectural coordinate grid with smooth radial vignette
   ============================================================================= */

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background" aria-hidden="true">
      {/* Subtle architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, #000 20%, transparent 100%)",
        }}
      />
      {/* Top ambient luminance */}
      <div
        className="absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, hsl(var(--foreground) / 0.045), transparent 75%)",
        }}
      />
    </div>
  );
};

