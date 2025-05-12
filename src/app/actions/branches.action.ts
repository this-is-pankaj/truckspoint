"use server";

import { createBranch, deleteBranch, fetchBranchById, fetchBranches, updateBranch } from "@/lib/services/branches/branches";
import { BranchDetails } from "@/lib/types";

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

export async function getBranchByIdAction(branchId: string) {
  try {
    const {data, rawRes} = await fetchBranchById(branchId);
    return {
      status: rawRes.status,
      data
    }
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error fetching branch',
    }
  }
}

export async function createBranchAction(branchData: BranchDetails) {
  try {
    const {data, rawRes} = await createBranch(branchData);
    return {
      status: rawRes.status,
      data,
    }
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error creating branch',
    }
  }
}

export async function updateBranchAction(branchId: string, branchData: BranchDetails) {
  try {
    const {data, rawRes} = await updateBranch(branchId, branchData);
    return {
      status: rawRes.status,
      data,
    }
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error updating branch',
    }
  }
}

export async function deleteBranchAction(branchId: string) {
  try {
    const {data, rawRes} = await deleteBranch(branchId);
    return {
      status: rawRes.status,
      data,
    }
  } catch (err: any) {
    return {
      status: err.status || 500,
      message: err.statusText || 'Error deleting branch',
    }
  }
}
