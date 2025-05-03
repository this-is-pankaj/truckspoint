import { registrations } from "../mockData";

export async function POST(request: Request) {
  const body = await request.json();
  // Temporarily push it in the mock data
  registrations.push({...body});
  return new Response(JSON.stringify(registrations), { status: 200 });
}
