import mongoose from "mongoose"

const GroupStudentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  {
    collection: "group_students",
  },
)

export default mongoose.models.GroupStudent ||
  mongoose.model("GroupStudent", GroupStudentSchema)
