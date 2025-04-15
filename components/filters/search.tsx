import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/utils';

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <label
          className="contents cursor-pointer"
          htmlFor={props.id}
          aria-label={props.placeholder}
        >
          <Search className="absolute left-3 size-5 text-darker-gray" />
        </label>
        <input
          type="text"
          className={cn(
            'flex w-full h-12 p-4 pl-10 rounded-md border border-input placeholder:text-darker-gray text-neutral-black outline-none text-base disabled:cursor-not-allowed disabled:opacity-50',
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

export { SearchInput };
