'use client'
import InputGroup from "@/components/InputGroup/InputGroup"
import Form from "next/form"
import { clientFormSchema } from "./schema.zod"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { AccordionTrigger } from "@radix-ui/react-accordion"

type ClientFormProps = {
  onSubmit: (data: FormData) => void
}

const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const handleSubmit = async (formData: FormData) => {
    // validate the form data and if all looks good, call the onSubmit function
    onSubmit(formData)
  }

  return (
    <Form action={handleSubmit}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="clientDetails">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Client Details</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <InputGroup type="text" name="name" placeholder="Client Name" label="Client Name" fieldSchema={clientFormSchema.shape['name']} required />
              <InputGroup type="text" name="nameHindi" placeholder="Client Name in Hindi" label="Client Name in Hindi" fieldSchema={clientFormSchema.shape['nameHindi']} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex gap-4">
        <InputGroup type="text" name="gstin" placeholder="GSTIN" label="GSTIN" fieldSchema={clientFormSchema.shape['gstin']} required />
        <InputGroup type="checkbox" name="no_gst" label="Not Registered with GST" />
      </div>
    </Form>
  )
}

export default ClientForm