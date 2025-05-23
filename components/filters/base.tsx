'use client';
import { useFilterParam } from '@/hooks/table/useFilterParam';
import { X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { SearchInput } from './search';

export interface FilterProps {
  multiple?: boolean;
  combined?: boolean;
  hasSearch?: boolean;
  options: { label: string; value: string }[];
  slug: string;
  label: string;
  render?: (option: FilterProps['options'][number]) => React.ReactNode;
  disabled?: boolean;
  defaultPlaceholder?: string;
}

interface ItemProps {
  option: FilterProps['options'][number];
  checked: boolean;
  handleSelect: (value: string) => void;
  multiple: FilterProps['multiple'];
  render?: FilterProps['render'];
}

export const DropdownMenuLocalItem: React.FC<ItemProps> = ({
  option,
  checked,
  handleSelect,
  multiple,
  render,
}: ItemProps) => {
  if (multiple) {
    return (
      <DropdownMenuCheckboxItem
        key={option.value}
        checked={checked}
        onSelect={(e) => {
          e.preventDefault();
          handleSelect(option.value);
        }}
        className={checked ? 'bg-cool-gray' : ''}
      >
        {render ? render(option) : <p className="truncate w-full">{option.label}</p>}
      </DropdownMenuCheckboxItem>
    );
  }
  return (
    <DropdownMenuItem
      key={option.value}
      onSelect={() => handleSelect(option.value)}
      className={checked ? 'bg-cool-gray' : ''}
    >
      {render ? render(option) : <p className="truncate w-full">{option.label}</p>}
    </DropdownMenuItem>
  );
};

export const BaseFilter: React.FC<FilterProps> = ({
  multiple = false,
  combined = false,
  hasSearch = false,
  options,
  slug,
  label,
  render,
  defaultPlaceholder,
  disabled = false,
}) => {
  const [search, setSearch] = useState('');
  const { selectedValues, handleSelect, reset } = useFilterParam(slug, multiple, combined);

  const placeholder = multiple
    ? (defaultPlaceholder ?? label)
    : selectedValues[0]
      ? options.find((option) => option.value === selectedValues[0])?.label
      : (defaultPlaceholder ?? label);

  const showSearch = hasSearch || options.length > 15;

  return (
    <div>
      <Label className="block">{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger disabled={disabled} isPlaceholder={!selectedValues[0]}>
          <span className="truncate">{placeholder}</span>
          {multiple && selectedValues.length > 0 ? (
            <button
              className="text-white text-sm bg-primary rounded-lg px-1.5 py-1 inline-flex items-center gap-1 !w-fit ml-auto [&+svg]:ml-0"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                reset();
              }}
            >
              {combined
                ? options.filter((option) =>
                    option.value.split(',').every((value) => selectedValues.includes(value))
                  ).length
                : selectedValues.length}
              <X className="size-4 cursor-pointer" />
            </button>
          ) : null}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {showSearch && (
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Start typing..."
              className="border-0 !ring-0 !ring-offset-0"
              id={slug}
            />
          )}
          {showSearch && <DropdownMenuSeparator />}
          <ScrollArea className="max-h-[min(30rem,50vh)]">
            {options
              .filter(
                (option) => !search || option.label.toLowerCase().includes(search.toLowerCase())
              )
              .map((option) => (
                <DropdownMenuLocalItem
                  key={option.value}
                  option={option}
                  checked={
                    multiple && combined
                      ? option.value.split(',').every((value) => selectedValues.includes(value))
                      : selectedValues.some((value) => value == option.value)
                  }
                  handleSelect={handleSelect}
                  multiple={multiple}
                  render={render}
                />
              ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
