'use client';

import { cn } from '@/utils';
import { Search } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Label } from '../ui/label';

import { SectionLoading } from '../layouts/loading';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';

const SearchInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
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
            'flex bg-white w-full h-12 p-4 pl-10 rounded-md border border-input placeholder:text-darker-gray text-neutral-black outline-none text-base disabled:cursor-not-allowed disabled:opacity-50',
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

type Option = {
  label: string;
  value: string;
};

interface SearchFilterProps {
  label: string;
  getOptions: (value: string) => Promise<Option[]>;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ label, getOptions }) => {
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, 700);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <PopoverFilter
      getOptions={getOptions}
      debouncedValue={debouncedValue}
      inputRef={inputRef as React.RefObject<HTMLInputElement>}
    >
      <Label className="block text-left">{label}</Label>
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        ref={inputRef}
      />
    </PopoverFilter>
  );
};

const PopoverFilter: React.FC<
  React.PropsWithChildren<{
    getOptions: (value: string) => Promise<Option[]>;
    debouncedValue: string;
    inputRef: React.RefObject<HTMLInputElement>;
  }>
> = ({ children, getOptions, debouncedValue, inputRef }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        if (debouncedValue) {
          const options = await getOptions(debouncedValue);
          setOptions(options);
          if (!open) {
            setOpen(true);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptions();
  }, [debouncedValue]);

  return (
    <Popover
      open={open}
      onOpenChange={(state) => {
        if (state) {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }
        setOpen(state);
      }}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        {!isLoading && (
          <ScrollArea className="max-h-[min(30rem,50vh)]">
            {options.map((option) => (
              <p
                key={option.value}
                className={cn(
                  'relative flex cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                  'hover:bg-hover-gray min-h-12'
                )}
              >
                {option.label}
              </p>
            ))}
            {options.length === 0 && (
              <p className="text-sm text-center text-darker-gray">No results found</p>
            )}
          </ScrollArea>
        )}
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={`${index}-loading`} className="h-12 w-full px-4 py-1.5" />
          ))}
      </PopoverContent>
    </Popover>
  );
};

export { SearchInput };
