"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import TaskForm from "./task-form"

function AddTask() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Task
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <TaskForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddTask
