import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

function SearchInput() {
  return (
    <div className="relative flex-1">
      <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tasks..."
        className="w-full rounded-full bg-muted/50 pl-9 focus-visible:bg-background"
      />
    </div>
  )
}

export default SearchInput
