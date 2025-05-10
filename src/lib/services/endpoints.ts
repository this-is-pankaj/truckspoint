import { branchesEndpoints } from "./_endpoints/branches";
import { clientsEndpoints } from "./_endpoints/clients";
import { tenantsEndpoints } from "./_endpoints/tenants";

export const endpoints = {
  signup: {
    url: 'api/signup/user',
    method: 'POST',
  },
  login: {
    url: 'api/auth/login',
    method: 'POST',
  },
  ...tenantsEndpoints,
  ...clientsEndpoints,
  ...branchesEndpoints,
} as const;

export type ApiActions = keyof typeof endpoints;
export type ApiEndpoints = typeof endpoints[ApiActions];