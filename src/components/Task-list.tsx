import { formatDate } from "@/lib/utils"
import type { Task } from "@/types/index"
import { CalendarDays, Paperclip } from "lucide-react"
import UserAvatar from "./avatar"
import Priority from "./priority"
import Tags from "./tags"

interface Props {
  tasks: Task[]
}

function TaskList({ tasks }: Props) {
  return (
    <div className="flex flex-col gap-3 pb-2">
      {tasks.map((task) => {
        const { title, description, $id, $createdAt, tags, userAvatar } = task
        const formattedDate = formatDate($createdAt)

        return (
          <div
            key={$id}
            className="group relative cursor-grab rounded-xl border bg-background p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md active:cursor-grabbing"
          >
            {/* Priority & Options */}
            <Priority task={task} />
            {/* Content */}
            <h3 className="leading-tight font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
              {description}
            </p>

            {/* Tags Section */}
            {tags && tags.length > 0 && <Tags tags={tags} />}

            {/* Bottom Row: Metadata */}
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

              {/* UserAvatar Avatar */}
              <UserAvatar userAvatar={userAvatar || ""} id={$id} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TaskList
