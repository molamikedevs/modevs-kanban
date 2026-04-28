import { updateTask } from "@/services/tasksApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useUpdateTask() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success("Task was successfully created", {
        position: "bottom-right",
      })
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: (error) =>
      toast.error(error.message, { position: "bottom-right" }),
  })

  return { mutate, isPending }
}
