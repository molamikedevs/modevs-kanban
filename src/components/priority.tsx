import { Badge } from "@/components/ui/badge"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { priorityColors } from "@/constants"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import type { Task } from "@/types"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import TaskForm from "./task-form"

interface PriorityProps {
  task: Task
}

function Priority({ task }: PriorityProps) {
  const { mutate, isPending } = useDeleteTask()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        {task.priority && (
          <Badge
            variant="secondary"
            className={`border-none text-[10px] font-bold uppercase ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </Badge>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer text-muted-foreground opacity-0 transition-opacity outline-none group-hover:opacity-100 hover:text-foreground focus:opacity-100">
              <MoreHorizontal size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onSelect={() => setIsEditDialogOpen(true)} // Open the modal
            >
              <Pencil size={14} className="text-muted-foreground" />
              <span>Edit Task</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => mutate(task.$id)}
              className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <Trash2 size={14} />
              <span>{isPending ? "Deleting..." : "Delete Task"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* The Edit Modal lives outside the Dropdown Menu */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          <TaskForm
            taskToEdit={task}
            onSuccessCallback={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Priority
