import { Teacher } from '@/types';
import { BaseFilter } from './base';
import { getUserName } from '@/utils';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

interface DoneByFilterProps {
  availableUsers: Teacher[];
  slug?: string;
}

export function DoneByFilter({
  availableUsers = [],
  slug = DEFAULT_FILTERS_KEYS.DONE_BY,
}: DoneByFilterProps) {
  const map = new Map();
  availableUsers.forEach((teacher) => {
    map.set(teacher.user_id, getUserName(teacher.user));
  });
  const options = Array.from(map.entries()).map(([key, value]) => ({
    label: value,
    value: key.toString(),
  }));
  return <BaseFilter label="Done By" slug={slug} options={options} multiple />;
}
