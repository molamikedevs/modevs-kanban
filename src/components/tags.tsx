import { Badge } from "@/components/ui/badge"

type TagsProps = {
  tags: string[]
}

function Tags({ tags }: TagsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((tag: string) => (
        <Badge
          key={tag}
          variant="outline"
          className="border-border/50 bg-muted/50 px-2 py-0 text-[10px] font-medium text-muted-foreground"
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export default Tags
