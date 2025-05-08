'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewTenantSchema, newTenantSchema } from "../schema.zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TenantFormProps = {
  onSubmit: (data: NewTenantSchema) => void
}

const TenantForm = ({ onSubmit }: TenantFormProps) => {
  const form = useForm<NewTenantSchema>({
    resolver: zodResolver(newTenantSchema),
    defaultValues: {
      name: "",
      description: "",
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

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

export default TenantForm;