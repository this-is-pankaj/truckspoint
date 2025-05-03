'use server';

import { authenticateUser, createUser } from "@/lib/services/user";
import { LoginFormSchema, SignupFormSchema } from "../login/_components/schema.zod";

export async function logUserInAction(credentials: LoginFormSchema) {
  const { username, password, rememberMe=false } = credentials;
  return await authenticateUser({ username, password, rememberMe });
}

export async function signUserUpAction(userInformation: SignupFormSchema) {
  const { firstName, lastName, email, password, phoneNumber, middleName } = userInformation;
  return await createUser({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    middleName,
  });
}
