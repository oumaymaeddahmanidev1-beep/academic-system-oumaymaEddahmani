import { Wrapper } from "@/components/certificates/wrapper"
import { CertTypeService } from "@/services/cert-type-services"

export default async function CertificatePage() {
  const certTypeService = new CertTypeService()
  const certTypes = await certTypeService.getAll()

  return <Wrapper certTypes={certTypes ?? []} />
}
