import { fetchAllClients } from "../actions/clients.action";
import { PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddressSchema, ClientFormSchema } from "./_components/schema.zod";
import { Button } from "@/components/ui/button";

const clients = async () => {
  const listOfClients: ClientFormSchema[] = await fetchAllClients();
  console.log('listOfClients', listOfClients)
  const tableColumns = ["Client Name", "Contact Number", "Address", "Actions"]
  if (!listOfClients) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-center">Client List</h2>
        <p className="px-4">No clients found.</p>
      </div>
    )
  }

  const getPrimaryValueFromTheList = (list: any[]) => {
    const match = list.find((item) => item.primary) || list[0]
    return match;
  }

  const getCompleteAddress = (address: AddressSchema) => {
    if (!address) {
      return 'Address unavailable'
    }
    return `${address.streetName},\n ${address.city}-${address.pincode}, ${address.state}`
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold text-center">Client List</h2>
      <div className="flex flex-col gap-4">
        <p className="px-4">Here you will find the list of all the clients that have ever used your services. This includes you consignors, consignees, drivers, etc. You can create more so as to speed up your bilty generation process.</p>
        <div className="flex flex-row-reverse gap-4 items-center">
          <Link href="/clients/new" className="hover:text-primary-foreground">
            <div className="flex gap-2 items-center">
              <PlusIcon /> New Client
            </div>
          </Link>
        </div>
        <Table className="shadow-md p-8 bg-white rounded-md lg:max-w-6xl m-auto">
          <TableHeader>
            <TableRow>
              {
                tableColumns.map((t, index) => (
                  <TableHead key={index}>
                    {t}
                  </TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
          {
            !listOfClients.length
              ? <p className="text-center p-8"> No clients added yet.</p>
              : <TableBody>
                {
                  listOfClients.map((client) => {
                    return <TableRow key={client.name}>
                      <TableCell>
                        {client.name}
                      </TableCell>
                      <TableCell>
                        {getPrimaryValueFromTheList(client.mobileNumber ?? [])}
                      </TableCell>
                      <TableCell className="max-w-80 whitespace-pre-line">
                        {getCompleteAddress(getPrimaryValueFromTheList(client.address ?? []))}
                      </TableCell>
                      <TableCell>
                        <Button variant='ghost'>
                          <TrashIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  })

                }
              </TableBody>
          }
        </Table>
      </div>
    </div>
  )
}

export default clients;