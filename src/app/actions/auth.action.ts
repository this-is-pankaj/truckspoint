'use server';

import { authenticateUser, createUser } from "@/lib/services/user";
import { LoginFormSchema, SignupFormSchema } from "../login/_components/schema.zod";

export async function logUserInAction(credentials: LoginFormSchema) {
  const { username, password, rememberMe = false } = credentials;
  try {
    return await authenticateUser({ username, password, rememberMe })
  } catch (err: any) {
    return {
      status: err.status,
      message: err.statusText,
    }
  }
}

export async function signUserUpAction(userInformation: SignupFormSchema) {
  const { firstName, lastName, email, password, phoneNumber, middleName } = userInformation;
  try {
    return await createUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      middleName,
    });
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error signing up. Please try again later.',
    }
  }
}
