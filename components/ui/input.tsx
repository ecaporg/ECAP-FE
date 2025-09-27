import * as React from 'react';

import { cn } from '@/utils';

export interface InputProps extends React.ComponentProps<'input'> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-md border border-input bg-white p-4 text-base text-neutral-black outline-none ring-offset-white file:border-0 file:bg-white file:font-medium file:text-foreground file:text-sm placeholder:text-darker-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          '[&[aria-invalid=true]]:border-red-500 [&[aria-invalid=true]]:ring-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
