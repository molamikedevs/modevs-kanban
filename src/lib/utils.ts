import type { FormatDateOptions } from "@/types/index"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Task } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  createdAt: string | number | Date | null | undefined,
  options: FormatDateOptions = { month: "short", day: "numeric" }
): string {
  if (!createdAt) return "Unknown"

  const date = new Date(createdAt)
  if (isNaN(date.getTime())) return "Unknown"

  return date.toLocaleDateString("en-US", options)
}

/**
 * Converts a comma-separated tag string from the form into a clean string array.
 * e.g. "Frontend, Bug , " => ["Frontend", "Bug"]
 */
export function formatTagsForSubmit(tags: string | undefined): string[] {
  if (!tags) return []
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

/**
 * Reads the current tasks in a given status column and returns
 * the next available position (highest existing + 1).
 */
export function getNextPosition(existingTasks: Task[], status: string): number {
  const columnTasks = existingTasks.filter((task) => task.status === status)
  if (columnTasks.length === 0) return 1.0
  return Math.max(...columnTasks.map((t) => t.position)) + 1.0
}
