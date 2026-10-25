import { createContext, useContext, type ReactNode } from 'react';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getCatalog } from './catalog.functions';
import type { Product } from './products';

export const catalogOptions = queryOptions({ queryKey: ['catalog'], queryFn: () => getCatalog(), staleTime: 0, refetchInterval: 300000 });
const CatalogContext = createContext<Product[]>([]);
export function CatalogProvider({ children }: { children: ReactNode }) {
  const { data } = useSuspenseQuery(catalogOptions);
  return <CatalogContext.Provider value={data}>{children}</CatalogContext.Provider>;
}
export function useProducts() { return useContext(CatalogContext); }