'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddressFormFields from "@/app/(shared)/_components/AddressFormFields/AddressFormFields";
import { useRouter } from "next/navigation";
import { BranchDetails } from "@/lib/types";
import { branchSchema } from "../schema.zod";
import { Checkbox } from "@/components/ui/checkbox";

type BranchFormProps = {
  onSubmit: (data: BranchDetails) => void
  initValue: BranchDetails
  mode?: "create" | "edit"
}

const buttonLabels = {
  create: "Create",
  edit: "Update",
}

const BranchForm = ({ onSubmit, initValue, mode = 'create' }: BranchFormProps) => {
  const router = useRouter()
  const form = useForm<BranchDetails>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      ...initValue,
    },
    mode: "all",
  })

  const handleSubmit = async (formData: BranchDetails) => {
    console.log("Form data", formData)
    // validate the form data and if all looks good, call the onSubmit function
    onSubmit(formData)
  }

  const handleCancel = () => {
    router.push('/branches')
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))}>
        <div className="grid auto-rows-auto md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => {
            return <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input placeholder="Branch name" {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
          <FormField control={form.control} name="description" render={({ field }) => {
            return <FormItem>
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Input placeholder="Description..." {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
        </div>
        <div className="grid auto-rows-auto md:grid-cols-2 gap-4">
          <AddressFormFields initValue={initValue.address} form={form} id="create-branch-form" name="address" />
          <FormField control={form.control} name="primary" render={({ field }) => {
            return <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="text-xs">Set as primary branch</FormLabel>
            </FormItem>
          }
          } />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Button type="submit" className="cursor-pointer">{buttonLabels[mode]}</Button>
          <Button type="button" variant="secondary" className="cursor-pointer" onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}

export default BranchForm;