'use server';

import { authenticateUser, createUser, logUserOut } from "@/lib/services/users/user";
import { LoginFormSchema, SignupFormSchema } from "../login/_components/schema.zod";
import { cookies } from "next/headers";
import { deleteSession, getPayloadFromCookie, isLoggedIn } from "@/lib/session";

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
  try {
    // const {data, rawRes} = await logUserOut();
    await deleteSession()
    return {
      status: 200,
      message: 'Logged out successfully',
    }
  } catch (err) {
    return {
      status: 500,
      message: 'Error logging out',
    }
  }
}

export async function isUserLoggedIn() {
  return await isLoggedIn();
}

export const getActiveTenantId = async () => {
  const payload = await getPayloadFromCookie();
  return payload?.tid;  
}