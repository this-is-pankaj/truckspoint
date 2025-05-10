'use server';

import { NewTenantSchema } from "@/app/(with-auth)/tenants/_components/schema.zod";
import { makeCall } from "../makeCall";

export const createTenant = async (tenant: NewTenantSchema) => {
  try {
    const data = await makeCall({ action: 'createTenant', options: {}}, tenant);
    return data;
  } catch (error) {
    console.error("Error creating tenant:", error);
    throw new Error("Failed to create tenant");
  }
}

export const fetchTenants = async () => {
  try {
    const data = await makeCall({ action: 'getAllTenants', options: {}});
    console.log("Fetched tenants:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw new Error("Failed to fetch tenants");
  }
}

export const switchTenant = async (tenantId: string) => {
  try {
    const data = await makeCall({ action: 'switchTenant' }, { tenantId });
    return data;
  } catch (error) {
    console.error("Error switching tenant:", error);
    throw new Error("Failed to switch tenant");
  }
}

