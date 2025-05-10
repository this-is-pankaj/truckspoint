"use server";

import { createTenant, fetchTenants, switchTenant } from "@/lib/services/tenants/tenant"
import { NewTenantSchema } from "../(with-auth)/tenants/_components/schema.zod";
import { udpateSession } from "@/lib/session";

export async function getAllTenantsAction() {
  try {
    const { data, rawRes } = await fetchTenants();
    return {
      status: rawRes.status,
      data
    };
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error fetching tenants',
    }
  }
}

export async function createTenantAction(tenant: NewTenantSchema) {
  try {
    const { data, rawRes } = await createTenant(tenant);
    udpateSession(rawRes.headers.get('set-cookie') ?? '');
    return data;
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error creating tenants',
    }
  }
}

export async function switchTenantAction(tenantId: string) {
  try {
    const { data, rawRes } = await switchTenant(tenantId);
    udpateSession(rawRes.headers.get('set-cookie') ?? '');
    return data;
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error switching tenants',
    }
  }
}
