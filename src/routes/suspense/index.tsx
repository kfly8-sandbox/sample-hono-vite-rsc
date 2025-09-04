import { Hono } from 'hono'
import { SuspensePage } from './page'

const app = new Hono().basePath('/suspense')

app.get('/', (c) => {
  return c.render(<SuspensePage />, { title: 'Suspense Demo' })
})

export default app