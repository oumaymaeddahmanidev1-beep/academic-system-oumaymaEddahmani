import { redirect } from "next/navigation"

type GroupStudentsGroupPageProps = {
  params: Promise<{ groupId: string }>
}

export default async function GroupStudentsGroupPage(
  props: GroupStudentsGroupPageProps,
) {
  const { groupId } = await props.params

  redirect(`/group-students?groupId=${groupId}`)
}
