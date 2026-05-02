export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"
export type PriorityType = "LOW" | "MEDIUM" | "HIGH"

export interface Task {
  $id: string
  title: string
  description: string
  status: TaskStatus
  position: number
  $createdAt: string
  priority?: PriorityType
  tags?: string[]
  userAvatar?: string
}

export interface FormatDateOptions {
  month: "short" | "long" | "narrow" | "numeric" | "2-digit"
  day: "numeric" | "2-digit"
}
