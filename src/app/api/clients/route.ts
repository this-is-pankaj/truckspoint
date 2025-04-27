import { clients } from "./mockData";

export async function GET(request: Request) {
  console.log("GET clients");
  const res = [...clients];
  return new Response(JSON.stringify(res), { status: 200 });
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${request.headers.get("Authorization")}`,
  //   },
  // });

  // if (!res.ok) {
  //   return new Response("Failed to fetch clients", { status: 500 });
  // }

  // const data = await res.json();
  // return new Response(JSON.stringify(data), { status: 200 });
}
