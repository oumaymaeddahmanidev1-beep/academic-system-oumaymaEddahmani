"use client"

import { useEffect, useState } from "react"

type Group = {
  _id: string
  name: string
}

type Student = {
  _id: string
  firstName: string
  lastName: string
}

type StudentListProps = {
  groups: Group[]
}

export default function StudentList({ groups }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?._id ?? "")
  const [isLoading, setIsLoading] = useState(false)

  const selectedGroup =
    groups.find((group) => group._id === selectedGroupId) ?? null

  const loadStudents = async (groupId: string) => {
    if (!groupId) {
      setStudents([])
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(`/api/group-students/${groupId}`)
      const data: Student[] = await res.json()
      setStudents(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (selectedGroupId) {
      void loadStudents(selectedGroupId)
    }
  }, [selectedGroupId])

  return (
    <div className="grid grid-flow-row gap-5">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(240px,320px)_1fr] md:items-end">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-gray-700">
              Select group
            </span>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-orange-500"
            >
              <option value="">Select group</option>
              {groups.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-lg bg-orange-50 px-4 py-2 text-orange-700">
              Group:{" "}
              <span className="font-semibold">
                {selectedGroup?.name ?? "-"}
              </span>
            </div>
            <div className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700">
              Students: <span className="font-semibold">{students.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-lg text-gray-900">Students list</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  First Name
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Last Name
                </th>
              </tr>
            </thead>

            <tbody>
              {!isLoading && students.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-5 py-8 text-sm text-gray-500">
                    No students found for this group.
                  </td>
                </tr>
              ) : null}

              {isLoading ? (
                <tr>
                  <td colSpan={2} className="px-5 py-8 text-sm text-gray-500">
                    Loading students...
                  </td>
                </tr>
              ) : null}

              {students.map((s, index) => (
                <tr
                  key={s._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {s.firstName}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {s.lastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
