import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, EditIcon, Network, PlusIcon, TrashIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllBranchesAction } from "@/app/actions/branches.action"

const Branches = async () => {
  const {data: listOfBranches } = await getAllBranchesAction();
  const tableColumns = ["Name", "Description", "City/ State", "Created on", "Primary","Payment status",  "Active", "Actions"]
  if (!listOfBranches) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-center">Branch List</h2>
        <p className="px-4">No branch found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse gap-4 items-center">
        <Link href="/branches/new" className="hover:text-primary-foreground">
          <div className="flex gap-2 items-center">
            <PlusIcon /> New Branch
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
          !listOfBranches.length
            ? <p className="text-center p-8"> No branches added yet.</p>
            : <TableBody>
              {
                listOfBranches.map((branch) => {
                  return <TableRow key={branch.name} className="text-center">
                    <TableCell className="text-left">
                      {branch.name}
                    </TableCell>
                    <TableCell className="text-left">
                      {branch.description}
                    </TableCell>
                    <TableCell>
                      {branch.address.city}, {branch.address.state}
                    </TableCell>
                    <TableCell>
                      {branch.createdAt}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      {
                        !branch.primary
                          ? null
                          : <Check className="text-green-600" />
                      }
                    </TableCell>
                    <TableCell>
                      <Link href={`/tenants/payments`}>
                        Paid until 2024-01-01
                      </Link>
                    </TableCell>

                    <TableCell className="flex justify-center">
                      {
                        branch.isDeleted
                          ? <X className="text-red-600" />
                          : <Check className="text-green-600" />
                      }
                    </TableCell>
                    <TableCell>
                      <Link href={`/branches/${branch.branchId}`}>
                        <EditIcon />
                      </Link>
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

export default Branches