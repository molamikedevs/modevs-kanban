import { tablesDB } from "@/lib/appwrite"
import type { Task } from "@/types"
import { ID, Query } from "appwrite"

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID!
const tableId = import.meta.env.VITE_APPWRITE_TABLE_ID!

export async function createTask(data: Omit<Task, "$id" | "$createdAt">) {
  try {
    const response = await tablesDB.createRow({
      databaseId,
      tableId,
      rowId: ID.unique(),
      data,
    })

    return response
  } catch (error) {
    console.error("Error creating task", error)
    throw error
  }
}

export async function updateTask(task: Task) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $id, $createdAt, ...updatePayload } = task
    const response = await tablesDB.updateRow({
      databaseId,
      tableId,
      rowId: $id,
      data: updatePayload,
    })

    return response
  } catch (error) {
    console.error("Error editing task", error)
    throw error
  }
}

export async function getTasks() {
  try {
    const response = await tablesDB.listRows({
      databaseId,
      tableId,
      queries: [Query.limit(20)],
    })

    return response.rows
  } catch (error) {
    console.error("Error fetching tasks", error)
    throw error
  }
}

export async function deleteTask(rowId: string) {
  try {
    const response = await tablesDB.deleteRow({
      databaseId,
      tableId,
      rowId,
    })

    return response
  } catch (error) {
    console.error("Error deleting task", error)
    throw error
  }
}
