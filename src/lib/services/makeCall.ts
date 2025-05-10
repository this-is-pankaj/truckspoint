"use server";
import { cookies } from "next/headers";
import { ApiActions, endpoints } from "./endpoints";

export const makeCall = async (actionObj: { action: ApiActions; options?: Record<string, string>; params?: Record<string, string> }, body?: unknown) => {
  const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { url, method } = endpoints[actionObj.action];
  // If there are options, replace the placeholders in the URL with the actual values
  // const urlWithParams = Object.entries(actionObj.options || {}).reduce((acc, [key, value]) => {
  //   return acc.replace(`:${key}`, value);
  // }, url);
  const urlParamsSerialized = new URLSearchParams(actionObj.params);
  const completeURL = `${baseUrl}/${url}?${urlParamsSerialized}`; // || `${baseUrl}/api/${urlWithParams}`;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  console.log('completeURL', completeURL);
  const res = await fetch(completeURL, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie?.value ?? '',
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  
  if (!res.ok) {
    throw new Error("Failed to make API call");
  }

  const data = await res.json();
  return { data, rawRes: new Response(JSON.stringify(data), {
    headers: {
      'Set-Cookie': res.headers.get('set-cookie') ?? '',
      'Content-Type': 'application/json',
    }
  }) };
}
