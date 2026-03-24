"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton(props: { name?: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
    >
      {props.name || "Add"}
    </button>
  )
}
