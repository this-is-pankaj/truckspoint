import { redirect } from "next/navigation";
import { BranchSchema } from "../_components/schema.zod";
import BranchForm from "../_components/BranchForm/BranchForm";
import { createBranchAction } from "@/app/actions/branches.action";

const NewTenantForm = () => {
  const handleSubmit = async (data: BranchSchema) => {
    "use server";
    await createBranchAction(data);
    redirect("/branches");
  }
  const defaultInitValue = {
    name: "",
    description: "",
    primary: true,
    address: {
      streetName: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      coordinates: [0, 0]
    }
  }
  return (
    <div className="shadow-md p-8 bg-white rounded-md">
      <BranchForm onSubmit={handleSubmit} initValue={defaultInitValue}/>
    </div>
  );
}

export default NewTenantForm;