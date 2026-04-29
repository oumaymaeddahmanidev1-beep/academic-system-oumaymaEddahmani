"use client"

import { useCallback, useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { IGroup } from "@/models/group-model"
import { IGroupStudent } from "@/models/group-student-model"
import { StudentList } from "./student-list"

type IProps = {
  groups: IGroup[]
  initialGroupId?: string
}

export function Wrapper(props: IProps) {
  const { groups, initialGroupId = "" } = props

  const [students, setStudents] = useState<IGroupStudent[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState(
    initialGroupId || groups[0]?.id || "",
  )

  const getStudentsFromApi = useCallback(() => {
    if (!selectedGroupId) {
      setStudents([])
      return
    }

    getApi<IGroupStudent[]>(`/api/group-students/${selectedGroupId}`).then(
      (res) => {
      setStudents(res ?? [])
      },
    )
  }, [selectedGroupId])

  useEffect(() => {
    getStudentsFromApi()
  }, [getStudentsFromApi])

  return (
    <StudentList
      groups={groups}
      students={students}
      selectedGroupId={selectedGroupId}
      setSelectedGroupId={setSelectedGroupId}
    />
  )
}
