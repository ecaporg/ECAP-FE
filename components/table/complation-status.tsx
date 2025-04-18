import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/utils";

const statusVariants = cva(
  "text-center content-center w-[7.5rem] h-12 text-lg rounded-[3.125rem]",
  {
    variants: {
      variant: {
        Complete: "bg-success text-success-foreground",
        Overdue: "bg-red-light text-red-accent",
        Pending: "bg-amber-light text-amber-pending",
        "In Progress": "bg-primary-light text-primary",
      },
    },
    defaultVariants: {
      variant: "Complete",
    },
  }
);

export interface CompletionStatusProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof statusVariants> {}

function CompletionStatus({
  className,
  variant,
  ...props
}: CompletionStatusProps) {
  return (
    <p
      className={cn(statusVariants({ variant }), className)}
      children={variant}
      {...props}
    />
  );
}

export { CompletionStatus, statusVariants };
