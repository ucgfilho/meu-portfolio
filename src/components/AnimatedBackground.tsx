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
                colorStops={["#323232", "#323232", "#323232"]}
                blend={1}
                amplitude={1.0}
                speed={1}
            />
            {/* Noise texture for depth */}
            <div
                className="absolute inset-0 opacity-[0.018] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
