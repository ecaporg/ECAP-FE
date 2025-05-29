import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { AcademicYear } from '@/types';
import { BaseFilter } from './base';

interface AcademicYearFilterProps {
  slug?: string;
  availableAcademicYears: AcademicYear[];
  defaultValue: string;
}

export function AcademicYearFilter({
  slug = DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
  availableAcademicYears = [],
  defaultValue,
}: AcademicYearFilterProps) {
  const map = new Map();

  availableAcademicYears.forEach((academicYear) => {
    map.set(academicYear.id, `${academicYear.from} / ${academicYear.to}`);
  });

  const disabled = availableAcademicYears.length === 0;

  return (
    <BaseFilter
      label="Academic Year"
      defaultPlaceholder="All Academic Years"
      slug={slug}
      options={Array.from(map.entries()).map(([key, value]) => ({
        label: value,
        value: key.toString(),
      }))}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );
}
