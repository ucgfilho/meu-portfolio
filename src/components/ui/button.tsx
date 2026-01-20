import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* =============================================================================
   Button Component - Material 3 Expressive
   
   Variantes seguindo M3 guidelines:
   - filled: ação primária, usa cor primary
   - tonal: ação secundária, usa surface-container com cor primary
   - outlined: ação terciária, borda visível
   - text: ação de menor ênfase
   - elevated: com sombra sutil (M3 elevation)
   
   ACESSIBILIDADE:
   - Todos os botões têm focus-visible ring para navegação por teclado
   - Contraste mínimo de 4.5:1 (WCAG AA)
   - Estado disabled com opacity reduzida e pointer-events desabilitado
   ============================================================================= */

const buttonVariants = cva(
  /* Base styles: rounded-2xl para M3 Expressive, transições suaves */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 ease-m3-emphasized focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* M3 Filled Button: Ação primária de maior destaque
           Usa cor primary com foreground contrastante */
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-elevation-2 active:scale-[0.98]",

        /* M3 Tonal Button: Ação secundária
           Background sutil com cor primária no texto */
        tonal:
          "bg-primary/15 text-primary hover:bg-primary/25 active:scale-[0.98]",

        /* M3 Outlined Button: Ação terciária
           Borda visível, fundo transparente */
        outline:
          "border border-outline bg-transparent text-foreground hover:bg-primary/8 hover:border-primary/50 active:scale-[0.98]",

        /* M3 Text Button: Menor ênfase
           Sem fundo, apenas texto com hover state */
        ghost: "hover:bg-primary/8 hover:text-primary active:scale-[0.98]",

        /* M3 Elevated Button: Com sombra
           Para dar mais destaque que outlined mas menos que filled */
        elevated:
          "bg-surface-container text-foreground shadow-elevation-1 hover:shadow-elevation-2 hover:bg-surface-container-high active:scale-[0.98]",

        /* Destructive: Para ações perigosas */
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",

        /* Link style */
        link: "text-primary underline-offset-4 hover:underline",

        /* Hero variants: CTAs principais do portfolio
           Gradiente expressivo com glow effect */
        hero: "bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-elevation-3 hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.98]",

        /* Hero Outlined: CTA secundário */
        heroOutline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:scale-[1.02] font-semibold active:scale-[0.98]",

        /* Glow variant: Para elementos de destaque especial */
        glow: "bg-primary text-primary-foreground font-semibold shadow-glow-primary hover:shadow-glow-secondary hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
