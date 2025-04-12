import { School } from '@/types';
import { BaseFilter } from './base';

interface SchoolFilterProps {
  availableSchools: School[];
}

export function SchoolFilter({ availableSchools }: SchoolFilterProps) {
  return (
    <BaseFilter
      label="School"
      slug="school"
      options={availableSchools.map((school) => ({ label: school.name, value: school.id }))}
      multiple
    />
  );
}
