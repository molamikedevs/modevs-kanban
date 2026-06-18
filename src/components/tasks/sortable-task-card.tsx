import UserAvatar from "@/components/tasks/avatar"
import Priority from "@/components/tasks/priority"
import Tags from "@/components/tasks/tags"
import { formatDate } from "@/lib/utils"
import type { Task, TaskStatus } from "@/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CalendarDays, Paperclip } from "lucide-react"
import TaskActionsMenu from "./task-actions-menu"

interface Props {
  task: Task
  isGhost?: boolean
}

function SortableTaskCard({ task, isGhost }: Props) {
  const { title, description, $id, $createdAt, tags, userAvatar } = task
  const formattedDate = formatDate($createdAt)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: $id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative cursor-grab rounded-xl border bg-background p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md active:cursor-grabbing ${isSortableDragging ? "scale-95 opacity-40 shadow-lg ring-2 ring-primary/30" : ""} ${isGhost ? "opacity-0" : ""}`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <Priority task={task} />

        <TaskActionsMenu
          task={task}
          currentStatus={task.status as TaskStatus}
        />
      </div>
      <h3 className="leading-tight font-semibold text-foreground">{title}</h3>
      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
        {description}
      </p>
      {tags && tags.length > 0 && <Tags tags={tags} />}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays size={13} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-foreground">
            <Paperclip size={13} />
            <span>2</span>
          </div>
        </div>
        <UserAvatar userAvatar={userAvatar || ""} id={$id} />
      </div>
    </div>
  )
}

export default SortableTaskCard
