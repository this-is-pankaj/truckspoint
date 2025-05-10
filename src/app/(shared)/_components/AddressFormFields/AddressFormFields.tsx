import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { randomUUID } from "crypto";
import { Trash } from "lucide-react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";

type AddressFormFieldsProps = {
  initValue: Record<string, unknown>;
  form: UseFormReturn<any>;
  id: string;
  name: string;
  onRemove?: () => void;
}

const AddressFormFields = ({ initValue, form, id, onRemove, name }: AddressFormFieldsProps) => {
  const handleRemoveItem = () => {
    if (!onRemove) return;
    onRemove()
  }
  return (
    // <FormItem className="even:bg-gray-100 shadow p-8">
    //   <FormControl>
    //     <div className="flex gap-4 items-baseline">
    //       <div className="w-full flex flex-col gap-4">
    //         {
    //           Object.keys(initValue).map((v, index) => {
    //             return (
    //               <div key={`${id}_${v}`} className="flex flex-col gap-2 flex-1">
    //                 <FormLabel><span className="capitalize">{v}</span></FormLabel>
    //                 <Input placeholder="" {...form.register(v)} />
    //               </div>
    //             )
    //           })
    //         }
    //       </div>

    //       {
    //         !onRemove
    //           ? null
    //           : <Button type="button" variant='ghost' onClick={handleRemoveItem} className="cursor-pointer">
    //             <Trash className="text-red-600" /> Delete
    //           </Button>
    //       }

    //     </div>
    //   </FormControl >
    //   <FormMessage />
    // </FormItem>
    Object.keys(initValue).map((v, index) => {
      const controlName = `${name}.${v}`
      return (
        <FormField key={controlName} control={form.control} name={controlName} render={({ field }) => {
          return <FormItem>
            <FormLabel><span className="capitalize">{v}</span></FormLabel>
            <FormControl>
              <Input placeholder={v} {...field} />
            </FormControl>
            {/* <FormMessage className="text-xs" /> */}
          </FormItem>
        }} />
      )
    })
  )
}

export default AddressFormFields