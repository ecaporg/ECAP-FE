import { BaseFilter } from './base';

interface GradeFilterProps {}

const GRADES = [
  { label: 'Grade 1', value: 'grade-1' },
  { label: 'Grade 2', value: 'grade-2' },
  { label: 'Grade 3', value: 'grade-3' },
  { label: 'Grade 4', value: 'grade-4' },
  { label: 'Grade 5', value: 'grade-5' },
  { label: 'Grade 6', value: 'grade-6' },
  { label: 'Grade 7', value: 'grade-7' },
  { label: 'Grade 8', value: 'grade-8' },
  { label: 'Grade 9', value: 'grade-9' },
  { label: 'Grade 10', value: 'grade-10' },
  { label: 'Grade 11', value: 'grade-11' },
  { label: 'Grade 12', value: 'grade-12' },
];
export function GradeFilter({}: GradeFilterProps) {
  return <BaseFilter label="Grade" slug="grade" options={GRADES} multiple hasSearch={true} />;
}
