'use client';
import { Tenant } from '@/types';
import { createContext, useContext } from 'react';

export const TenantContext = createContext<Tenant | null>(null);

export const TenantProvider = ({
  children,
  tenant,
}: React.PropsWithChildren<{ tenant: Tenant }>) => {
  return <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>;
};

export const useTenant = () => {
  const tenant = useContext(TenantContext);
  if (!tenant) {
    throw new Error('Tenant not found');
  }
  return tenant;
};
