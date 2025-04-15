import { PAGE_KEY } from '@/components/table/pagination-section';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useFilterParam(slug: string, multiple = true) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get(slug) || '';
  const selectedValues = raw ? (multiple ? raw.split(',') : [raw]) : [];

  const handleSelect = (value: string) => {
    let newValues: string[];

    if (multiple) {
      newValues = selectedValues.some((v) => v == value)
        ? selectedValues.filter((v) => v != value)
        : [...selectedValues, value];
    } else {
      newValues = selectedValues.some((v) => v == value) ? [] : [value];
    }

    const params = new URLSearchParams(searchParams.toString());

    if (newValues.length) {
      params.set(slug, newValues.join(','));
      params.set(PAGE_KEY, '1');
    } else {
      params.delete(slug);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    selectedValues,
    handleSelect,
  };
}
