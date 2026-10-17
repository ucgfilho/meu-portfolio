import type {Config} from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/* =============================================================================
   Tailwind Config - Swiss Editorial Technical Design System
   
   - Display/Headings: Space Grotesk
   - Body/UI: IBM Plex Sans
   - Technical/Metadata/Code: JetBrains Mono
   - Architectural tokens & disciplined elevation
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
            padding: {
                DEFAULT: "1.25rem",
                sm: "1.5rem",
                lg: "2rem",
            },
            screens: {
                "2xl": "1280px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                "border-strong": "hsl(var(--border-strong))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: {
                    DEFAULT: "hsl(var(--background))",
                    elevated: "hsl(var(--background-elevated))",
                },
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

                status: {
                    online: "hsl(var(--status-online))",
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

            borderRadius: {
                "2xl": "0.5rem",
                xl: "0.375rem",
                lg: "0.25rem",
                md: "0.1875rem",
                sm: "0.125rem",
            },

            fontFamily: {
                display: [
                    '"Space Grotesk"',
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "sans-serif",
                ],
                sans: [
                    '"IBM Plex Sans"',
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "sans-serif",
                ],
                mono: [
                    '"JetBrains Mono"',
                    '"Fira Code"',
                    "ui-monospace",
                    "SFMono-Regular",
                    "monospace",
                ],
            },

            fontSize: {
                display: [
                    "clamp(2.35rem, 5.5vw, 4.5rem)",
                    {lineHeight: "1.02", letterSpacing: "-0.035em"},
                ],
                "display-sm": [
                    "clamp(1.75rem, 3.5vw, 2.75rem)",
                    {lineHeight: "1.1", letterSpacing: "-0.025em"},
                ],
            },

            letterSpacing: {
                tighter: "-0.035em",
                tight: "-0.02em",
                normal: "0",
                wide: "0.025em",
                wider: "0.08em",
                widest: "0.16em",
            },

            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
                "fade-in": {
                    "0%": {opacity: "0"},
                    "100%": {opacity: "1"},
                },
                "pulse-soft": {
                    "0%, 100%": {opacity: "1"},
                    "50%": {opacity: "0.45"},
                },
            },

            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.3s ease-out forwards",
                "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
            },

            boxShadow: {
                panel: "0 1px 0 0 hsl(var(--border)), 0 12px 32px -12px rgba(0, 0, 0, 0.5)",
                elevated: "0 16px 40px -12px rgba(0, 0, 0, 0.65)",
            },

            transitionTimingFunction: {
                smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
                "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
            },

            transitionDuration: {
                "250": "250ms",
            },
        },
    },
    plugins: [tailwindcssAnimate],
} satisfies Config;

