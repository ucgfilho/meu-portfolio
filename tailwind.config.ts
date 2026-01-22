import type { Config } from "tailwindcss";

/* =============================================================================
   Tailwind Config - iOS 26 Liquid Glass Design System
   
   - Animações com física Spring (mola) estilo Apple
   - Transições elásticas e fluidas
   - Tokens de cor para glassmorphism
   ============================================================================= */

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* -----------------------------------------------------------------------
         Cores - iOS 26 Liquid Glass Token System
         ----------------------------------------------------------------------- */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        surface: {
          DEFAULT: "hsl(var(--surface))",
          dim: "hsl(var(--surface-dim))",
          bright: "hsl(var(--surface-bright))",
          "container-lowest": "hsl(var(--surface-container-lowest))",
          "container-low": "hsl(var(--surface-container-low))",
          container: "hsl(var(--surface-container))",
          "container-high": "hsl(var(--surface-container-high))",
          "container-highest": "hsl(var(--surface-container-highest))",
        },

        outline: {
          DEFAULT: "hsl(var(--outline))",
          variant: "hsl(var(--outline-variant))",
        },
      },

      /* -----------------------------------------------------------------------
         Border Radius - Liquid glass curves
         ----------------------------------------------------------------------- */
      borderRadius: {
        "4xl": "2.5rem",
        "3xl": "2rem",
        "2xl": "1.25rem",
        xl: "1rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* -----------------------------------------------------------------------
         Tipografia - SF Pro com tracking leve
         ----------------------------------------------------------------------- */
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          '"SF Pro Text"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: ['"SF Mono"', '"JetBrains Mono"', '"Fira Code"', "monospace"],
      },

      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        wide: "0.01em",
        wider: "0.02em",
      },

      /* -----------------------------------------------------------------------
         Keyframes - Spring Physics (Apple-style)
         
         Animações com sensação elástica e fluida usando curvas spring
         ----------------------------------------------------------------------- */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        /* Fade in com spring bounce */
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-24px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        /* Scale in com spring */
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        /* Pulse suave - aurora breathing */
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.02)" },
        },
        /* Float - movimento orgânico */
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" },
        },
        /* Aurora orb movement - muito suave */
        "aurora-drift": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(30px, -40px) scale(1.1)" },
          "50%": { transform: "translate(-20px, -60px) scale(0.95)" },
          "75%": { transform: "translate(-40px, -20px) scale(1.05)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        /* Shimmer - reflexo de luz */
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        /* Glow pulse - brilho pulsante */
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", filter: "blur(60px)" },
          "50%": { opacity: "0.8", filter: "blur(80px)" },
        },
      },

      /* -----------------------------------------------------------------------
         Animations - Spring timing com sensação elástica
         ----------------------------------------------------------------------- */
      animation: {
        "accordion-down": "accordion-down 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "accordion-up": "accordion-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "fade-in-right": "fade-in-right 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "pulse-soft": "pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "aurora-drift": "aurora-drift 20s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },

      /* -----------------------------------------------------------------------
         Box Shadow - Glass effects & glows
         ----------------------------------------------------------------------- */
      boxShadow: {
        /* Glass inner glow */
        "glass-inner": "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1)",
        "glass-inner-strong": "inset 0 2px 4px 0 hsl(0 0% 100% / 0.2)",
        /* Outer glows */
        "glow-sm": "0 0 20px hsl(var(--primary) / 0.2)",
        "glow-md": "0 0 40px hsl(var(--primary) / 0.3)",
        "glow-lg": "0 0 60px hsl(var(--primary) / 0.4)",
        /* Aurora shadows */
        aurora: "0 8px 32px -8px hsl(var(--primary) / 0.2), 0 0 0 1px hsl(0 0% 100% / 0.05)",
      },

      /* -----------------------------------------------------------------------
         Transition timing - Spring physics curves
         ----------------------------------------------------------------------- */
      transitionTimingFunction: {
        /* Apple-style spring curves */
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring-soft": "cubic-bezier(0.22, 1.2, 0.36, 1)",
        "spring-bounce": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        /* Smooth deceleration */
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
      },

      /* -----------------------------------------------------------------------
         Backdrop blur - Glass effects
         ----------------------------------------------------------------------- */
      backdropBlur: {
        glass: "40px",
        "glass-light": "20px",
        "glass-heavy": "60px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
