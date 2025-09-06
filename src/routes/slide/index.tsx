import { Hono } from 'hono'
import { SlidePage } from './page'

const app = new Hono().basePath('/slide')

app.get('/', (c) => {
  const page = c.req.query('page')
  const searchParams = page ? { page } : {}
  return c.render(<SlidePage searchParams={searchParams} />, { title: 'Slide Presentation' })
})

export default app
