'use client';
import { FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export enum SortDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

const SORT_BY_KEY = 'sortBy';
const SORT_DIRECTION_KEY = 'sortDirection';

export function useSortableParam(key: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sortBy = searchParams.get(SORT_BY_KEY) || '';
  const sortDirection = searchParams.get(SORT_DIRECTION_KEY) || '';
  const sortByArray = sortBy.split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES).filter(Boolean);
  const sortDirectionArray = sortDirection.split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES).filter(Boolean);

  const index = sortByArray.findIndex((item) => item === key);

  const handleSort = (direction: SortDirectionEnum | null) => {
    if (index === -1) {
      if (direction === null) {
        return;
      }

      sortByArray.push(key);
      sortDirectionArray.push(direction);
    } else {
      if (direction === null) {
        sortByArray.splice(index, 1);
        sortDirectionArray.splice(index, 1);
      } else {
        sortDirectionArray[index] = direction;
      }
    }

    const params = new URLSearchParams(searchParams.toString());
    if (sortByArray.length === 0) {
      params.delete(SORT_BY_KEY);
      params.delete(SORT_DIRECTION_KEY);
    } else {
      params.set(SORT_BY_KEY, sortByArray.join(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES));
      params.set(SORT_DIRECTION_KEY, sortDirectionArray.join(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES));
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    sortDirection: index === -1 ? null : sortDirectionArray[index],
    handleSort,
  };
}
