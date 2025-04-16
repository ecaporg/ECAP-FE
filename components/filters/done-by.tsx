import { Teacher } from '@/types';
import { BaseFilter } from './base';
import { getUserName } from '@/utils';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

interface DoneByFilterProps {
  availableUsers: Teacher[];
  slug?: string;
}

export function DoneByFilter({ availableUsers, slug = DEFAULT_FILTERS_KEYS.DONE_BY }: DoneByFilterProps) {
  return (
    <BaseFilter
      label="Done By"
      slug={slug}
      options={availableUsers.map((teacher) => ({
        label: getUserName(teacher.user),
        value: teacher.user_id.toString(),
      }))}
      multiple
    />
  );
}
