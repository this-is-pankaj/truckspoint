'use client'
import { ClientFormSchema, clientFormSchema } from "./schema.zod"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

type ClientFormProps = {
  onSubmit: (data: any) => void
}

const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const form = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {},
    mode: "onBlur",
  })
  const handleSubmit = async (formData: ClientFormSchema) => {
    // validate the form data and if all looks good, call the onSubmit function
    onSubmit(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 space-y-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="clientDetails">
            <AccordionTrigger className="flex justify-between items-center px-4 py-2 w-full">
              <p>Basic Details</p>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              {/* <div className="flex flex-col gap-4">
                <InputGroup type="text" name="gstin" placeholder="GSTIN" label="GSTIN" fieldSchema={clientFormSchema.shape['gstin']} required />
                <InputGroup type="checkbox" name="no_gst" label="Not Registered with GST" />
                <InputGroup type="text" name="name" placeholder="Client Name" label="Client Name" fieldSchema={clientFormSchema.shape['name']} required />
                <InputGroup type="text" name="nameHindi" placeholder="Client Name in Hindi" label="Client Name in Hindi" fieldSchema={clientFormSchema.shape['nameHindi']} />
              </div> */}
              <FormField control={form.control} name="gstin" render={({ field }) => {
                return <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              }} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  )
}

export default ClientForm