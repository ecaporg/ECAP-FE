import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { BaseFilter } from './base';

interface SemesterFilterProps {
  slug?: string;
}

const SEMESTERS = [
  { label: 'Semester 1', value: 'Semester 1' },
  { label: 'Semester 2', value: 'Semester 2' },
];

export function SemesterFilter({ slug = DEFAULT_FILTERS_KEYS.SEMESTER }: SemesterFilterProps) {
  return <BaseFilter label="Semester" slug={slug} options={SEMESTERS} multiple hasSearch={true} />;
}
