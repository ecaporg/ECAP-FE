import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { getUser } from '@/lib/get-user';
import type { User } from '@/types';
import { getUserName } from '@/utils';
import { BaseFilter } from './base';
interface DoneByFilterProps {
  availableUsers: User[];
  slug?: string;
}

export async function DoneByFilter({
  availableUsers = [],
  slug = DEFAULT_FILTERS_KEYS.DONE_BY,
}: DoneByFilterProps) {
  const user = await getUser();
  const map = new Map();

  availableUsers.forEach((user) => {
    map.set(user.id, getUserName(user));
  });

  const disabled = availableUsers.length === 0;

  if (user) {
    map.set(user.id, 'You');
  }

  const options = Array.from(map.entries()).map(([key, value]) => ({
    label: value,
    value: key.toString(),
  }));
  return (
    <BaseFilter label="Done By" slug={slug} options={options} withBothOption disabled={disabled} />
  );
}
