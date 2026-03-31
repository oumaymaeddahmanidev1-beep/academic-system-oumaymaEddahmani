import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"
import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
  const certificate: ICertificate = await request.json()
  const certificateService = new CertificateService()

  await certificateService.updateCertificate(certificate)

  return Response.json({
    message: "The update was completed successfully",
  })
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/certificates/[certificateId]">,
) {
  const { certificateId } = await ctx.params

  const certificateService = new CertificateService()

  // add deleteCertificate method in CertificateService
  await certificateService.deleteCertificate(certificateId)

  return Response.json({
    message: "The deletion was completed successfully",
  })
}
