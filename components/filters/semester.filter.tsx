import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { Semester } from '@/types';
import { BaseFilter } from './base';

interface SemesterFilterProps {
  slug?: string;
  availableSemesters: Semester[];
}

export function SemesterFilter({
  slug = DEFAULT_FILTERS_KEYS.SEMESTER_ID,
  availableSemesters = [],
}: SemesterFilterProps) {
  const map = new Map();

  availableSemesters.forEach((semester) => {
    map.set(semester.id, semester.name);
  });

  return (
    <BaseFilter
      label="Semester"
      defaultPlaceholder="All Semesters"
      slug={slug}
      options={Array.from(map.entries()).map(([key, value]) => ({
        label: value,
        value: key.toString(),
      }))}
      withBothOption
    />
  );
}
