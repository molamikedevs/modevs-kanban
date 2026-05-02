import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Navbar from "./components/common/Navbar"
import Board from "./components/tasks/board"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

export function App() {
  return (
    <div className="flex h-screen flex-col">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Navbar />
        <main>
          <Board />
        </main>
        <Toaster />
      </QueryClientProvider>
    </div>
  )
}

export default App
