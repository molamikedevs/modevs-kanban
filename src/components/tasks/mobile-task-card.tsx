import UserAvatar from "@/components/tasks/avatar"
import Priority from "@/components/tasks/priority"
import Tags from "@/components/tasks/tags"
import TaskActionsMenu from "@/components/tasks/task-actions-menu"
import { formatDate } from "@/lib/utils"
import type { Task, TaskStatus } from "@/types"
import { CalendarDays, Paperclip } from "lucide-react"

interface Props {
  task: Task
  currentStatus: TaskStatus
  onMove: (taskId: string, status: TaskStatus) => void
}

function MobileTaskCard({ task, currentStatus, onMove }: Props) {
  const { title, description, $id, $createdAt, tags, userAvatar } = task

  return (
    <div className="group relative rounded-xl border bg-background p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Priority task={task} />
          <h3 className="mt-1 text-sm leading-tight font-semibold text-foreground">
            {title}
          </h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <TaskActionsMenu
          task={task}
          currentStatus={currentStatus}
          onMove={onMove}
        />
      </div>

      {tags && tags.length > 0 && <Tags tags={tags} />}

      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2.5">
        <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays size={12} />
            <span>{formatDate($createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip size={12} />
            <span>2</span>
          </div>
        </div>
        <UserAvatar userAvatar={userAvatar || ""} id={$id} />
      </div>
    </div>
  )
}

export default MobileTaskCard
