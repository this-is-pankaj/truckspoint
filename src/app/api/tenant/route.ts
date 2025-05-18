import { tenantsMockData } from "./mock";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("POST tenants", body);
  // Temporarily push it in the mock data
  tenantsMockData.push({...body, tenantId: Date.now().toString()});
  return new Response(JSON.stringify(tenantsMockData), { status: 200 });
}

export async function GET(request: Request) {
  console.log("GET /api/tenant");
  const res = [...tenantsMockData];
  return new Response(JSON.stringify(res), { status: 200 });
}
