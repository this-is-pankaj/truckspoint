import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditIcon, Network, PlusIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NewTenantSchema } from "./_components/schema.zod"
import { getAllTenantsAction } from "../../actions/tenants.action"

const Tenants = async () => {
  const listOfTenants: NewTenantSchema[] = await getAllTenantsAction();
  const tableColumns = ["Name", "Description", "Created on", "No. of Branches", "Payment status", "Actions"]
  if (!listOfTenants) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-center">Tenant List</h2>
        <p className="px-4">No tenants found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse gap-4 items-center">
        <Link href="/tenants/new" className="hover:text-primary-foreground">
          <div className="flex gap-2 items-center">
            <PlusIcon /> New Tenant
          </div>
        </Link>
      </div>
      <Table className="shadow-md p-8 bg-white rounded-md ">
        <TableHeader>
          <TableRow>
            {
              tableColumns.map((t, index) => (
                <TableHead key={index} className="text-center">
                  {t}
                </TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        {
          !listOfTenants.length
            ? <p className="text-center p-8"> No clients added yet.</p>
            : <TableBody>
              {
                listOfTenants.map((client) => {
                  return <TableRow key={client.name} className="text-center">
                    <TableCell>
                      {client.name}
                    </TableCell>
                    <TableCell>
                      {client.description}
                    </TableCell>
                    <TableCell>
                      {new Date().toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Link href={`/tenants/:clientId/branches`}>
                        2
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/tenants/payments`}>
                        Paid until 2024-01-01
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button variant='ghost'>
                        <EditIcon />
                      </Button>
                      <Button variant='ghost'>
                        <Network />
                      </Button>
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
  )
}

export default Tenants