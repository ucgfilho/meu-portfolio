import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* =============================================================================
   Button Component - iOS 26 Liquid Glass
   
   Botões com estilo "Transparent Liquid Glass":
   - Parecem feitos de vidro cristalino ou água
   - Sem cores de fundo sólidas
   - Box-shadow interno branco para simular reflexo de luz (specular)
   - Hover intensifica o brilho
   - Formato pill (rounded-full)
   - Animações spring para feedback tátil
   ============================================================================= */

const buttonVariants = cva(
  /* Base: rounded-full (pill), glass backdrop, transições spring */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 ease-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Liquid Glass Primary - vidro com tom primário */
        default: [
          "bg-white/[0.08] text-foreground",
          "border border-white/[0.12]",
          "shadow-[inset_0_1px_1px_0_hsl(0_0%_100%/0.15),0_0_0_1px_hsl(0_0%_0%/0.05)]",
          "backdrop-blur-xl",
          "hover:bg-white/[0.15]",
          "hover:shadow-[inset_0_1px_2px_0_hsl(0_0%_100%/0.25),0_4px_20px_-4px_hsl(var(--primary)/0.3)]",
          "hover:border-white/[0.2]",
          "active:scale-[0.97]",
        ].join(" "),

        /* Liquid Glass Tonal - com cor primária sutil */
        tonal: [
          "bg-primary/[0.1] text-primary",
          "border border-primary/[0.15]",
          "shadow-[inset_0_1px_1px_0_hsl(var(--primary)/0.2)]",
          "backdrop-blur-xl",
          "hover:bg-primary/[0.18]",
          "hover:shadow-[inset_0_1px_2px_0_hsl(var(--primary)/0.3),0_4px_20px_-4px_hsl(var(--primary)/0.4)]",
          "active:scale-[0.97]",
        ].join(" "),

        /* Liquid Glass Outline - apenas borda de luz */
        outline: [
          "bg-transparent text-foreground",
          "border border-white/[0.15]",
          "shadow-[inset_0_1px_1px_0_hsl(0_0%_100%/0.1)]",
          "hover:bg-white/[0.05]",
          "hover:border-white/[0.25]",
          "hover:shadow-[inset_0_1px_2px_0_hsl(0_0%_100%/0.2)]",
          "active:scale-[0.97]",
        ].join(" "),

        /* Ghost - mínimo, apenas hover state */
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-white/[0.05]",
          "active:scale-[0.97]",
        ].join(" "),

        /* Destructive - liquid glass vermelho */
        destructive: [
          "bg-destructive/[0.15] text-destructive",
          "border border-destructive/[0.2]",
          "shadow-[inset_0_1px_1px_0_hsl(var(--destructive)/0.2)]",
          "backdrop-blur-xl",
          "hover:bg-destructive/[0.25]",
          "hover:shadow-[inset_0_1px_2px_0_hsl(var(--destructive)/0.3),0_4px_20px_-4px_hsl(var(--destructive)/0.4)]",
          "active:scale-[0.97]",
        ].join(" "),

        /* Link style */
        link: "text-primary underline-offset-4 hover:underline",

        /* Hero CTA - Liquid glass com glow Aurora */
        hero: [
          "bg-white/[0.08] text-foreground font-semibold",
          "border border-white/[0.15]",
          "shadow-[inset_0_1px_2px_0_hsl(0_0%_100%/0.2),0_0_20px_-5px_hsl(var(--primary)/0.3)]",
          "backdrop-blur-xl",
          "hover:bg-white/[0.15]",
          "hover:border-white/[0.25]",
          "hover:shadow-[inset_0_2px_4px_0_hsl(0_0%_100%/0.3),0_0_40px_-5px_hsl(var(--primary)/0.5)]",
          "hover:scale-[1.03]",
          "active:scale-[0.97]",
        ].join(" "),

        /* Hero Outline - CTA secundário */
        heroOutline: [
          "bg-transparent text-foreground font-semibold",
          "border-2 border-white/[0.2]",
          "shadow-[inset_0_1px_1px_0_hsl(0_0%_100%/0.15)]",
          "hover:bg-white/[0.08]",
          "hover:border-white/[0.35]",
          "hover:shadow-[inset_0_1px_2px_0_hsl(0_0%_100%/0.25),0_0_30px_-5px_hsl(var(--secondary)/0.4)]",
          "hover:scale-[1.03]",
          "active:scale-[0.97]",
        ].join(" "),

        /* Glow - destaque especial com aurora glow */
        glow: [
          "bg-white/[0.1] text-foreground font-semibold",
          "border border-white/[0.2]",
          "shadow-[inset_0_1px_2px_0_hsl(0_0%_100%/0.25),0_0_30px_-5px_hsl(var(--primary)/0.4)]",
          "backdrop-blur-xl",
          "hover:bg-white/[0.18]",
          "hover:shadow-[inset_0_2px_4px_0_hsl(0_0%_100%/0.35),0_0_50px_-5px_hsl(var(--primary)/0.6)]",
          "hover:scale-[1.03]",
          "active:scale-[0.97]",
        ].join(" "),
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
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
