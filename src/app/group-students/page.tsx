import dbConnect from "@/lib/db"
import Group from "@/models/group-model"
import StudentList from "@/components/students/student-list"

type GroupOption = {
  _id: string
  name: string
}

export default async function Page() {
  await dbConnect()

  const groupDocs = await Group.find().lean()
  const groups: GroupOption[] = groupDocs.map((group) => ({
    _id: String(group._id),
    name: group.name,
  }))

  return (
    <div className="grid grid-flow-row gap-4">
      <h1 className="font-bold text-xl">Students by group</h1>
      <StudentList groups={groups} />
    </div>
  )
}
