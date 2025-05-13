import * as React from 'react';

import { cn } from '@/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-28 w-full rounded-md border border-input bg-[#F3F3F3] p-4 text-base ring-offset-white placeholder:text-darker-gray text-neutral-black outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          '[&[aria-invalid=true]]:border-red-500 [&[aria-invalid=true]]:ring-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
