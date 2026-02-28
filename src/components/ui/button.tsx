import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Primary: blue with subtle glow */
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-primary active:scale-[0.98]",
        /** Default alias → primary */
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-primary active:scale-[0.98]",
        /** Secondary: surface with border */
        secondary:
          "bg-surface-elevated text-foreground border border-border hover:bg-accent active:scale-[0.98]",
        /** Ghost: transparent, foreground on hover */
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-foreground active:scale-[0.98]",
        /** Danger: red with glow on hover */
        danger:
          "bg-danger text-danger-foreground hover:bg-danger/90 hover:shadow-glow-danger active:scale-[0.98]",
        /** Destructive: alias for danger */
        destructive:
          "bg-danger text-danger-foreground hover:bg-danger/90 hover:shadow-glow-danger active:scale-[0.98]",
        /** Outline: border-only */
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent active:scale-[0.98]",
        /** Link */
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-9 px-4 py-2",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
