import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useFilterParam(slug: string, multiple = true) {
    const router = useRouter    ();
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    const raw = searchParams.get(slug) || '';
    const selectedValues = raw ? raw.split(',') : [];
  
    const handleSelect = (value: string) => {
      let newValues: string[];
  
      if (multiple) {
        newValues = selectedValues.includes(value)
          ? selectedValues.filter((v) => v !== value)
          : [...selectedValues, value];
      } else {
        newValues = selectedValues.includes(value) ? [] : [value];
      }
  
      const params = new URLSearchParams(searchParams.toString());
  
      if (newValues.length) {
        params.set(slug, newValues.join(','));
      } else {
        params.delete(slug);
      }
  
      router.push(`${pathname}?${params.toString()}`);
    };
  
    return {
      selectedValues,
      handleSelect,
    };
  }