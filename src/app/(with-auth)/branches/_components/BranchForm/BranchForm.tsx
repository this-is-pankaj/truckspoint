'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewTenantSchema, newTenantSchema } from "../schema.zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddressFormFields from "@/app/(shared)/_components/AddressFormFields/AddressFormFields";

type TenantFormProps = {
  onSubmit: (data: NewTenantSchema) => void
}

const initValue = {
  name: "",
  description: "",
  branch: {
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
    },
  }
}

const TenantForm = ({ onSubmit }: TenantFormProps) => {
  const form = useForm<NewTenantSchema>({
    resolver: zodResolver(newTenantSchema),
    defaultValues: {
      ...initValue,
    },
    mode: "all",
  })

  const handleSubmit = async (formData: NewTenantSchema) => {
    console.log("Form data", formData)
    // validate the form data and if all looks good, call the onSubmit function
    onSubmit(formData)
  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))}>
        <div className="grid auto-rows-auto md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => {
            return <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input placeholder="Tenant name" {...field} />
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
          <FormField control={form.control} name="branch.name" render={({ field }) => {
            return <FormItem>
              <FormLabel>Branch name:</FormLabel>
              <FormControl>
                <Input placeholder="Branch/ HQ name" {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
          <FormField control={form.control} name="branch.description" render={({ field }) => {
            return <FormItem>
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Input placeholder="Branch/ HQ Description..." {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
        </div>
        <div className="grid auto-rows-auto md:grid-cols-2 gap-4">
          {/* <AddressManager title="Address" register={form.register as any} control={form.control as any} name="branch.address" allowNew={false} /> */}
          <AddressFormFields initValue={initValue.branch.address} form={form} id="create-tenant-form" name="branch.address" />
        </div>
        <Button type="submit" className="min-w-32">Create</Button>
      </form>
    </Form>
  );
}

export default TenantForm;