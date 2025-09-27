import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium text-base outline-none ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          '80%, 42%, 1)] 85%, 34%, 1)] bg-primary text-primary-foreground hover:bg-[hsla(212, active:bg-[hsla(216,',
        warning: 'bg-destructive text-destructive-foreground',
        outline:
          '80%, 42%, 1)] 85%, 34%, 1)] bg-transparent hover:text-[hsla(212, active:text-[hsla(216,',
        secondary: 'bg-secondary text-primary',
      },
      size: {
        sm: 'h-9 rounded-sm p-2',
        lg: 'h-11 rounded-md px-4',
        md: 'h-10 rounded-md px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type="button"
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
