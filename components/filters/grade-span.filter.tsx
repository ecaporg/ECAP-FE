import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { BaseFilter } from './base';

interface GradeFilterProps {
  slug?: string;
}

const GRADES = [
  { label: 'Grade 1', value: 'Grade 1' },
  { label: 'Grade 2', value: 'Grade 2' },
  { label: 'Grade 3', value: 'Grade 3' },
  { label: 'Grade 4', value: 'Grade 4' },
  { label: 'Grade 5', value: 'Grade 5' },
];

export function GradeSpanFilter({ slug = DEFAULT_FILTERS_KEYS.GRADE }: GradeFilterProps) {
  return <BaseFilter label="Grade" slug={slug} options={GRADES} multiple hasSearch={true} />;
}
