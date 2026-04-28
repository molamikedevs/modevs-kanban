import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

const priorityColors = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  MEDIUM:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

interface PriorityProps {
  priority?: "LOW" | "MEDIUM" | "HIGH"
}

function Priority({ priority }: PriorityProps) {
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
      <button className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground">
        <MoreHorizontal size={16} />
      </button>
    </div>
  )
}

export default Priority
