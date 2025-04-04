import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const formErrorVariants = cva(
  "text-sm font-medium text-destructive", 
  {
    variants: {
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface FormErrorProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formErrorVariants> {
  id?: string;
  message?: string;
}

const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, id, message, size, children, ...props }, ref) => {
    if (!message && !children) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={id}
        className={cn(formErrorVariants({ size, className }))}
        {...props}
      >
        {message || children}
      </p>
    );
  }
);

FormError.displayName = "FormError";

export { FormError, formErrorVariants }; 