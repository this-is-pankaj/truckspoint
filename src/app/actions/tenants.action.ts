import { createTenant, fetchTenants } from "@/lib/services/tenants/tenant"
import { NewTenantSchema } from "../tenants/_components/schema.zod"

export async function getAllTenantsAction() {
  try {
    return await fetchTenants();
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error signing up. Please try again later.',
    }
  }
}

export async function createTenantAction(tenant: NewTenantSchema) {
  try {
    return await createTenant(tenant);
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error signing up. Please try again later.',
    }
  }
}