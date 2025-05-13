import * as React from 'react';

import { cn } from '@/utils';

export interface InputProps extends React.ComponentProps<'input'> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full h-11 rounded-md border border-input placeholder:text-darker-gray text-neutral-black outline-none bg-white p-4 text-base ring-offset-white file:border-0 file:bg-white file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
