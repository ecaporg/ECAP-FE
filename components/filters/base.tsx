'use client';
import { FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
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

export type FilterProps = {
  hasSearch?: boolean;
  options: { label: string; value: string }[];
  slug: string;
  label: string;
  render?: (option: FilterProps['options'][number]) => React.ReactNode;
  disabled?: boolean;
  defaultPlaceholder?: string;
  defaultValue?: string | null;
  className?: string;
} & (
  | {
      multiple?: true;
      combined?: boolean;
      withBothOption?: false;
    }
  | { multiple?: false; combined?: false; withBothOption?: boolean }
);

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

export const BaseFilter = ({
  multiple = false,
  combined = false,
  hasSearch = false,
  withBothOption = false,
  options,
  slug,
  label,
  render,
  defaultPlaceholder,
  defaultValue,
  disabled = false,
  className,
}: FilterProps) => {
  const [search, setSearch] = useState('');
  const { selectedValues, handleSelect, reset } = useFilterParam(slug, multiple, combined);
  let placeholder: string | undefined;

  if (defaultValue && !selectedValues[0]) {
    selectedValues[0] = defaultValue;
  }

  if (multiple) {
    placeholder =
      options
        .filter(
          (option) =>
            selectedValues.find((value) => value === option.value) &&
            typeof option.label === 'string'
        )
        .map((option) => option.label)
        .join(', ') ||
      defaultPlaceholder ||
      label;
  } else if (selectedValues[0]) {
    placeholder =
      options.find((option) => option.value === selectedValues[0])?.label ||
      defaultPlaceholder ||
      label;
  } else if (withBothOption && options.length > 1) {
    placeholder = options.length === 2 ? 'Both' : 'All';
  } else {
    placeholder = defaultPlaceholder ?? label;
  }

  const showSearch = hasSearch || options.length > 15;

  return (
    <div className={className}>
      <Label className="block">{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={disabled}
          isPlaceholder={!(selectedValues[0] || (withBothOption && options.length > 1))}
        >
          <span className="truncate" title={placeholder}>
            {placeholder}
          </span>
          {multiple && selectedValues.length > 0 ? (
            <button
              className="!w-fit ml-auto inline-flex items-center gap-1 rounded-lg bg-primary px-1.5 py-1 text-sm text-white [&+svg]:ml-0"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                reset();
              }}
            >
              {combined
                ? options.filter((option) =>
                    option.value
                      .split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES)
                      .every((value) => selectedValues.includes(value))
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
              className="!ring-0 !ring-offset-0 border-0"
              id={slug}
            />
          )}
          {showSearch && <DropdownMenuSeparator />}
          <ScrollArea className="max-h-[min(30rem,50vh)]">
            {withBothOption && !multiple && options.length > 1 && (
              <DropdownMenuLocalItem
                key={`${slug}-all`}
                option={{
                  label: options.length === 2 ? 'Both' : 'All',
                  value: 'both',
                }}
                checked={selectedValues.length === 0}
                multiple={multiple}
                handleSelect={reset}
              />
            )}
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
                      ? option.value
                          .split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES)
                          .every((value) => selectedValues.includes(value))
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
