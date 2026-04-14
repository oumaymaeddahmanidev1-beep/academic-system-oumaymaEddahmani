import mongoose from "mongoose"
import { connectMongoose } from "@/utils/mongoose-client"

export default async function AdminPage() {
  await connectMongoose()

  const users = await mongoose.connection
    .db!.collection("users")
    .find()
    .toArray()

  return (
    <div className="min-h-screen p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Users List</h1>

      {/* Table Card */}
      <div className=" bg-gray-100 rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          {/* Header */}
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
            <tr>
              <th className="p-4">Email</th>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.map((user: any, index: number) => (
              <tr
                key={user._id}
                className={`border-t hover:bg-blue-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-blue-50/40"
                }`}
              >
                <td className="p-4 font-medium text-gray-800">{user.email}</td>

                <td className="p-4 text-gray-600">{user.name || "No name"}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "administrator"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-grey-700"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
