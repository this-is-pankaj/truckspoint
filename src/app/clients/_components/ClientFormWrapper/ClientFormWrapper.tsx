'use client'

import { useState } from "react"
import { ClientFormSchema } from "../schema.zod"
import GstinForm from "../GstinForm/GstinForm"
import ClientForm from "../ClientForm/ClientForm"

const structureClientData = (data: any): ClientFormSchema => {
  console.log("Structuring client data", data)
  return {
    idProof: [
      {
        type: "GSTIN",
        value: data.gstin,
      },
    ],
    name: data.lgnm,
    nameHindi: '',
    email: [],
    address: [
      {
        streetName: data.pradr.addr.st,
        city: data.pradr.addr.loc,
        state: data.pradr.addr.stcd,
        pincode: data.pradr.addr.pncd,
        landmark: '',
        coordinates: [],
        primary: true,
      },
    ],
    mobileNumber: [],
    phoneNumber: [],
    clientType: [],
    clientFreightType: '',
  }
}

type ClientFormWrapperProps = {
  onSubmit: (data: any) => void
}

const ClientFormWrapper = ({ onSubmit }: ClientFormWrapperProps) => {
  const [clientData, setClientData] = useState<ClientFormSchema | null>(null)
  const handleGSTINFetch = (data: any) => {
    setClientData(structureClientData(data))
  }
  return (
    <>
      {
        !clientData
          ? <GstinForm onSuccess={handleGSTINFetch} />
          : <ClientForm onSubmit={onSubmit} clientData={clientData} />
      }
    </>
  )
}

export default ClientFormWrapper