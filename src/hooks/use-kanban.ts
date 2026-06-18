import { columnConfig } from "@/constants"
import { useTasks } from "@/hooks/useTasks"
import type { Task, TaskStatus } from "@/types"
import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useState } from "react"

export function useKanban() {
  const { tasks: serverTasks, isLoading, moveTask } = useTasks()

  // Local copy for optimistic reordering during drag
  const [localTasks, setLocalTasks] = useState<Task[] | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // Use local tasks during drag, fall back to server tasks
  const tasks = localTasks ?? (serverTasks as Task[] | undefined) ?? []

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.$id === event.active.id)
    if (task) {
      setActiveTask(task)
      // Snapshot current state at drag start
      setLocalTasks([...tasks])
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const activeTask = tasks.find((t) => t.$id === activeId)
    if (!activeTask) return

    // Is "over" a column header droppable?
    const overIsColumn = columnConfig.some((c) => c.status === overId)

    const targetStatus: TaskStatus = overIsColumn
      ? (overId as TaskStatus)
      : (tasks.find((t) => t.$id === overId)?.status ?? activeTask.status)

    if (activeTask.status === targetStatus && !overIsColumn) {
      // Same column reorder
      const columnTasks = tasks.filter((t) => t.status === targetStatus)
      const oldIndex = columnTasks.findIndex((t) => t.$id === activeId)
      const newIndex = columnTasks.findIndex((t) => t.$id === overId)

      if (oldIndex !== newIndex) {
        const reordered = arrayMove(columnTasks, oldIndex, newIndex)
        setLocalTasks(
          tasks.map((t) => {
            const updated = reordered.find((r) => r.$id === t.$id)
            return updated ? { ...updated } : t
          })
        )
      }
      return
    }

    // Cross-column move — update status in local state immediately
    setLocalTasks((prev) =>
      (prev ?? tasks).map((t) =>
        t.$id === activeId ? { ...t, status: targetStatus } : t
      )
    )
  }

  /**
   * Move a task to a new column from outside the drag flow
   * (mobile menu click). Places it at the end of the target column.
   */
  function updateTaskStatus(taskId: string, nextStatus: TaskStatus) {
    const task = tasks.find((t) => t.$id === taskId)
    if (!task || task.status === nextStatus) return

    const columnTasks = tasks.filter((t) => t.status === nextStatus)
    const newPosition = columnTasks.length
      ? Math.max(...columnTasks.map((t) => t.position)) + 1
      : 1

    moveTask({ id: taskId, status: nextStatus, position: newPosition })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveTask(null)

    if (!over) {
      setLocalTasks(null) // reset, nothing happened
      return
    }

    const taskId = active.id as string
    // At this point localTasks already reflects the final position from onDragOver
    const finalTask = tasks.find((t) => t.$id === taskId)
    if (!finalTask) {
      setLocalTasks(null)
      return
    }

    const columnTasks = tasks.filter((t) => t.status === finalTask.status)
    const newPosition = columnTasks.length
      ? Math.max(...columnTasks.map((t) => t.position)) + 1
      : 1

    // Commit to server
    moveTask({ id: taskId, status: finalTask.status, position: newPosition })

    // Keep localTasks alive until React Query invalidation settles
    // useTasks onSettled will invalidateQueries → triggers re-render → we clear
    setLocalTasks(null)
  }

  function handleDragCancel() {
    setLocalTasks(null)
    setActiveTask(null)
  }

  return {
    tasks,
    isLoading,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
    updateTaskStatus,
  }
}
