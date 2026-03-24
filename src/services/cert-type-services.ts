import { CertType, ICertType } from "@/models/cert-type-model"
import { connectMongoose } from "@/utils/mongoose-client"

export class CertTypeService {
  async getAll(): Promise<ICertType[]> {
    await connectMongoose()
    const certTypes = await CertType.find().lean()

    return certTypes.map((certType) => ({
      id: certType._id.toString(),
      title: certType.title,
    }))
  }
}
