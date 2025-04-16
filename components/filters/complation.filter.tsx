import { BaseFilter } from './base';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

const COMPLETION_OPTIONS = [
  { label: 'Complete', value: 'true' },
  { label: 'Incomplete', value: 'false' },
];

export function ComplationFilter({ slug = DEFAULT_FILTERS_KEYS.COMPLETED }: { slug?: string }) {
  return <BaseFilter label="Complation" slug={slug} options={COMPLETION_OPTIONS} multiple />;
}
