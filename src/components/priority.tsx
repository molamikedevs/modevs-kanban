import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

const priorityColors = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  MEDIUM:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

interface PriorityProps {
  priority?: "LOW" | "MEDIUM" | "HIGH"
  id: string
}

function Priority({ priority, id }: PriorityProps) {
  const { mutate, isPending } = useDeleteTask()

  return (
    <div className="mb-3 flex items-center justify-between">
      {priority && (
        <Badge
          variant="secondary"
          className={`border-none text-[10px] font-bold uppercase ${priorityColors[priority]}`}
        >
          {priority}
        </Badge>
      )}

      {/* Dropdown Menu Integration */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-muted-foreground opacity-0 transition-opacity outline-none group-hover:opacity-100 hover:text-foreground focus:opacity-100">
            <MoreHorizontal size={16} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="cursor-pointer gap-2">
            <Pencil size={14} className="text-muted-foreground" />
            <span>Edit Task</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Destructive Action Styling */}
          <DropdownMenuItem
            onClick={() => mutate(id)}
            className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
          >
            <Trash2 size={14} />
            <span>{isPending ? "Delete Task..." : "Delete Task"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Priority
