import { GroupStudent, IGroupStudent } from "@/models/group-student-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class GroupStudentService {
  async getByGroupId(groupId: string): Promise<IGroupStudent[]> {
    if (!Types.ObjectId.isValid(groupId)) {
      return []
    }

    await connectMongoose()
    const students = await GroupStudent.find({ groupId }).sort({
      firstName: 1,
      lastName: 1,
    }).lean()

    return students.map((student) => ({
      id: student._id.toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      groupId,
    }))
  }
}
