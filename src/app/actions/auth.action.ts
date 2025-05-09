'use server';

import { authenticateUser, createUser } from "@/lib/services/users/user";
import { LoginFormSchema, SignupFormSchema } from "../login/_components/schema.zod";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function logUserInAction(credentials: LoginFormSchema) {
  const { username, password, rememberMe = false } = credentials;
  try {
    const { data, rawRes } = await authenticateUser({ username, password, rememberMe })
    // createSession(rawRes.headers.get('set-cookie') || '');
    const cookie = rawRes.headers.get('set-cookie') || '';
    const cookieStore = await cookies()
    cookieStore.set('session', cookie);
    return {
      status: rawRes.status,
    }
  } catch (err: any) {
    return {
      status: err.status,
      message: err.statusText,
    }
  }
}

export async function signUserUpAction(userInformation: SignupFormSchema) {
  const { firstName, lastName, email, password, mobileNumber, middleName } = userInformation;
  try {
    const { data, rawRes } = await createUser({
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
      middleName,
    });
    return {
      status: rawRes.status,
    }
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error signing up. Please try again later.',
    }
  }
}
