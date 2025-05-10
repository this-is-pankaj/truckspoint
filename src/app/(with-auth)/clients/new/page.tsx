import { createClientAction } from "@/app/actions/clients.action";
import ClientFormWrapper from "../_components/ClientFormWrapper/ClientFormWrapper";
import { ClientFormSchema } from "../_components/schema.zod";
import { redirect } from "next/navigation";

const NewClient = () => {
  const handleSubmit = async (dataToBeSaved: ClientFormSchema) => {
    "use server";
    const res = await createClientAction(dataToBeSaved);
    if (res) {
      console.log("Client created successfully", res);
      redirect('/clients')
    } else {
      console.log("Failed to create client");
    }
  }
  
  return (
    <div className="shadow-md p-8 bg-white rounded-md">
      <ClientFormWrapper onSubmit={handleSubmit} />
    </div>
  )
}

export default NewClient;