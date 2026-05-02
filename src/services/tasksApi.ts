import { tablesDB } from "@/lib/appwrite"
import type { Task } from "@/types"
import { ID, Query } from "appwrite"

// ---------------------------------------------------------------------------
// Environment config
// Pull the database and table IDs from .env so they're never hard-coded.
// The "!" tells TypeScript to trust these exist at runtime — make sure your
// .env file always defines both VITE_APPWRITE_DATABASE_ID and
// VITE_APPWRITE_TABLE_ID or you'll get a silent undefined at runtime.
// ---------------------------------------------------------------------------
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID!
const tableId = import.meta.env.VITE_APPWRITE_TABLE_ID!

// ---------------------------------------------------------------------------
// CREATE
// Accepts everything a Task has EXCEPT the server-generated fields ($id and
// $createdAt) — Appwrite assigns those automatically on insert.
// ID.unique() generates a collision-safe UUID so we never clash with an
// existing row.
// ---------------------------------------------------------------------------
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
    throw error // re-throw so React Query can catch it and mark the mutation as failed
  }
}

// ---------------------------------------------------------------------------
// UPDATE (full task edit — title, description, tags, etc.)
// We destructure out $id and $createdAt before sending to Appwrite because:
//   • $id is the row identifier, not an editable field — it goes in rowId
//   • $createdAt is immutable on the server side; sending it causes an error
// Everything else (title, description, status, priority, position …) lands
// in updatePayload and gets patched on the existing row.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// UPDATE STATUS + POSITION (drag-and-drop only)
// A lightweight alternative to updateTask — only touches the two fields that
// change when a card is dragged: which column it's in (status) and its
// vertical rank within that column (position).
// Keeping this separate avoids sending the full task payload on every drop,
// which matters when users drag cards rapidly.
// ---------------------------------------------------------------------------
export async function updateTaskStatus(
  id: string,
  status: string,
  position: number
) {
  try {
    await tablesDB.updateRow({
      databaseId,
      tableId,
      rowId: id,
      data: { status, position },
    })
  } catch (error) {
    console.error("Error updating task", error)
    throw error
  }
}

// ---------------------------------------------------------------------------
// READ (fetch all tasks for the board)
// Query.limit(10) — cap results to avoid pulling thousands of rows; raise
//   this number if your board needs more cards visible at once.
// Query.orderDesc("position") — higher position numbers appear first, which
//   means newly added cards (assigned the highest position) float to the top
//   of their column on load.
// Returns response.rows directly so callers get a plain Task array rather
// than the full Appwrite response envelope.
// ---------------------------------------------------------------------------
export async function getTasks() {
  try {
    const response = await tablesDB.listRows({
      databaseId,
      tableId,
      queries: [Query.limit(10), Query.orderDesc("position")],
    })

    return response.rows
  } catch (error) {
    console.error("Error fetching tasks", error)
    throw error
  }
}

// ---------------------------------------------------------------------------
// DELETE
// Permanently removes a row by its $id. The calling mutation (in useTasks)
// should optimistically remove the card from local state before this resolves
// so the UI feels instant, then invalidate the "tasks" query on settle to
// keep the cache consistent.
// ---------------------------------------------------------------------------
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
