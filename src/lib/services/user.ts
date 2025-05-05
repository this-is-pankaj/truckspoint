import { LoginCredentials, NewUser } from "../types";
import { makeCall } from "./makeCall";

export const authenticateUser = async (credentials: LoginCredentials) => {
  try {
    const data = await makeCall({ action: 'login', options: {}}, credentials);
    return data;
  } catch(error) {
    console.error("Error Logging in:", error);
    throw new Error("Failed to login");
  }
}

export const createUser = async (userInfo: NewUser) => {
  try {
    const data = await makeCall({ action: 'signup', options: {}}, userInfo);
    return data;
  } catch(error) {
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up");
  }
}
