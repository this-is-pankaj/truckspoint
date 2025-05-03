import { z } from "zod";

/*
  Sample data for login payload
  {
  username: email or phone number
  password: string
  rememberMe: boolean
  }
*/

// Password should be at least 10 characters long and contain at least one letter, one number and one special character
const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

export const signupFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, {
    message: "Phone number should be 10 digits",
  }),
  password: z.string({
    message: "Password is required",
  }).regex(regexPassword, {
    message: "Password should be at least 10 characters long and contain at least one letter, one number and one special character",
  }),
  confirmPassword: z.string({
    message: "Re-enter you password to confirm",
  }).min(1, {
    message: "Confirm password is required",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  privacyPolicyAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const loginFormSchema = z.object({
  username: z.union([
    z.string().email({
      message: "Invalid username",
    }),
    z.string().regex(/^[0-9]{10}$/, {
      message: "Phone number should be 10 digits",
    }),
  ]).refine((val) => val.length > 0, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean().optional(),
})

export type SignupFormSchema = z.infer<typeof signupFormSchema>

export type LoginFormSchema = z.infer<typeof loginFormSchema>