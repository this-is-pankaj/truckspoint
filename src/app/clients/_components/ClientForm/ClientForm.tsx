'use client'

import { ClientFormSchema, clientFormSchema } from "../schema.zod"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import ContactListManager from "../ContactListManager/ContactListManager"
import { Button } from "@/components/ui/button"

type ClientFormProps = {
  onSubmit: (data: any) => void
  clientData?: ClientFormSchema
}

const ClientForm = ({ onSubmit, clientData }: ClientFormProps) => {
  console.log("ClientForm", clientData)
  const form = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: { ...clientData },
    mode: "onBlur",
  })
  const handleSubmit = async (formData: ClientFormSchema) => {
    console.log("Form data", formData)
    // validate the form data and if all looks good, call the onSubmit function
    onSubmit(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FormField control={form.control} name="name" render={({ field }) => {
            return <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
              <FormMessage />
            </FormItem>
          }} />
          <FormField control={form.control} name="nameHindi" render={({ field }) => {
            return <FormItem>
              <FormLabel>Name (Hindi)</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Contact Information</h2>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="border p-4">
              <ContactListManager title="Manage Emails" register={form.register} control={form.control} name="email" label="Email" />
            </div>
            <div className="border p-4">
              <ContactListManager title="Manage Mobile numbers" register={form.register} control={form.control} name="mobileNumber" label="Mobile number" />
            </div>
            <div className="border p-4">
              <ContactListManager title="Manage Phone numbers" register={form.register} control={form.control} name="phoneNumber" label="Phone number" />
            </div>
          </div>
        </div>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}

export default ClientForm