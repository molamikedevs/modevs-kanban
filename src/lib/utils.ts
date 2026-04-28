import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export  const formattedDate = (createdAt) => {
//    const date = new Date(createdAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             : "Unknown"
// }
