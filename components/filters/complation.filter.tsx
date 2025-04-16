import { BaseFilter } from './base';

const COMPLETION_OPTIONS = [
  { label: 'Complete', value: 'true' },
  { label: 'Incomplete', value: 'false' },
];

export function ComplationFilter({ slug = 'completed' }: { slug?: string }) {
  return <BaseFilter label="Complation" slug={slug} options={COMPLETION_OPTIONS} multiple />;
}
