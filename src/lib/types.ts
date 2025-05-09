export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  middleName?: string;
}

export type LoginCredentials = {
  username: string;
  password: string;
  rememberMe: boolean;
}
