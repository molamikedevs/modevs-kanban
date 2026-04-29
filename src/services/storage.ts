import { ID, storage } from "@/lib/appwrite"

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID!

/**
 * Uploads an image file to the assignee-bucket and returns
 * the Appwrite file URL string — ready to store in the database.
 * Throws if the upload fails so the caller can handle the error.
 */
export async function uploadAssigneeAvatar(file: File): Promise<string> {
  const response = await storage.createFile({
    bucketId: BUCKET_ID,
    fileId: ID.unique(),
    file,
  })

  const url = storage.getFileView({
    bucketId: BUCKET_ID,
    fileId: response.$id,
  })

  return url.toString()
}
