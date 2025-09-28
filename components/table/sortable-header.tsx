'use client';
import { SortDirectionEnum, useSortableParam } from '@/hooks/table/useSortableParam';
import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import type { NestedKeyOf } from '@/utils';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

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

export function AcademySortIcon<T extends object>({
  name,
}: {
  name: NestedKeyOf<T> | keyof T;
}) {
  const { user } = useAuth();
  return hasPermission(user, 'sorting', 'sort:academy') && <SortableIcon<T> name={name} />;
}
