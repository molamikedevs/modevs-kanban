import { getTasks, updateTaskStatus } from "@/services/tasksApi"
import type { Task, TaskStatus } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useTasks() {
  const queryClient = useQueryClient()
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  })

  // Optimistic update — board snaps instantly, no waiting for Appwrite
  const { mutate: moveTask } = useMutation({
    mutationFn: ({
      id,
      status,
      position,
    }: {
      id: string
      status: TaskStatus
      position: number
    }) => updateTaskStatus(id, status, position),

    // Optimistic update — board snaps instantly, no waiting for Appwrite
    onMutate: async ({ id, status, position }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] })
      const previous = queryClient.getQueryData(["tasks"])

      queryClient.setQueryData(["tasks"], (old: Task[] = []) =>
        old.map((t) => (t.$id === id ? { ...t, status, position } : t))
      )

      return { previous }
    },
    onError: (_err, _vars, ctx) => {
      // Roll back on failure
      queryClient.setQueryData(["tasks"], ctx?.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  return { tasks, isLoading, moveTask }
}
