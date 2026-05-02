import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type AvatarProps = {
  userAvatar: string
  id: string
}

function UserAvatar({ userAvatar, id }: AvatarProps) {
  return (
    <Avatar className="h-6 w-6 border border-background">
      <AvatarImage
        src={userAvatar || `https://i.pravatar.cc/150?u=${id}`}
        alt="Assignee"
      />
      <AvatarFallback className="text-[10px]">U</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
