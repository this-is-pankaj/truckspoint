import { LoginFormSchema, SignupFormSchema } from "../login/_components/schema.zod";

export async function logUserIn(credentials: LoginFormSchema) {
  try {
    console.log("Logging in", credentials);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await res.json();
    return data;
  } catch
  (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to log in");
  }
}

export async function signUserUp(credentials: SignupFormSchema) {
  try {
    console.log("Signing up", credentials);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch clients");
    }
    const data = await res.json();
    return data;
  } catch
  (error) {
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up");
  }
}
