'use client';
import { useSortableParam, SortDirectionEnum } from '@/hooks/table/useSortableParam';
import { NestedKeyOf } from '@/utils';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

export function SortableIcon<T extends object>({
  name,
}: {
  name: NestedKeyOf<T> | keyof T;
}) {
  const { sortDirection, handleSort } = useSortableParam(name as string);
  const props = {
    className: 'size-4 cursor-pointer inline-block',
    role: 'sort-icon',
  };

  if (sortDirection === null) {
    return <ChevronsUpDown {...props} onClick={() => handleSort(SortDirectionEnum.ASC)} />;
  }

  if (sortDirection === SortDirectionEnum.ASC) {
    return <ChevronDown {...props} onClick={() => handleSort(SortDirectionEnum.DESC)} />;
  }

  return <ChevronUp {...props} onClick={() => handleSort(null)} />;
}
