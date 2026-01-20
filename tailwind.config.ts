import type { Config } from "tailwindcss";

/* =============================================================================
   Tailwind Config - Material 3 Expressive Design System
   
   Este arquivo configura o Tailwind CSS para seguir as diretrizes do
   Material 3 Expressive, incluindo:
   - Tokens de cor semânticos (primary, secondary, tertiary, surface levels)
   - Tipografia SF Pro com hierarquia clara
   - Border radius expressivos (M3 usa cantos mais arredondados)
   - Animações seguindo M3 Motion guidelines
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
         Cores - Material 3 Expressive Token System
         
         Organização semântica: primary, secondary, tertiary para ações e destaques
         Surface hierarchy para criar profundidade visual sem sombras pesadas
         ----------------------------------------------------------------------- */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        /* Primary: cor principal para CTAs e elementos de destaque */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        /* Secondary: cor complementar para ações secundárias */
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        /* Tertiary: cor expressiva para personalidade (M3 Expressive) */
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

        /* Surface Hierarchy - M3 Tonal Elevation
           Superfícies usam variação de tonalidade para indicar elevação */
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

        /* Outline colors para bordas e divisores */
        outline: {
          DEFAULT: "hsl(var(--outline))",
          variant: "hsl(var(--outline-variant))",
        },
      },

      /* -----------------------------------------------------------------------
         Border Radius - M3 Expressive
         
         Material 3 Expressive usa cantos mais arredondados para criar
         uma linguagem visual mais suave e expressiva.
         ----------------------------------------------------------------------- */
      borderRadius: {
        "4xl": "2rem",
        "3xl": "1.5rem",
        "2xl": "1rem",
        xl: "0.875rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* -----------------------------------------------------------------------
         Tipografia - SF Pro (San Francisco)
         
         SF Pro é otimizada para legibilidade em interfaces digitais.
         - Display: para títulos grandes
         - Text: para corpo de texto
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

      /* -----------------------------------------------------------------------
         Keyframes - M3 Motion Guidelines
         
         Material 3 define curvas de easing específicas:
         - emphasized: cubic-bezier(0.4, 0, 0.2, 1) - transições principais
         - standard: cubic-bezier(0.2, 0, 0, 1) - maioria das animações
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
        /* Fade in com movimento sutil - entrada de elementos */
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* Fade in lateral - para listas e cards */
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        /* Scale in - para modais e popovers */
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        /* Pulse suave - para indicadores de status */
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        /* Float - movimento sutil contínuo */
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        /* Gradient shift - para backgrounds animados */
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        /* Shimmer - efeito de carregamento */
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      /* -----------------------------------------------------------------------
         Animations - Combinação de keyframes com timing M3
         ----------------------------------------------------------------------- */
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0, 0, 0, 1) forwards",
        "fade-in-right": "fade-in-right 0.5s cubic-bezier(0, 0, 0, 1) forwards",
        "scale-in": "scale-in 0.2s cubic-bezier(0, 0, 0, 1) forwards",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        shimmer: "shimmer 2s linear infinite",
      },

      /* -----------------------------------------------------------------------
         Box Shadow - M3 Elevation Levels
         
         Sombras sutis para dark mode, seguindo M3 elevation guidelines.
         ----------------------------------------------------------------------- */
      boxShadow: {
        "elevation-1": "var(--shadow-1)",
        "elevation-2": "var(--shadow-2)",
        "elevation-3": "var(--shadow-3)",
        "elevation-4": "var(--shadow-4)",
        "elevation-5": "var(--shadow-5)",
        "glow-primary": "var(--glow-primary)",
        "glow-secondary": "var(--glow-secondary)",
        "glow-tertiary": "var(--glow-tertiary)",
      },

      /* Transition timing functions M3 */
      transitionTimingFunction: {
        "m3-emphasized": "cubic-bezier(0.4, 0, 0.2, 1)",
        "m3-standard": "cubic-bezier(0.2, 0, 0, 1)",
        "m3-decelerated": "cubic-bezier(0, 0, 0, 1)",
        "m3-accelerated": "cubic-bezier(0.3, 0, 1, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
