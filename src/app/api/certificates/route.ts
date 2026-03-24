import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"
import { NextRequest } from "next/server"

export async function GET() {
  const certificateService = new CertificateService()
  const certificates = await certificateService.getCertificates()

  return Response.json(certificates)
}

export async function POST(request: NextRequest) {
  const certificate: ICertificate = await request.json()
  const certificateService = new CertificateService()

  await certificateService.saveCertificate(certificate)

  return Response.json({
    message: "The save was completed successfully",
  })
}
