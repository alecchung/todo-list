import { createClient } from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: '2023-04-17', // use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.VITE_APP_SANITY_TOKEN // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
// export async function getTodos() {
//   const todos = await client.fetch('*[_type == "todo"]')
//   console.log(todos)
//   return todos
// }

// export async function createTodo(todo) {
//   const result = client.create(todo)
//   return result
// }

// export async function updateTodo(_id, title) {
//   const result = client.patch(_id).set({ title })
//   return result
// }
