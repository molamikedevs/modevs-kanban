import { Badge } from "@/components/ui/badge"
import { priorityColors } from "@/constants"
import type { Task } from "@/types"

export default function Priority({ task }: { task: Task }) {
  if (!task.priority) return null

  return (
    <Badge
      variant="secondary"
      className={`border-none text-[10px] font-bold uppercase ${priorityColors[task.priority]}`}
    >
      {task.priority}
    </Badge>
  )
}
