'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';

type UseConditionalSearchParamOptions = {
  condition: boolean;
  paramName: string;
  paramValue: string;
  removeWhenFalse?: boolean;
};

export function useConditionalSearchParam({
  condition,
  paramName,
  paramValue,
  removeWhenFalse = true,
}: UseConditionalSearchParamOptions) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    console.log('condition run effect', condition);
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = params.get(paramName);

    if (condition) {
      if (currentValue !== paramValue) {
        params.set(paramName, paramValue);
        router.replace(`${pathname}?${params.toString()}`);
      }
    } else if (removeWhenFalse) {
      if (currentValue === paramValue) {
        params.delete(paramName);
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [condition, paramValue, removeWhenFalse, searchParams, router, pathname]);
}
