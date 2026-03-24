"use client"

import { FormFields } from "./form-fields"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"

type IProps = {
  certTypes: ICertType[]
  getCertFromApi: () => void
  setEditCert: (cert?: ICertificate) => void
  editCert?: ICertificate
}

export function Form(props: IProps) {
  return <FormFields {...props} />
}
