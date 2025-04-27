import { z } from "zod";
/*
Sample data for client form
{
  "idProof": [
    {
       type: string,
       value: string
    }
  ],
  "name": "string",
  "nameHindi": "string",
  "email": [
    "string"
  ],
  "address": [
    {
      "streetName": "string",
      "city": "string",
      "state": "string",
      "pincode": "string",
      "landmark": "string",
      "coordinates": [
        "string"
      ],
      "primary": true
    }
  ],
  "mobileNumber": [
    "string"
  ],
  "phoneNumber": [
    "string"
  ],
  "clientType": [
    "string"
  ],
  "clientFreightType": "string"
}
*/
export const clientFormSchema = z.object({
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{4}[0-9]{7}$/, {
    message: "GSTIN should be in the format 12ABCDE1234F1Z5",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  nameHindi: z.string().optional(),
  address: z.array(
    z.object({
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
      landmark: z.string().optional(),
      coordinates: z.array(z.string()).optional(),
      primary: z.boolean().optional(),
    })
  ).optional(),
  mobileNumber: z.array(z.string().regex(/^[0-9]{10}$/, {
    message: "Mobile number should be 10 digits",
  })).optional(),
  phoneNumber: z.array(z.string().regex(/^[0-9]{10}$/, {
    message: "Phone number should be 10 digits",
  })).optional(),
  clientType: z.array(z.string()).optional(),
  clientFreightType: z.string().optional(),
  email: z.array(z.string().email()).optional(),
  idProof: z.array(
    z.object({
      type: z.string().min(1, {
        message: "ID proof type is required",
      }),
      value: z.string().min(1, {
        message: "ID proof value is required",
      }), 
    })
  ).optional(),
})

export type ClientFormSchema = z.infer<typeof clientFormSchema>
