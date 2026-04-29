import type { Task } from "@/types/index"
import { useQueryClient } from "@tanstack/react-query"

import { useCreateTask } from "@/hooks/useCreateTask"
import { useUpdateTask } from "@/hooks/useUpdateTask"
import { formatTagsForSubmit, getNextPosition } from "@/lib/utils"

import type { TaskFormValues } from "./use-task-form"

interface UseTaskSubmitOptions {
  taskToEdit?: Task | null
  onSuccess?: () => void
}

export function useTaskSubmit({ taskToEdit, onSuccess }: UseTaskSubmitOptions) {
  const queryClient = useQueryClient()
  const { mutate: createTask, isPending: isCreating } = useCreateTask()
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask()

  const onSubmit = (data: TaskFormValues) => {
    const formattedData = {
      ...data,
      tags: formatTagsForSubmit(data.tags),
    }

    // Strip empty avatar so the backend doesn't store a blank string
    if (!formattedData.userAvatar) delete formattedData.userAvatar

    if (taskToEdit) {
      updateTask({ ...formattedData, $id: taskToEdit.$id } as Task, {
        onSuccess: () => onSuccess?.(),
      })
    } else {
      const existingTasks = queryClient.getQueryData<Task[]>(["tasks"]) || []
      const position = getNextPosition(existingTasks, data.status)

      createTask({ ...formattedData, position } as Task, {
        onSuccess: () => onSuccess?.(),
      })
    }
  }

  return {
    onSubmit,
    isPending: isCreating || isUpdating,
  }
}
