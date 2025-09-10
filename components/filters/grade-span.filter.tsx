import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { BaseFilter } from './base';

interface GradeFilterProps {
  slug?: string;
}

const GRADES = [
  { label: 'Elementary school', value: '1,2,3,4,5' },
  { label: 'Middle school', value: '6,7,8,9,10' },
  { label: 'High school', value: '11,12' },
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
