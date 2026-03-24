"use client"

import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { deleteApi } from "@/utils/server-api"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
// import { useSession } from "@/utils/auth-client"

type IProps = {
  certTypes: ICertType[]
  certificates: ICertificate[]
  setEditCert: (cert: ICertificate) => void
  getCertFromApi: () => void
}

export function CertList(props: IProps) {
  const { certTypes, certificates, setEditCert, getCertFromApi } = props
  // const { data: session } = useSession()

  const findType = (id?: string) => certTypes.find((i) => i.id === id)?.title

  const changeCert = (id?: string) => {
    if (!id) return
    const cert = certificates.find((i) => i.id === id)
    if (!cert) return
    setEditCert(cert)
  }

  const removeCert = async (id?: string) => {
    if (!id) return

    await deleteApi("/api/certificates", id)
    getCertFromApi()
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Note
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="bg-white border-b">
        {certificates.map((c) => (
          <tr key={c.id}>
            <td className="px-6 py-4">{findType(c.typeId)}</td>
            <td className="px-6 py-4">{c.company}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  title="Edit"
                  onClick={() => changeCert(c.id)}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>

                <button
                  type="button"
                  title="Delete"
                  onClick={() => removeCert(c.id)}
                  className="inline-flex items-center gap-1 rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
