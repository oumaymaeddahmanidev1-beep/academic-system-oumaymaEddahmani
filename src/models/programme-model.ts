import { Model, model, models, Schema, Types } from "mongoose"
import { ISubject } from "./subject-model"
import { WithStringId } from "./model-t"

export interface IProgramme {
  id?: string
  title: string
  studyFormId?: string
  facultyId?: string
  subjects?: ISubject[]
}

type IReturnType = WithStringId<IProgramme>

export const ProgrammeSchema = new Schema<IProgramme>(
  {
    title: String,
    studyFormId: String,
    facultyId: String,
  },
  {
    timestamps: false,
    collection: "programmes",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IProgramme & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  },
)

export const Programme: Model<IProgramme> =
  models.Programme || model("Programme", ProgrammeSchema)
