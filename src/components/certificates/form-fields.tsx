"use client"

import { createCertificates } from "@/actions/certificates"
import { SubmitButton } from "@/components/parts/submit-button"
import { useBoundStore, useShallow } from "@/store/store-provider"
import { ICertificate } from "@/models/certificate-model"
import { ICertType } from "@/models/cert-type-model"
import { Select } from "../parts/select"
import { TextField } from "../parts/text-field"
import { IState } from "@/types/shared-t"
import { toSelArr } from "@/utils/form/select-helper"
import { useActionState, useEffect, useRef } from "react"

const initialState: IState = {
  message: "",
  errors: undefined,
  isSaved: false,
}

type IProps = {
  certTypes: ICertType[]
  getCertFromApi: () => void
  setEditCert: (cert?: ICertificate) => void
  editCert?: ICertificate
}

export function FormFields(props: IProps) {
  const ref = useRef<HTMLFormElement>(null)
  const { certTypes, getCertFromApi, editCert, setEditCert } = props

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    })),
  )

  const [state, formAction] = useActionState<IState, FormData>(
    createCertificates,
    initialState,
  )

  const selProps = {
    label: "Certificate Title",
    name: "typeId",
    isRequired: true,
    defaultValue: editCert?.typeId,
    error: state?.errors?.typeId && state?.errors?.typeId.join(" | "),
  }

  useEffect(() => {
    if (state.isSaved) {
      setMessage(state?.message ?? "")
      getCertFromApi()
    }
  }, [getCertFromApi, setMessage, state])

  const handleAction = (data: FormData) => {
    formAction(data)
    ref.current?.reset()

    if (data.has("id")) {
      setEditCert(undefined)
    }
  }

  return (
    <form ref={ref} action={handleAction} className="grid gap-y-5 max-w-md">
      <div className="grid grid-cols-2">
        <Select
          options={toSelArr<ICertType>(certTypes, "title")}
          selProps={selProps}
        />
      </div>

      <div className="grid grid-cols-2">
        <TextField
          label="Note"
          name="company"
          isRequired={true}
          defaultValue={editCert?.company}
          errors={state?.errors?.company}
        />
      </div>

      {editCert?.id && <input type="hidden" name="id" value={editCert.id} />}

      <div
        className={`my-2 text-sm italic p-1 ${
          state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""
        }`}
      >
        {state?.message}
      </div>

      <div className="mt-1 w-28">
        <SubmitButton name={editCert?.id ? "Save" : "Add"} />
      </div>
    </form>
  )
}
