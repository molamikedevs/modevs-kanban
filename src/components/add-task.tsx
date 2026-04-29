import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import TaskForm from "./task-form"

function AddTask() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Task
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="kanban-scrollbar -mr-2 flex-1 overflow-y-auto pr-2">
          <TaskForm onSuccessCallback={() => setIsCreateOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddTask
