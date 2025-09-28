'use client';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { hasPermission } from '@/lib/permissions';
import type { IAcademy } from '@/types';
import { BaseFilter } from './base';
import { useAuth } from '@/providers/auth';

interface AcademyFilterProps {
  availableAcademies: IAcademy[];
  slug?: string;
}

export function AcademyFilter({
  availableAcademies = [],
  slug = DEFAULT_FILTERS_KEYS.ACADEMY_ID,
}: AcademyFilterProps) {
  const { user } = useAuth();
  const isSortingAllowed = hasPermission(user!, 'sorting', 'sort:academy');
  if (!isSortingAllowed) {
    return null;
  }

  return (
    <BaseFilter
      label="Academy"
      defaultPlaceholder="All Academies"
      slug={slug}
      options={availableAcademies.map((academy) => ({
        label: academy.name,
        value: academy.id.toString(),
      }))}
      multiple
    />
  );
}
