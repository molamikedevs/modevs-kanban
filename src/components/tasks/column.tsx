import type { Task } from "@/types"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableTaskCard from "./sortable-task-card"

interface ColConfig {
  status: string
  title: string
  bg: string
  color: string
}

interface Props {
  col: ColConfig
  tasks: Task[]
  activeId: string | null
}

function Column({ col, tasks, activeId }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: col.status })

  return (
    <div
      ref={setNodeRef}
      className={`flex h-[calc(100vh-14rem)] min-h-125 w-[320px] shrink-0 snap-center flex-col rounded-2xl border p-4 shadow-sm backdrop-blur-sm transition-colors duration-200 ${isOver ? "border-primary/60 bg-primary/5" : "bg-card/50"} `}
    >
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${col.bg.replace("/10", "")}`}
          />
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {col.title}
          </h2>
        </div>
        <span
          className={`flex h-6 min-w-6 items-center justify-center rounded-full ${col.bg} ${col.color} px-2 text-xs font-bold`}
        >
          {tasks.length}
        </span>
      </div>

      {/* Sortable Task List */}
      <div className="kanban-scrollbar flex-1 touch-pan-y overflow-y-auto pr-2 pb-2">
        <SortableContext
          items={tasks.map((t) => t.$id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3 pb-2">
            {tasks.map((task) => (
              <SortableTaskCard
                key={task.$id}
                task={task}
                isGhost={activeId === task.$id}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}

export default Column
