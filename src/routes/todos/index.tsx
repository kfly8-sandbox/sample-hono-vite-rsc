import { Hono } from 'hono'
import { TodosPage } from './page'

const app = new Hono().basePath('/todos')

let todos: { id: number; text: string; completed: boolean }[] = []
let nextId = 1

app.get('/', (c) => {
  return c.render(<TodosPage todos={todos} />, { title: 'TODOs' })
})

app.post('/', async (c) => {
  const formData = await c.req.parseBody()
  const text = formData.text as string
  
  if (text && text.trim()) {
    todos.push({
      id: nextId++,
      text: text.trim(),
      completed: false
    })
  }
  
  return c.redirect('/todos')
})

export default app