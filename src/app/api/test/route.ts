import { connectMongoose } from "@/utils/mongoose-client"

export async function GET() {
  await connectMongoose()

  return Response.json({ success: true })
}
