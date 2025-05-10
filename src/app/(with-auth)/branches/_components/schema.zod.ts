import { z } from "zod";
/*
{
    "name": "string",
    "description": "string",
    "primary": true,
    "address": {}
} 
*/

const branchAddressSchema = z.object({
  streetName: z.string().min(1, {
    message: "Street name is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  pincode: z.string().regex(/^[0-9]{6}$/, {
    message: "Pincode should be 6 digits",
  }),
  landmark: z.string(),
  coordinates: z.array(z.number()),
})

export const branchSchema = z.object({
  name: z.string().min(1, {
    message: "Branch name is required",
  }),
  description: z.string(),
  primary: z.boolean({
    message: "Primary field cannot be undefined",
  }),
  address: branchAddressSchema
})

export type BranchSchema = z.infer<typeof branchSchema>
export type BranchAddressSchema = z.infer<typeof branchAddressSchema>