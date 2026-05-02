import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function SpinnerCustom({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function Spinner() {
  return (
    <div className="flex min-h-[50dvh] w-full flex-col items-center justify-center gap-3 text-muted-foreground">
      <SpinnerCustom className="size-8 text-primary" />
      <p className="animate-pulse text-sm font-medium">Loading tasks...</p>
    </div>
  )
}
