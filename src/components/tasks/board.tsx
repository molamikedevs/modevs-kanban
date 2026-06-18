"use client"

import { Spinner } from "@/components/common/spinner"
import { columnConfig } from "@/constants"
import { useKanban } from "@/hooks/use-kanban"
import type { Task } from "@/types"
import type { CollisionDetection } from "@dnd-kit/core"
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import Column from "./column"
import OverlayCard from "./overlay-card"

function Board() {
  const {
    tasks,
    isLoading,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useKanban()

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } })
  )

  const collisionDetection: CollisionDetection = (args) => {
    const pointerHits = pointerWithin(args)
    return pointerHits.length ? pointerHits : rectIntersection(args)
  }

  if (isLoading) return <Spinner />

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex h-full w-full flex-col items-center pt-6">
        <div className="mx-auto flex w-full max-w-262.5 justify-center gap-6 px-4 pb-6">
          {columnConfig.map((col) => {
            const columnTasks = tasks.filter(
              (t: Task) => t.status === col.status
            )
            return (
              <Column
                key={col.status}
                col={col}
                tasks={columnTasks}
                activeId={activeTask?.$id ?? null}
              />
            )
          })}
        </div>
      </div>

      <DragOverlay
        dropAnimation={{
          duration: 200,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {activeTask ? (
          <div className="scale-105 rotate-1 cursor-grabbing opacity-95 shadow-2xl">
            <OverlayCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Board
