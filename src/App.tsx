import Navbar from "./components/Navbar"
import Board from "./components/board"

export function App() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main>
        <Board />
      </main>
    </div>
  )
}

export default App
