'use client';

import { useConditionalSearchParam } from '@/hooks/use-conditional-search-param';
import { createContext, useContext } from 'react';

type SearchParamsContextType = {};

const SearchParamsContext = createContext<SearchParamsContextType | undefined>(undefined);

export function SearchParamsProvider({ children }: React.PropsWithChildren) {
  useConditionalSearchParam({
    condition: window.innerHeight > 800,
    paramName: 'limit',
    paramValue: '15',
    removeWhenFalse: false,
  });

  return <SearchParamsContext.Provider value={{}}>{children}</SearchParamsContext.Provider>;
}

export function useSearchParamsContext() {
  const context = useContext(SearchParamsContext);
  if (context === undefined) {
    throw new Error('useSearchParamsContext must be used within a SearchParamsProvider');
  }
  return context;
}
