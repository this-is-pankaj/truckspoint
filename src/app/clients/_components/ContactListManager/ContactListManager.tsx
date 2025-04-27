import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { ClientFormSchema } from "../schema.zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash } from "lucide-react";

type ContactListManagerProps = {
  control: Control<ClientFormSchema>
  register: UseFormRegister<ClientFormSchema>
  name: any
  title?: string
  label?: string
}

const ContactListManager = ({ control, name, register, title="Manage contact", label }: ContactListManagerProps) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: name as any, // unique name for your Field Array
  });

  const addNewItem = () => {
    append('')
  }

  const handleRemoveItem = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <p className="font-bold">{ title }</p>
        <Button type="button" onClick={addNewItem}>
          <PlusIcon /> New
        </Button>
      </div>
      {
        fields.map((field, index) => (
          <FormItem key={field.id}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex gap-4">
                <Input placeholder="" {...register(`${name}.${index}` as any)} />
                <Button type="button" variant="destructive" onClick={() => handleRemoveItem(index)}><Trash /></Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        ))
      }
    </div>
  );
}

export default ContactListManager;