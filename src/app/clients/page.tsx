import InputGroup from "@/components/InputGroup/InputGroup";
import Table from "@/components/Table/Table";
import Form from 'next/form'
import { createClient, fetchAllClients } from "../actions/clients";
import AppForm from "@/components/AppForm/AppForm";
import ClientForm from "./_components/ClientForm/ClientForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const clients = async () => {
  const listOfClients = await fetchAllClients();
  if (!listOfClients) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-center">Client List</h2>
        <p className="px-4">No clients found.</p>
      </div>
    )
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const gstin = formData.get("gstin") as string;
    const dataToBeSaved = {
      gstin: gstin,
      name: "Test Client",
      address: "Test Address",
      contactNumber: "1234567890",
    }
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
          <Form action="/api/get-info">
            <InputGroup type="search" placeholder="Search" name="gstin" />
          </Form>
        </div>
        {/* <div className="overflow-auto w-full">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Client Name</th>
                <th className="border border-gray-300 px-4 py-2">Contact Number</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        {/* <Form action={handleSubmit}>
          <InputGroup placeholder="GTSIN" name="gstin" label="GSTIN" />
        </Form> */}
        <ClientForm onSubmit={handleSubmit} />
        <Table columns={["Client Name", "Contact Number", "Address", "Actions"]} />
      </div>
    </div>
  )
}

export default clients;