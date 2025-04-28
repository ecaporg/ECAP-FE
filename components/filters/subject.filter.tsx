import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { BaseFilter } from './base';

interface SubjectFilterProps {
  slug?: string;
}

export function SubjectFilter({ slug = DEFAULT_FILTERS_KEYS.SUBJECT }: SubjectFilterProps) {
  return <BaseFilter label="Subject" slug={slug} options={[]} multiple hasSearch={true} />;
}
