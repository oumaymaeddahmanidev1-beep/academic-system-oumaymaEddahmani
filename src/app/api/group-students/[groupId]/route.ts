import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import GroupStudent from "@/models/group-student-model"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  await dbConnect()

  const { groupId } = await params

  const students = await GroupStudent.find({ groupId })

  return NextResponse.json(students)
}
