"use server";

import { fetchBranches } from "@/lib/services/branches/branches";

export async function getAllBranchesAction() {
  try {
    const {data, rawRes} = await fetchBranches();
    return {
      status: rawRes.status,
      data
    }
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error fetching branches',
    }
  }
}
