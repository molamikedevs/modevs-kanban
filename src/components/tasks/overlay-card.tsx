import UserAvatar from "@/components/tasks/avatar"
import Priority from "@/components/tasks/priority"
import Tags from "@/components/tasks/tags"
import { formatDate } from "@/lib/utils"
import type { Task } from "@/types"
import { CalendarDays, Paperclip } from "lucide-react"

interface Props {
  task: Task
}

function OverlayCard({ task }: Props) {
  const { title, description, $id, $createdAt, tags, userAvatar } = task
  const formattedDate = formatDate($createdAt)

  return (
    <div className="group relative cursor-grabbing rounded-xl border bg-background p-4 shadow-sm">
      <Priority task={task} />
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

export default OverlayCard
