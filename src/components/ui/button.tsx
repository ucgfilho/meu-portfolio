import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

/* =============================================================================
   Button Component - Swiss Editorial Design System
   - Crisp borders, accessible touch targets (min 44px), stable hover states
   ============================================================================= */

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: [
                    "bg-foreground text-background border border-foreground",
                    "hover:bg-foreground/90",
                ].join(" "),

                outline: [
                    "bg-surface-container/60 text-foreground border border-border-strong",
                    "hover:bg-surface-elevated hover:border-foreground/50",
                ].join(" "),

                ghost: [
                    "bg-transparent text-foreground border border-transparent",
                    "hover:bg-surface-elevated hover:border-border",
                ].join(" "),

                secondary: [
                    "bg-surface-container text-foreground border border-border",
                    "hover:bg-surface-elevated hover:border-border-strong",
                ].join(" "),

                destructive: [
                    "bg-destructive text-destructive-foreground border border-destructive",
                    "hover:bg-destructive/90",
                ].join(" "),

                link: "text-foreground underline-offset-4 hover:underline p-0 h-auto",
            },
            size: {
                default: "min-h-[44px] h-11 px-5 py-2.5",
                sm: "min-h-[38px] h-9 px-3.5 text-xs",
                lg: "min-h-[48px] h-12 px-6 text-sm tracking-wide",
                xl: "min-h-[52px] h-14 px-8 text-base",
                icon: "min-h-[44px] min-w-[44px] h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export {Button, buttonVariants};

