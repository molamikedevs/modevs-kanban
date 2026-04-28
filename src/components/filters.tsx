"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"
import { useState } from "react"

function Filters() {
  // Temporary state for UI demonstration.
  // You'll eventually lift this state or use URL search params for Appwrite filtering.
  const [filters, setFilters] = useState({
    high: true,
    medium: false,
    low: false,
    frontend: false,
    backend: false,
  })

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative shrink-0 rounded-full"
        >
          <Filter size={16} />
          {/* Optional active indicator if any filter is applied */}
          {Object.values(filters).some(Boolean) && (
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filters.high}
          onCheckedChange={() => toggleFilter("high")}
        >
          High Priority
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filters.medium}
          onCheckedChange={() => toggleFilter("medium")}
        >
          Medium Priority
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filters.low}
          onCheckedChange={() => toggleFilter("low")}
        >
          Low Priority
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter by Tag</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filters.frontend}
          onCheckedChange={() => toggleFilter("frontend")}
        >
          Frontend
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filters.backend}
          onCheckedChange={() => toggleFilter("backend")}
        >
          Backend
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filters
