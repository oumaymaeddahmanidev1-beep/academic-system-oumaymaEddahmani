import { ISubject } from "@/types/subject-t"
import { getApi } from "@/utils/server-api"
import { useEffect, useState } from "react"

type IProps = { semesterId: number }

export function SubjectList(props: IProps) {
  const { semesterId } = props
  const [subjects, setSubjects] = useState<ISubject[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // If no semester selected → clear list
      if (!semesterId) {
        setSubjects([])
        return
      }

      try {
        const result = await getApi<ISubject[]>(
          `/api/subjects?semesterId=${semesterId}`,
        )
        setSubjects(result ?? [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [semesterId])

  return (
    <ul className="font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
      {subjects.map((subject) => (
        <li
          key={subject.id}
          className="px-4 py-2 border-b border-gray-200 rounded-t-lg"
        >
          {subject.title}
        </li>
      ))}
    </ul>
  )
}
