import { registrations } from "./mockData";

export async function POST(request: Request) {
  console.log("POST registrations");
  const body = await request.json();
  // Temporarily push it in the mock data
  const matchedUser = registrations.find((user) => {
    return user.email === body.email && user.password === body.password;
  });
  if (!matchedUser) {
    return new Response("Invalid credentials", { status: 401 });
  }
  return new Response(JSON.stringify(matchedUser), { status: 200 });
}