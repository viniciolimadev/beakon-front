import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        /** Default: primary brand color */
        default: "bg-primary/15 text-primary border border-primary/25",
        /** Success: green semantic */
        success: "bg-success/10 text-success border border-success/20",
        /** Warning: yellow/amber semantic */
        warning: "bg-warning/10 text-warning border border-warning/20",
        /** Danger: red semantic */
        danger: "bg-danger/10 text-danger border border-danger/20",
        /** Muted: subtle secondary info */
        muted: "bg-surface-elevated text-muted-foreground border border-border",
        /** Outline: border only */
        outline: "border border-border text-foreground",
        /** Legacy aliases */
        secondary: "bg-surface-elevated text-muted-foreground border border-border",
        destructive: "bg-danger/10 text-danger border border-danger/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional colored dot prefix */
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "danger" && "bg-danger",
            variant === "muted" || variant === "secondary"
              ? "bg-muted-foreground"
              : "",
            variant === "default" && "bg-primary"
          )}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
