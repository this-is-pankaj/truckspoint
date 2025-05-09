'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { gstinFormSchema } from "../schema.zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchGstinDetailsAction } from "@/app/actions/clients.action"

type GstinFormProps = {
  onSuccess: (data: any) => void
  onSkipGstin: () => void
}

const GstinForm = ({ onSuccess, onSkipGstin }: GstinFormProps) => {
  const gstForm = useForm({
    resolver: zodResolver(gstinFormSchema),
    defaultValues: {
      gstin: "",
    },
    mode: "onBlur"
  })

  const handleFetchDetails = async ({ gstin }: any) => {
    console.log("Fetching details for GSTIN:", gstin)
    const res = await fetchGstinDetailsAction(gstin)
    if (res) {
      onSuccess(res)
    } else {
      console.log("Failed to fetch details")
    }
  }

  const skipGstin = () => {
    onSkipGstin()
  }

  return (
    <Form {...gstForm}>
      <form onSubmit={gstForm.handleSubmit(handleFetchDetails)} className="flex flex-col gap-4">
        <FormField control={gstForm.control} name="gstin" render={({ field }) => {
          return <FormItem>
            <FormLabel>GSTIN</FormLabel>
            <FormControl>
              <Input placeholder="Enter GSTIN" {...field} />
            </FormControl>
            {/* <FormDescription>
              The details of the client will be fetched and filled automatically.
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        }} />
        <div className="flex flex-col md:flex-row gap-4">
          <Button type="submit" className="m-auto min-w-[120px]">
            Fetch Details
          </Button>
          <Button type="button" variant="secondary" className="m-auto" onClick={skipGstin}>
            Proceed without GSTIN
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default GstinForm