import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { columnConfig } from "@/constants"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import type { Task, TaskStatus } from "@/types"
import { ArrowRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import TaskForm from "./task-form"

interface Props {
  task: Task
  currentStatus: TaskStatus
  onMove?: (taskId: string, status: TaskStatus) => void
}

export default function TaskActionsMenu({
  task,
  currentStatus,
  onMove,
}: Props) {
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()
  const [editOpen, setEditOpen] = useState(false)

  const moveTargets = columnConfig.filter((c) => c.status !== currentStatus)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-muted-foreground hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 md:data-[state=open]:opacity-100"
            aria-label="Task actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          {/* Move section — only when onMove is provided (mobile) */}
          {onMove && moveTargets.length > 0 && (
            <>
              <DropdownMenuLabel className="text-[10px] tracking-wider text-muted-foreground uppercase">
                Move to
              </DropdownMenuLabel>
              {moveTargets.map((target) => (
                <DropdownMenuItem
                  key={target.status}
                  onClick={() => onMove(task.$id, target.status as TaskStatus)}
                  className="gap-2 text-sm"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${target.bg.replace("/10", "")}`}
                  />
                  {target.title}
                  <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground" />
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem
            onSelect={() => setEditOpen(true)}
            className="gap-2 text-sm"
          >
            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            Edit task
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => deleteTask(task.$id)}
            className="gap-2 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {isDeleting ? "Deleting…" : "Delete task"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit dialog — lives outside the dropdown */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <TaskForm
            taskToEdit={task}
            onSuccessCallback={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
