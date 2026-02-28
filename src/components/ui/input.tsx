import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  /** Shows danger border + ring */
  error?: boolean;
  /** Shows success border + check icon */
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border bg-surface px-3 py-2 text-sm",
          "text-foreground placeholder:text-muted-foreground",
          "transition-colors duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-1",
          /* State: default */
          !error && !success && "border-border focus-visible:border-primary focus-visible:ring-primary/30",
          /* State: error */
          error && "border-danger focus-visible:ring-danger/30",
          /* State: success */
          success && "border-success focus-visible:ring-success/30",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
