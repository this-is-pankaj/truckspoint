import { LoginCredentials, NewUser } from "../types";

export const authenticateUser = async (credentials: LoginCredentials) => {
  const res = await fetch(`${process.env.API_URL}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  return data;
}

export const createUser = async (credentials: NewUser) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      throw new Error("Failed to sign the user up");
    }
    const data = await res.json();
    return data;
  } catch
  (error) {
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up");
  }
}
