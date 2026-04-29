import { Model, model, models, Schema } from "mongoose"

export interface IGroup {
  id?: string
  name: string
}

const GroupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
})

export const Group: Model<IGroup> = models.Group || model("Group", GroupSchema)
