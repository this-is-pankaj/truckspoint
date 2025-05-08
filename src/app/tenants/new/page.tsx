import { createTenantAction } from "@/app/actions/tenants.action";
import { NewTenantSchema } from "../_components/schema.zod";
import TenantForm from "../_components/TenantForm/TenantForm";
import { redirect } from "next/navigation";

const NewTenantForm = () => {
  const handleSubmit = async (data: NewTenantSchema) => {
    "use server";
    await createTenantAction(data);
    redirect("/tenants");
  }
  return (
    <div className="shadow-md p-8 bg-white rounded-md md:w-80">
      <TenantForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default NewTenantForm;