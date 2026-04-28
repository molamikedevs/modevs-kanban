import { deleteTask } from "@/services/tasksApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteTask() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task was successfully deleted", {
        position: "bottom-right",
      })
      toast.success("")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: (err) => toast.error(err.message, { position: "bottom-right" }),
  })

  return { mutate, isPending }
}
