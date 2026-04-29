import { NextRequest } from "next/server"
import { GroupStudentService } from "@/services/group-student-service"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params
  const groupStudentService = new GroupStudentService()
  const students = await groupStudentService.getByGroupId(groupId)

  return Response.json(students)
}
