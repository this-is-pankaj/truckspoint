'use server';

import { makeCall } from "../makeCall";
import { BranchDetails, BranchSummary } from "@/lib/types";

export const createBranch= async (branch: any) => {
  try {
    const data = await makeCall({ action: 'createBranch', options: {}}, branch);
    return data;
  } catch (error) {
    console.error("Error creating branch:", error);
    throw new Error("Failed to create branch");
  }
}

export const fetchBranches = async (): Promise<{data: BranchSummary[]; rawRes: Response}> => {
  try {
    const data = await makeCall({ action: 'getAllBranches', options: {}});
    console.log("Fetched Branches:", data);
    return data;
  } catch (error) {
    console.error("Error fetching Branches:", error);
    throw new Error("Failed to fetch Branches");
  }
}

export const fetchBranchById = async (branchId: string): Promise<{data: BranchSummary; rawRes: Response}> => {
  try {
    const data = await makeCall({ action: 'getBranchById', options: {id: branchId}});
    console.log("Fetched Branch:", data);
    return data;
  }
  catch (error) {
    console.error("Error fetching Branch:", error);
    throw new Error("Failed to fetch Branch");
  }
}
export const deleteBranch = async (branchId: string) => {
  try {
    const data = await makeCall({ action: 'deleteBranch', options: { id: branchId } });
    return data;
  }
  catch (error) {
    console.error("Error deleting branch:", error);
    throw new Error("Failed to delete branch");
  }
}
export const updateBranch = async (branchId: string, branchData: BranchDetails) => {
  try {
    const data = await makeCall({ action: 'updateBranch', options: { id: branchId } }, { branchId, ...branchData });
    return data;
  }
  catch (error) {
    console.error("Error updating branch:", error);
    throw new Error("Failed to update branch");
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

