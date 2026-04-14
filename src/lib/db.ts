import { connectMongoose } from "@/utils/mongoose-client"

export default async function dbConnect() {
  return connectMongoose()
}
