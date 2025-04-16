'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { SearchInput } from './search';
import { useFilterParam } from '@/hooks/auth/useFilterParam';
import { Label } from '../ui/label';
import { useDebounce } from 'use-debounce';
import { ScrollArea } from '../ui/scroll-area';

interface FilterProps {
  multiple?: boolean;
  hasSearch?: boolean;
  options: { label: string; value: string }[];
  slug: string;
  label: string;
  render?: (option: FilterProps['options'][number]) => React.ReactNode;
}

interface ItemProps {
  option: FilterProps['options'][number];
  checked: boolean;
  handleSelect: (value: string) => void;
  multiple: FilterProps['multiple'];
  render?: FilterProps['render'];
}

const DropdownMenuLocalItem: React.FC<ItemProps> = ({
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
        {render ? render(option) : option.label}
      </DropdownMenuCheckboxItem>
    );
  }
  return (
    <DropdownMenuItem
      key={option.value}
      onSelect={() => handleSelect(option.value)}
      className={checked ? 'bg-cool-gray' : ''}
    >
      {render ? render(option) : option.label}
    </DropdownMenuItem>
  );
};

export const BaseFilter: React.FC<FilterProps> = ({
  multiple = false,
  hasSearch = false,
  options,
  slug,
  label,
  render,
}) => {
  const [search, setSearch] = useState('');
  const { selectedValues, handleSelect } = useFilterParam(slug, multiple);

  const placeholder = multiple
    ? label
    : selectedValues[0]
      ? options.find((option) => option.value == selectedValues[0])?.label
      : label;

  const showSearch = hasSearch || options.length > 15;

  return (
    <div>
      <Label className="block">{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger isPlaceholder={!selectedValues[0]}>{placeholder}</DropdownMenuTrigger>
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
        <ScrollArea className='max-h-[min(30rem,50vh)]'>
          {options
            .filter(
              (option) => !search || option.label.toLowerCase().includes(search.toLowerCase())
            )
            .map((option) => (
              <DropdownMenuLocalItem
                key={option.value}
                option={option}
                checked={selectedValues.some((value) => value == option.value)}
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

interface SearchFilterProps extends Omit<FilterProps, 'multiple' | 'hasSearch' | 'options'> {
  options: { label: string; value: string }[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ label, slug, options }) => {
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, 700);

  return (
    <div>
      <Label className="block">{label}</Label>
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        id={slug}
      />
    </div>
  );
};
