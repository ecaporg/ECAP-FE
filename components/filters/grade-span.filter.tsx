import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { BaseFilter } from './base';

interface GradeFilterProps {
  slug?: string;
}

const GRADES = [
  { label: 'Elementary school', value: 'Grade 0,Grade 1,Grade 2,Grade 3,Grade 4' },
  { label: 'Middle school', value: 'Grade 5,Grade 6,Grade 7,Grade 8,Grade 9,Grade 10' },
  { label: 'High school', value: 'Grade 11,Grade 12' },
];

export function GradeSpanFilter({ slug = DEFAULT_FILTERS_KEYS.GRADE }: GradeFilterProps) {
  return <BaseFilter label="Grade-Span" slug={slug} options={GRADES} multiple />;
}
