import * as z from "zod"

// 1. Expanded Zod Schema
export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  tags: z.string().optional(),
})
