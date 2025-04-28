import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { BaseFilter } from './base';

interface AcademicYearFilterProps {
  slug?: string;
}

const ACADEMIC_YEARS = Array.from({ length: 12 }, (_, index) => ({
  label: `Academic Year ${index + 1}`,
  value: `Academic Year ${index + 1}`,
}));

export function AcademicYearFilter({
  slug = DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
}: AcademicYearFilterProps) {
  return (
    <BaseFilter
      label="Academic Year"
      slug={slug}
      options={ACADEMIC_YEARS}
      multiple
      hasSearch={true}
    />
  );
}
