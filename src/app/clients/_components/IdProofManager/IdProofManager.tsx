import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { ClientFormSchema } from "../schema.zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash } from "lucide-react";

type IdProofManagerProps = {
  control: Control<ClientFormSchema>
  register: UseFormRegister<ClientFormSchema>
  name: any
  title?: string
  label?: string
}

const initValue = {
  type: '',
  value: ''
}

const IdProofManager = ({ control, name, register, title = "Manage contact", label }: IdProofManagerProps) => {
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
        <p className="font-bold">{title} ({fields.length})</p>
        <Button type="button" onClick={addNewItem} variant="ghost" className="text-primary-foreground border border-transparent hover:bg-transparent hover:border-primary-foreground transition-all duration-300 ease-in hover:text-primary-foreground gap-1 cursor-pointer">
          <PlusIcon /> New
        </Button>
      </div>
      {
        fields.map((field, index) => (
          <FormItem key={field.id}>
            <FormControl className="px-4">
              <div className="flex gap-4 items-end">
                {
                  Object.keys(initValue).map((v) => {
                    return (
                      <div key={`${field.id}_${v}`} className="flex flex-col gap-2 flex-1">
                        <FormLabel><span className="capitalize">{v}</span></FormLabel>
                        <Input placeholder="" {...register(`${name}.${index}.${v}` as any)} disabled={index === 0} />
                      </div>
                    )
                  })
                }
                <Button type="button" variant='ghost' onClick={() => handleRemoveItem(index)} className="cursor-pointer"><Trash className="text-red-600" /></Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        ))
      }
    </div>
  );
}

export default IdProofManager;