export const tenantsEndpoints = {
  getAllTenants: {
    url: 'api/tenant',
    method: 'GET',
  },
  getTenant: {
    url: 'api/tenant/:id',
    method: 'GET',
  },
  createTenant: {
    url: 'api/tenant',
    method: 'POST',
  },
  switchTenant: {
    url: 'api/tenant/switch',
    method: 'POST',
  },
};
