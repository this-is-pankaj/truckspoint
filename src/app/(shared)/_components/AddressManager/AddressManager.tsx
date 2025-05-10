import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { ClientFormSchema } from "../../../(with-auth)/clients/_components/schema.zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash } from "lucide-react";
import { NewTenantSchema } from "@/app/(with-auth)/tenants/_components/schema.zod";

type AddressManagerProps = {
  control: Control<ClientFormSchema | NewTenantSchema>
  register: UseFormRegister<ClientFormSchema | NewTenantSchema>
  name: any
  title?: string
  allowNew?: boolean
}

const initValue = {
  streetName: '',
  landmark: '',
  pincode: '',
  city: '',
  state: '',
}

const AddressManager = ({ control, name, register, title = "Manage address", allowNew = true }: AddressManagerProps) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: name as any, // unique name for your Field Array
  });

  const addNewItem = () => {
    append(initValue)
  }

  const handleRemoveItem = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-baseline gap-4">
        {
          !allowNew
            ? <p className="font-bold">{title} </p>
            : <>
              <p className="font-bold">{title} ({fields.length})</p>
              <Button type="button" onClick={addNewItem} variant="ghost" className="text-primary-foreground border border-transparent hover:bg-transparent hover:border-primary-foreground transition-all duration-300 ease-in hover:text-primary-foreground gap-1 cursor-pointer">
                <PlusIcon /> New
              </Button>
            </>
        }
      </div>

      {
        fields.map((field, index) => (
          <FormItem key={field.id} className="even:bg-gray-100 shadow p-8">
            <FormControl>
              <div className="flex gap-4 items-baseline">
                <div className="w-full flex flex-col gap-4">
                  {
                    Object.keys(initValue).map((v) => {
                      return (
                        <div key={`${field.id}_${v}`} className="flex flex-col gap-2 flex-1">
                          <FormLabel><span className="capitalize">{v}</span></FormLabel>
                          <Input placeholder="" {...register(`${name}.${index}.${v}` as any)} />
                        </div>
                      )
                    })
                  }
                </div>

                <Button type="button" variant='ghost' onClick={() => handleRemoveItem(index)} className="cursor-pointer"><Trash className="text-red-600" /> Delete</Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        ))
      }
    </div>
  );
}

export default AddressManager;