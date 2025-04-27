import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash, XIcon } from "lucide-react";
import { MouseEvent, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ClientFormSchema } from "../schema.zod";

type ContactListManagerProps = {
  field: ControllerRenderProps<ClientFormSchema>
}

type ContactRowProps = {
  field: ControllerRenderProps<ClientFormSchema>
}

const ContactRow = ({ field }: ContactRowProps) => {
  return (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} value={typeof field.value === 'string' ? field.value : ''} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

const ContactListManager = ({ field }: ContactListManagerProps) => {
  const [contacts, setContacts] = useState<string[]>([])
  const handleAddContact = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Sending out form')
    e.preventDefault()
    e.stopPropagation()
    // Add a blank slot for the new contact
    setContacts([...contacts, ''])
  }
  const handleChangeContact = (index: number, value: string) => {
    setContacts((prev) => {
      const updatedContacts = [...prev]
      updatedContacts[index] = value
      field.value = updatedContacts;
      return updatedContacts;
    })
  }

  const removeContact = (index: number) => {
    setContacts((prev) => {
      const cloned = [...prev]
      cloned.splice(index, 1)
      field.value = cloned
      return cloned;
    })
  }
  console.log('Contacts', contacts)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>Manage Contact</h2>
        <Button onClick={handleAddContact}>Add Email</Button>
      </div>
      <div className="flex gap-4">
        {
          contacts.map((contact, index) => {
            return (
              <div className="flex gap-4" key={index}>
                <ContactRow field={{...field, value: contact, onChange:(e) => handleChangeContact(index, e.target.value)}} />
                {/* <input type="text" value={contact} onChange={(e) => handleChangeContact(index, e.target.value)}/> */}
                <Button variant="destructive" onClick={(e) => {
                  e.preventDefault()
                  removeContact(index)
                  }}>
                  <Trash/>
                </Button>
              </div>
            )
          })
        }
        {/* {
          contacts.map((contact, index) => (
            <div className="flex items-end" key={index}>
            <ContactRow key={index} field={{ ...field, value: contact }} />
            <Button variant="destructive">
              <XIcon />
            </Button>
            </div>
          ))
        } */}
      </div>
    </div>
  )
}
export default ContactListManager;
