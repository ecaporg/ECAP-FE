import { BaseFilter } from './base';

const COMPLETION_OPTIONS = [
  { label: 'Complete', value: 'complete' },
  { label: 'Incomplete', value: 'incomplete' },
];

export function ComplationFilter() {
  return <BaseFilter label="Complation" slug="complation" options={COMPLETION_OPTIONS} multiple />;
}
