import Table from "@/components/Table/Table";
import { createClient, fetchAllClients } from "../actions/clients";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import ClientFormWrapper from "./_components/ClientFormWrapper/ClientFormWrapper";
import { ClientFormSchema } from "./_components/schema.zod";

const clients = async () => {
  const listOfClients = await fetchAllClients();
  console.log('listOfClients', listOfClients)
  if (!listOfClients) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-center">Client List</h2>
        <p className="px-4">No clients found.</p>
      </div>
    )
  }

  const handleSubmit = async (dataToBeSaved: ClientFormSchema) => {
    "use server";
    const res = await createClient(dataToBeSaved);
    if (res) {
      console.log("Client created successfully", res);
    } else {
      console.log("Failed to create client");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold text-center">Client List</h2>
      <div className="flex flex-col gap-4">
        <p className="px-4">Here you will find the list of all the clients that have ever used your services. This includes you consignors, consignees, drivers, etc. You can create more so as to speed up your bilty generation process.</p>
        <div className="flex flex-row-reverse gap-4 items-center">
          <Button>
            <div className="flex gap-2 items-center">
              <PlusIcon /> New Client
            </div>
          </Button>
        </div>
        <div className="shadow-md p-8 bg-white rounded-md">
          <ClientFormWrapper onSubmit={handleSubmit} />
        </div>
        {/* <Table columns={["Client Name", "Contact Number", "Address", "Actions"]} /> */}
      </div>
    </div>
  )
}

export default clients;