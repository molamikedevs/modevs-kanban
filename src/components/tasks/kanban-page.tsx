import Board from "./board"
import MobileBoard from "./mobile-board"

export default function KanbanPage() {
  return (
    <>
      <div className="hidden md:block">
        <Board />
      </div>
      <div className="md:hidden">
        <MobileBoard />
      </div>
    </>
  )
}
