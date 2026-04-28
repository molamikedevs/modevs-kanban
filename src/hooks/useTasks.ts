import { getTasks } from "@/services/tasksApi"
import { useQuery } from "@tanstack/react-query"

export function useTasks() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  })

  return { tasks, isLoading }
}
