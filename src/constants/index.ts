import type { TaskStatus } from "@/types"

// Added color mapping for visual distinction
export const columnConfig: {
  title: string
  status: TaskStatus
  color: string
  bg: string
}[] = [
  {
    title: "To Do",
    status: "TODO",
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
  {
    title: "In Progress",
    status: "IN_PROGRESS",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Done",
    status: "DONE",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
]

export const priorityColors = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  MEDIUM:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}
