export const endpoints = {
  signup: {
    url: 'api/signup/user',
    method: 'POST',
  },
  login: {
    url: 'api/auth',
    method: 'POST',
  }
} as const;

export type ApiActions = keyof typeof endpoints;
export type ApiEndpoints = typeof endpoints[ApiActions];