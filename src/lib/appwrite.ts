import { Account, Client, ID, Storage, TablesDB } from "appwrite"

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID!
const baseUrl = import.meta.env.VITE_APPWRITE_ENDPOINT!

export const client = new Client()
client.setEndpoint(baseUrl).setProject(projectId)

export const account = new Account(client)
export const storage = new Storage(client)
export const tablesDB = new TablesDB(client)
export { ID }
