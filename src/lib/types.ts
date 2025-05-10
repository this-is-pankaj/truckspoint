import { BranchAddressSchema, BranchSchema } from "@/app/(with-auth)/tenants/_components/schema.zod";

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

export type JWTPayloadTP = {
  uid: string,
  tid: string,
  bid: string,
  roleId: string,
  access: {
    [key: string]: any
  },
  iat: number,
  exp: number
}

export type TenantSummary = {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  tenantId: string;
  name: string;
  description: string;
  branch: BranchDetails[]
}

export type BranchDetails = BranchSchema

export type BranchSummary = {
  branchId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  primary: boolean;
  isDeleted: boolean;
  address: BranchAddressSchema
}