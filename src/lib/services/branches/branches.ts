'use server';

import { makeCall } from "../makeCall";
import { BranchBasicInfo } from "@/lib/types";

export const createBranch= async (branch: any) => {
  try {
    const data = await makeCall({ action: 'createBranch', options: {}}, branch);
    return data;
  } catch (error) {
    console.error("Error creating branch:", error);
    throw new Error("Failed to create branch");
  }
}

export const fetchBranches = async (): Promise<{data: BranchBasicInfo[]; rawRes: Response}> => {
  try {
    const data = await makeCall({ action: 'getAllBranches', options: {}});
    console.log("Fetched Branches:", data);
    return data;
  } catch (error) {
    console.error("Error fetching Branches:", error);
    throw new Error("Failed to fetch Branches");
  }
}

export const switchBranch = async (branchId: string) => {
  try {
    const data = await makeCall({ action: 'switchBranch' }, { branchId });
    return data;
  } catch (error) {
    console.error("Error switching branch:", error);
    throw new Error("Failed to switch branch");
  }
}

