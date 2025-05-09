import { cookies } from "next/headers";
import { registrations } from "../mockData";

export async function POST(request: Request) {
  console.log("POST registrations");
  const body = await request.json();
  console.log("body", registrations);
  // Temporarily push it in the mock data
  const matchedUser = registrations.find((user) => {
    const isMatch = (user.email === body.username || user.phoneNumber === body.username) && user.password === body.password;
    return isMatch;
  });
  console.log("matchedUser", matchedUser);
  if (matchedUser) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const resCookie = `sessionNew=1234567890; HttpOnly; SameSite=Strict; Secure; Path=/`;

  return new Response(JSON.stringify({ matchedUser: '' }), { 
    status: 200, 
    headers: { 
      'Set-Cookie': resCookie 
    } 
  });
}