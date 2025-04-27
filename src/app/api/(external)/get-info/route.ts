import { NextRequest } from "next/server";
import { mockData } from "./mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const gstin = searchParams.get("gstin");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-info?gstin=${gstin}`,
    )
    return res.json();
  } catch(exc) {
    return new Response(JSON.stringify(mockData), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
