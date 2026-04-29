import { GroupService } from "@/services/group-service"
import { Wrapper } from "@/components/students/wrapper"

type GroupStudentsPageProps = {
  searchParams?: Promise<{ groupId?: string }>
}

export default async function GroupStudentsPage(props: GroupStudentsPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined
  const groupService = new GroupService()
  const groups = await groupService.getAll()

  return (
    <div className="grid grid-flow-row gap-4">
      <h1 className="font-bold text-xl">Group Students</h1>
      <Wrapper groups={groups} initialGroupId={searchParams?.groupId ?? ""} />
    </div>
  )
}
