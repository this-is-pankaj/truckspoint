export const branchesEndpoints = {
  getAllBranches: {
    method: "GET",
    url: "api/branch",
  },
  getBranchById: {
    method: "GET",
    url: "api/branch/:id",
  },
  createBranch: {
    method: "POST",
    url: "api/branch",
  },
  deleteBranch: {
    method: "DELETE",
    url: "api/branch/:id",
  },
  switchBranch: {
    method: "POST",
    url: "api/branch/switch",
  },
  assignBranch: {
    method: "POST",
    url: "api/branch/assign",
  },
  updateBranch: {
    method: "PATCH",
    url: "api/branch/:id",
  },
}
