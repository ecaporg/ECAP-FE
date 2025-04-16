import { School } from '@/types';
import { BaseFilter } from './base';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

interface SchoolFilterProps {
  availableSchools: School[];
  slug?: string;
}

export function SchoolFilter({ availableSchools, slug = DEFAULT_FILTERS_KEYS.SCHOOL_ID }: SchoolFilterProps) {
  return (
    <BaseFilter
      label="School"
      slug={slug}
      options={availableSchools.map((school) => ({ label: school.name, value: school.id }))}
      multiple
    />
  );
}
