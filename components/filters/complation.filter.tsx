import { BaseFilter } from './base';

const COMPLETION_OPTIONS = [
  { label: 'Complete', value: 'complete' },
  { label: 'Incomplete', value: 'incomplete' },
];

export function ComplationFilter({ slug = 'assignment_periods.completed' }: { slug?: string }) {
  return <BaseFilter label="Complation" slug={slug} options={COMPLETION_OPTIONS} multiple />;
}
