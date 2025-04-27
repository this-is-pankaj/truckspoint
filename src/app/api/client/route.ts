import { clients } from "../clients/mockData";

export async function POST(request: Request) {
  const body = await request.json();
  const clientData = body;
  // Temporarily push it in the mock data
  clients.push(clientData);
  return new Response(JSON.stringify(clients), { status: 201 });
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${request.headers.get("Authorization")}`,
  //   },
  //   body: request.body,
  // });

  // if (!res.ok) {
  //   return new Response("Failed to create client", { status: 500 });
  // }

  // const data = await res.json();
  // return new Response(JSON.stringify(data), { status: 201 });
}
