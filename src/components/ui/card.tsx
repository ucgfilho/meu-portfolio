import * as React from "react";

import {cn} from "@/lib/utils";

/* =============================================================================
   Card Component - Material 3 Expressive

   Três variantes de card seguindo M3:
   - Filled (default): Background sólido com surface-container
   - Outlined: Borda visível, fundo transparente
   - Elevated: Com sombra sutil para maior destaque

   DESIGN:
   - rounded-2xl: Cantos expressivos M3
   - Transições suaves com easing M3 emphasized
   - Hover states que usam tonal elevation (mudança de cor, não sombra)
   ============================================================================= */

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            /* M3 Filled Card: Surface container */
            "bg-card text-card-foreground",
            /* Transição M3 emphasized para hover states */
            "transition-all duration-300 ease-m3-emphasized",
            className,
        )}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({className, ...props}, ref) => (
    <h3
        ref={ref}
        className={cn(
            /* M3 Headline Small: semibold com tracking tight */
            "text-xl font-semibold leading-none tracking-tight text-foreground",
            className,
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={cn(
            /* M3 Body Medium: muted foreground para hierarquia */
            "text-sm text-muted-foreground leading-relaxed",
            className,
        )}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
