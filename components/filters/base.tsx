'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { SearchInput } from './search';
import { useFilterParam } from '@/hooks/auth/useFilterParam';

interface FilterProps {
  multiple?: boolean;
  hasSearch?: boolean;
  options: { label: string; value: string }[];
  slug: string;
  label: string;
}

const DropdownMenuLocalItem = ({
  option,
  checked,
  handleSelect,
  multiple,
}: {
  option: FilterProps['options'][number];
  checked: boolean;
  handleSelect: (value: string) => void;
  multiple: boolean;
}) => {
  if (multiple) {
    return (
      <DropdownMenuCheckboxItem
        key={option.value}
        checked={checked}
        onSelect={() => handleSelect(option.value)}
      >
        {option.label}
      </DropdownMenuCheckboxItem>
    );
  }
  return (
    <DropdownMenuItem key={option.value} onSelect={() => handleSelect(option.value)}>
      {option.label}
    </DropdownMenuItem>
  );
};



export const BaseFilter: React.FC<FilterProps> = ({
  multiple = false,
  hasSearch = false,
  options,
  slug,
  label,
}) => {
  const [search, setSearch] = useState('');
  const { selectedValues, handleSelect } = useFilterParam(slug, multiple);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{label}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {hasSearch && (
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Start typing..."             
            />
        )}
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options
          .filter((option) => !search || option.label.toLowerCase().includes(search.toLowerCase()))
          .map((option) => (
            <DropdownMenuLocalItem
              key={option.value}
              option={option}
              checked={selectedValues.includes(option.value)}
              handleSelect={handleSelect}
              multiple={multiple}
            />
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};