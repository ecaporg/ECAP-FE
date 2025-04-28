"use client";

import { cn } from "@/utils";
import { Search } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { Label } from "../ui/label";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverTrigger } from "../ui/popover";

const SearchInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
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
            "flex w-full h-12 p-4 pl-10 rounded-md border border-input placeholder:text-darker-gray text-neutral-black outline-none text-base disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

type Option = {
  label: string;
  value: string;
};

interface SearchFilterProps {
  label: string;
  getOptions: (value: string) => Promise<Option[]>;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  label,
  getOptions,
}) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 700);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        if (debouncedValue) {
          const options = await getOptions(debouncedValue);
          setOptions(options);
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
    <Popover open={open}>
      <PopoverTrigger>
        <Label className="block">{label}</Label>
        <SearchInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          onFocus={() => {
            setOpen(true);
            inputRef.current?.focus();
          }}
          ref={inputRef}
        />
      </PopoverTrigger>
      <PopoverPrimitive.Content>
        {value !== "" && !isLoading && (
          <ScrollArea className="max-h-[min(30rem,50vh)]">
            {options.map((option) => (
              <div key={option.value}>{option.label}</div>
            ))}
          </ScrollArea>
        )}

        {isLoading && <div>Loading...</div>}
      </PopoverPrimitive.Content>
    </Popover>
  );
};

export { SearchInput };
