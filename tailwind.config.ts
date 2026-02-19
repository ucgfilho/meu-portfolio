import type { Config } from "tailwindcss";

/* =============================================================================
   Tailwind Config - Editorial High-End Design System
   
   - Tipografia Inter com pesos variados
   - Animações sutis e elegantes
   - Tokens minimalistas
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
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      /* -----------------------------------------------------------------------
         Cores - Editorial Design System
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
          elevated: "hsl(var(--surface-elevated))",
          container: "hsl(var(--surface-container))",
          "container-high": "hsl(var(--surface-container-high))",
        },
      },

      /* -----------------------------------------------------------------------
         Border Radius - Mais conservador
         ----------------------------------------------------------------------- */
      borderRadius: {
        "4xl": "2rem",
        "3xl": "1.5rem",
        "2xl": "1rem",
        xl: "0.75rem",
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },

      /* -----------------------------------------------------------------------
         Tipografia - Inter
         ----------------------------------------------------------------------- */
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },

      fontSize: {
        display: [
          "clamp(2.5rem, 10vw, 6rem)",
          { lineHeight: "0.9", letterSpacing: "-0.04em" },
        ],
        "display-sm": [
          "clamp(1.5rem, 5vw, 3rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
      },

      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.025em",
        wider: "0.1em",
        widest: "0.2em",
      },

      /* -----------------------------------------------------------------------
         Keyframes - Sutis e Elegantes
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },

      /* -----------------------------------------------------------------------
         Animations
         ----------------------------------------------------------------------- */
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in-down": "fade-in-down 0.6s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
      },

      /* -----------------------------------------------------------------------
         Box Shadow
         ----------------------------------------------------------------------- */
      boxShadow: {
        "glow-sm": "0 0 20px -5px hsl(var(--accent) / 0.3)",
        "glow-md": "0 0 40px -10px hsl(var(--accent) / 0.4)",
        "glow-lg": "0 0 60px -15px hsl(var(--accent) / 0.5)",
        card: "0 4px 20px -5px hsl(0 0% 0% / 0.1)",
        "card-hover": "0 20px 40px -20px hsl(var(--accent) / 0.2)",
      },

      /* -----------------------------------------------------------------------
         Transition
         ----------------------------------------------------------------------- */
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
        "smooth-in": "cubic-bezier(0.4, 0, 1, 1)",
      },

      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
