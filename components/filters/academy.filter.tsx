import { Academy } from '@/types';
import { BaseFilter } from './base';

interface AcademyFilterProps {
  availableAcademies: Academy[];
  slug?: string;
}

export function AcademyFilter({ availableAcademies, slug = 'academy_id' }: AcademyFilterProps) {
  return (
    <BaseFilter
      label="Academy"
      slug={slug}
      options={availableAcademies.map((academy) => ({ label: academy.name, value: academy.id }))}
      multiple
    />
  );
}
