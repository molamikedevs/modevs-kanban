import type { Status, Task } from "@/types"

export const fakeTasks: Task[] = [
  {
    $id: "tsk-1",
    title: "Setup Appwrite Auth",
    description:
      "Integrate Appwrite email/password authentication and OAuth providers (Google, GitHub) for user login.",
    status: "TODO",
    position: 1,
    priority: "HIGH",
    $createdAt: "2026-04-26T08:30:00Z",
    tags: ["Backend", "Auth"],
    userAvatar: "https://i.pravatar.cc/150?u=12",
  },
  {
    $id: "tsk-2",
    title: "Design Landing Page",
    description:
      "Create Figma wireframes and high-fidelity mockups for the new marketing landing page.",
    status: "TODO",
    position: 2,
    priority: "MEDIUM",
    $createdAt: "2026-04-27T09:15:00Z",
    tags: ["Design", "UI/UX"],
    userAvatar: "https://i.pravatar.cc/150?u=45",
  },
  {
    $id: "tsk-3",
    title: "Write API Documentation",
    description:
      "Document all REST endpoints using Swagger/OpenAPI specifications.",
    status: "TODO",
    position: 3,
    priority: "LOW",
    $createdAt: "2026-04-25T14:20:00Z",
    tags: ["Docs", "API"],
    userAvatar: "https://i.pravatar.cc/150?u=22",
  },

  // --- IN PROGRESS ---
  {
    $id: "tsk-4",
    title: "Implement Drag & Drop",
    description:
      "Use @hello-pangea/dnd to allow users to smoothly move tasks between status columns.",
    status: "IN_PROGRESS",
    position: 1,
    priority: "HIGH",
    $createdAt: "2026-04-24T11:00:00Z",
    tags: ["Frontend", "Feature"],
    userAvatar: "https://i.pravatar.cc/150?u=31",
  },
  {
    $id: "tsk-5",
    title: "Fix Mobile Navigation Bug",
    description:
      "The mobile hamburger menu doesn't close automatically when clicking outside the overlay.",
    status: "IN_PROGRESS",
    position: 2,
    priority: "MEDIUM",
    $createdAt: "2026-04-27T10:45:00Z",
    tags: ["Bug", "Mobile"],
    userAvatar: "https://i.pravatar.cc/150?u=8",
  },

  // --- DONE ---
  {
    $id: "tsk-6",
    title: "Initialize Next.js Project",
    description:
      "Setup Next.js 15 with App Router, Tailwind CSS, and Shadcn UI components.",
    status: "DONE",
    position: 1,
    priority: "HIGH",
    $createdAt: "2026-04-20T09:00:00Z",
    tags: ["Chore", "Setup"],
    userAvatar: "https://i.pravatar.cc/150?u=15",
  },
  {
    $id: "tsk-7",
    title: "Create Task Schema",
    description:
      "Define Zod schemas for task creation, validation, and typing.",
    status: "DONE",
    position: 2,
    priority: "LOW",
    $createdAt: "2026-04-21T16:30:00Z",
    tags: ["Validation", "Types"],
    userAvatar: "https://i.pravatar.cc/150?u=50",
  },
]

// Added color mapping for visual distinction
export const columnConfig: {
  title: string
  status: Status
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
