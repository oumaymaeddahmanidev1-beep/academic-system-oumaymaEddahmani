import { Group, IGroup } from "@/models/group-model"
import { connectMongoose } from "@/utils/mongoose-client"

export class GroupService {
  async getAll(): Promise<IGroup[]> {
    await connectMongoose()

    const groups = await Group.find().sort({ name: 1 }).lean()

    return groups.map((group) => ({
      id: group._id.toString(),
      name: group.name,
    }))
  }
}
