import type { Task } from "@/types/index"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"

import { taskSchema } from "@/validation"

export type TaskFormValues = z.infer<typeof taskSchema>

function buildDefaultValues(taskToEdit?: Task | null): TaskFormValues {
  if (taskToEdit) {
    return {
      title: taskToEdit.title,
      description: taskToEdit.description || "",
      userAvatar: taskToEdit.userAvatar || "",
      status: taskToEdit.status,
      priority: taskToEdit.priority ?? "MEDIUM",
      tags: taskToEdit.tags ? taskToEdit.tags.join(", ") : "",
    }
  }

  return {
    title: "",
    description: "",
    userAvatar: "",
    status: "TODO",
    priority: "MEDIUM",
    tags: "",
  }
}

export function useTaskForm(taskToEdit?: Task | null) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: buildDefaultValues(taskToEdit),
  })

  const descriptionLength =
    useWatch({ control: form.control, name: "description" })?.length ?? 0

  return { form, descriptionLength }
}
