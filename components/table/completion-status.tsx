import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/utils';

const statusVariants = cva(
  'h-12 w-[7.5rem] content-center rounded-[3.125rem] text-center text-lg',
  {
    variants: {
      variant: {
        Complete: 'bg-success text-success-foreground',
        Overdue: 'bg-red-light text-red-accent',
        Pending: 'bg-amber-light text-amber-pending',
        'In Progress': 'bg-primary-light text-primary',
      },
    },
    defaultVariants: {
      variant: 'Complete',
    },
  }
);

export interface CompletionStatusProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof statusVariants> {}

function CompletionStatus({ className, variant, ...props }: CompletionStatusProps) {
  return <p className={cn(statusVariants({ variant }), className)} children={variant} {...props} />;
}

export { CompletionStatus, statusVariants };
