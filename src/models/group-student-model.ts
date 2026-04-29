import { Model, model, models, Schema, Types } from "mongoose"

export interface IGroupStudent {
  id?: string
  firstName: string
  lastName: string
  groupId: string
}

interface IGroupStudentDocument
  extends Omit<IGroupStudent, "id" | "groupId"> {
  groupId: Types.ObjectId
}

const GroupStudentSchema = new Schema<IGroupStudentDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  {
    collection: "group_students",
  },
)

export const GroupStudent: Model<IGroupStudentDocument> =
  models.GroupStudent || model("GroupStudent", GroupStudentSchema)
