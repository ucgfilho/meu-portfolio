import Aurora from "./Aurora";

/* =============================================================================
   AnimatedBackground — Aurora (ReactBits)
   - Uses ogl-powered WebGL aurora shader
   - Dark-palette color stops to match #0a0a0a background
   ============================================================================= */

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Aurora
        colorStops={["#1c1c1c", "#212121", "#1c1c1c"]}
        blend={0.55}
        amplitude={0.55}
        speed={0.5}
      />
      <div className="absolute inset-0 bg-background/45 pointer-events-none" />
      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
