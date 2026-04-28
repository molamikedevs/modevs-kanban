import type { FormatDateOptions } from "@/types/index"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
