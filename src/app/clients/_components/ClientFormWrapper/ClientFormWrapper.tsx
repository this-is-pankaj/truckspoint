'use client'

import { useState } from "react"
import { ClientFormSchema } from "../schema.zod"
import GstinForm from "../GstinForm/GstinForm"
import ClientForm from "../ClientForm/ClientForm"

const structureClientData = (data: any): ClientFormSchema => {
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

  const handleSkipGstin = () => {
    setClientData({
      idProof: [],
      name: '',
      nameHindi: '',
      email: [],
      address: [],
      mobileNumber: [],
      phoneNumber: [],
      clientType: [],
      clientFreightType: '',
    })
  }
  return (
    <>
      {
        !clientData
          ? <div className="m-auto max-w-80">
            <GstinForm onSuccess={handleGSTINFetch} onSkipGstin={handleSkipGstin}/>
          </div>
          : <ClientForm onSubmit={onSubmit} clientData={clientData} />
      }
    </>
  )
}

export default ClientFormWrapper