import { DEFAULT_FILTERS_KEYS, FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
import { BaseFilter } from './base';

interface GradeFilterProps {
  slug?: string;
}

function mapGrade(grades: number[]): string {
  return grades.map(value => `Grade ${value}`).join(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES);
}

const GRADES = [
  { label: 'Elementary school', value: mapGrade([1,2,3,4,5]) },
  { label: 'Middle school', value: mapGrade([6,7,8,9,10]) },
  { label: 'High school', value: mapGrade([11,12]) },
];

export function GradeSpanFilter({ slug = DEFAULT_FILTERS_KEYS.GRADE }: GradeFilterProps) {
  return (
    <BaseFilter
      label="Grade-Span"
      defaultPlaceholder="All Grade-Spans"
      slug={slug}
      options={GRADES}
      multiple
      combined
    />
  );
}
