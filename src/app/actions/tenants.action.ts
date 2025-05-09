import { createTenant, fetchTenants } from "@/lib/services/tenants/tenant"
import { NewTenantSchema } from "../(auth)/tenants/_components/schema.zod"

export async function getAllTenantsAction() {
  try {
    const {data } = await fetchTenants();
    return data;
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error signing up. Please try again later.',
    }
  }
}

export async function createTenantAction(tenant: NewTenantSchema) {
  try {
    const {data} = await createTenant(tenant);
    return data;
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error signing up. Please try again later.',
    }
  }
}