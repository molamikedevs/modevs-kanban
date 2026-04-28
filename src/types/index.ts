export type Status = "TODO" | "IN_PROGRESS" | "DONE"
export type PriorityType = "LOW" | "MEDIUM" | "HIGH"

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  position: number
  createdAt: string
  priority: PriorityType
  tags?: string[]
  userAvatar?: string
}
