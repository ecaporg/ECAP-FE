import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/utils';

const badgeVariants = cva(
  'rounded-[3.125rem] flex items-center gap-2 w-full px-4 py-2 h-auto text-xs',
  {
    variants: {
      variant: {
        success: 'bg-success text-success-foreground',
        red: 'bg-red-light text-red-accent',
        amber: 'bg-amber-light text-amber-pending',
        primary: 'bg-primary-light text-primary',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
