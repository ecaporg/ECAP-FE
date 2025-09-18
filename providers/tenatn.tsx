"use client";
import type { ITenant } from "@/types";
import { createContext, useContext } from "react";

export const TenantContext = createContext<ITenant | null>(null);

export const TenantProvider = ({
  children,
  tenant,
}: React.PropsWithChildren<{ tenant: ITenant }>) => {
  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
};

export const useTenant = () => {
  const tenant = useContext(TenantContext);
  if (!tenant) {
    throw new Error("Tenant not found");
  }
  return tenant;
};
