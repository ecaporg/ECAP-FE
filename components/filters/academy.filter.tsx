import { Academy } from '@/types';
import { BaseFilter } from './base';

interface AcademyFilterProps {
  availableAcademies: Academy[];
}

export function AcademyFilter({ availableAcademies }: AcademyFilterProps) {
  return (
    <BaseFilter
      label="Academy"
      slug="academy"
      options={availableAcademies.map((academy) => ({ label: academy.name, value: academy.id }))}
      multiple
    />
  );
}
