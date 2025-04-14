import { School } from '@/types';
import { BaseFilter } from './base';

interface SchoolFilterProps {
  availableSchools: School[];
  slug?: string;
}

export function SchoolFilter({ availableSchools, slug = 'school_id' }: SchoolFilterProps) {
  return (
    <BaseFilter
      label="School"
      slug={slug}
      options={availableSchools.map((school) => ({ label: school.name, value: school.id }))}
      multiple
    />
  );
}
