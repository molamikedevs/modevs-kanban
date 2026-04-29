import TaskList from "@/components/Task-list"
import { columnConfig } from "@/constants"
import { useTasks } from "@/hooks/useTasks"
import type { Task } from "@/types"
import { Spinner } from "./spinner"

function Board() {
  const { tasks, isLoading } = useTasks()

  if (isLoading) return <Spinner />

  return (
    <div className="flex h-full w-full flex-col items-center pt-4 md:pt-6">
      <div className="w-full max-w-262.5 snap-x snap-mandatory overflow-x-auto px-4 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Inner track that centers the columns on wide screens */}
        <div className="mx-auto flex h-full w-max justify-start gap-6 md:w-full md:justify-center">
          {columnConfig.map((col) => {
            const tasksArray: Task[] = (
              (tasks ?? []) as unknown as Task[]
            ).filter((t) => t.status === col.status)

            return (
              <div
                key={col.status}
                className="flex h-[calc(100vh-14rem)] min-h-125 w-[320px] shrink-0 snap-center flex-col rounded-2xl border bg-card/50 p-4 shadow-sm backdrop-blur-sm"
              >
                {/* Column Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${col.bg.replace("/10", "")}`}
                    />
                    <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                      {col.title}
                    </h2>
                  </div>
                  <span
                    className={`flex h-6 min-w-6 items-center justify-center rounded-full ${col.bg} ${col.color} px-2 text-xs font-bold`}
                  >
                    {tasksArray?.length}
                  </span>
                </div>

                {/* Task Container */}
                {/* Task Container with Bottom Fade */}
                <div className="kanban-scrollbar [linear-gradient(to_bottom,white_90%,transparent_100%)] flex-1 overflow-y-auto pr-2 pb-2">
                  <TaskList tasks={tasksArray} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Board
