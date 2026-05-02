"use client"

import AddTask from "../tasks/add-task"
import ThemeSwitch from "../theme/theme-switch"

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 flex flex-col gap-4 border-b bg-background/70 px-6 py-4 backdrop-blur-md md:flex-row md:items-center md:justify-around">
      {/* Brand */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="h-6 w-6" />
          <h1 className="text-xl font-bold tracking-tight">Modevs Kanban</h1>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <AddTask />
        <ThemeSwitch />
      </div>
    </nav>
  )
}

export default Navbar
