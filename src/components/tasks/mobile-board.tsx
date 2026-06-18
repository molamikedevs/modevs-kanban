import { Spinner } from "@/components/common/spinner"
import { columnConfig } from "@/constants"
import { useKanban } from "@/hooks/use-kanban"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus } from "@/types"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import MobileTaskCard from "./mobile-task-card"

function MobileBoard() {
  const { tasks, isLoading, updateTaskStatus } = useKanban()

  if (isLoading) return <Spinner />

  // Group tasks by status, in the configured column order
  const grouped = columnConfig.map((col) => ({
    ...col,
    tasks: tasks.filter((t: Task) => t.status === col.status),
  }))

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-20">
      {grouped.map((group) => (
        <StatusSection
          key={group.status}
          group={group}
          onMove={(taskId, nextStatus) => updateTaskStatus(taskId, nextStatus)}
        />
      ))}
    </div>
  )
}

interface StatusSectionProps {
  group: {
    status: string
    title: string
    bg: string
    color: string
    tasks: Task[]
  }
  onMove: (taskId: string, status: TaskStatus) => void
}

function StatusSection({ group, onMove }: StatusSectionProps) {
  const [open, setOpen] = useState(true)

  return (
    <section className="rounded-2xl border bg-card/50 shadow-sm backdrop-blur-sm">
      {/* Section header — tappable to collapse */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              !open && "-rotate-90"
            )}
          />
          <span
            className={`h-2 w-2 rounded-full ${group.bg.replace("/10", "")}`}
          />
          <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {group.title}
          </h2>
        </div>
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full ${group.bg} ${group.color} px-1.5 text-[10px] font-bold`}
        >
          {group.tasks.length}
        </span>
      </button>

      {/* Tasks */}
      {open && group.tasks.length > 0 && (
        <div className="flex flex-col gap-2.5 px-3 pb-3">
          {group.tasks.map((task) => (
            <MobileTaskCard
              key={task.$id}
              task={task}
              currentStatus={group.status as TaskStatus}
              onMove={onMove}
            />
          ))}
        </div>
      )}

      {/* Empty section state */}
      {open && group.tasks.length === 0 && (
        <p className="px-4 pb-4 text-xs text-muted-foreground/60 italic">
          No tasks
        </p>
      )}
    </section>
  )
}

export default MobileBoard
