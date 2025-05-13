'use client';

import { TenantSummary } from '@/lib/types';
import { createContext, PropsWithChildren, useState } from 'react';

type GlobalStoreType = {
  tenants: TenantSummary[]
};

type GlobalStoreProviderProps = {
  tenants: TenantSummary[]
} & PropsWithChildren;

const initialState: GlobalStoreType = {
  tenants: [],
};

export const GlobalStore = createContext<GlobalStoreType>(initialState);

export const GlobalStoreProvider = ({ children, tenants }: GlobalStoreProviderProps) => {
  return <GlobalStore.Provider
    value={{ tenants}}
  >
    {children}
  </GlobalStore.Provider>;
};
