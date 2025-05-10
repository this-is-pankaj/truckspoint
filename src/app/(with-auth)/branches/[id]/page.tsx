import { getBranchByIdAction, updateBranchAction } from "@/app/actions/branches.action";
import BranchForm from "../_components/BranchForm/BranchForm";
import { redirect } from "next/navigation";
import { BranchDetails } from "@/lib/types";

const EditBranchPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  console.log("Edit Branch Page", id);
  const { data: branchInfo, status} = await getBranchByIdAction(id);
  if (status !== 200 || !branchInfo) {
    redirect("/branches");
  }

  if(!branchInfo.address.state) {
    branchInfo.address.state = "Maharashtra"
    branchInfo.address.coordinates = [0, 0]
  }
  const handleSubmit = async (data: BranchDetails) => {
    "use server";
    await updateBranchAction(id, data);
    redirect("/branches");
  }

  return (
    <div className="shadow-md p-8 bg-white rounded-md">
      <BranchForm onSubmit={handleSubmit} initValue={branchInfo} mode="edit"/>
    </div>
  );
}
export default EditBranchPage;
