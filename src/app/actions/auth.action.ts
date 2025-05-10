'use server';

import { authenticateUser, createUser } from "@/lib/services/users/user";
import { LoginFormSchema, SignupFormSchema } from "../login/_components/schema.zod";
import { cookies } from "next/headers";

export async function logUserInAction(credentials: LoginFormSchema) {
  const { username, password, rememberMe = false } = credentials;
  try {
    const { data, rawRes } = await authenticateUser({ username, password, rememberMe })
    // createSession(rawRes.headers.get('set-cookie') || '');
    const cookie = rawRes.headers.get('set-cookie') || '';
    const cookieStore = await cookies()
    cookieStore.set('session', cookie, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
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
// This function is used to log the user out by deleting the session cookie
export async function logUserOutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  return {
    status: 200,
    message: 'Logged out successfully',
  }
}

export async function isUserLoggedIn() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  if (!session) {
    return false
  }
  return session.value
}