import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/utils';

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-500" />
        <input
          type="text"
          className={cn(
            'flex w-full h-12 pl-10 rounded-md border border-input text-darker-gray outline-none bg-white p-4 text-base ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export {  SearchInput };
