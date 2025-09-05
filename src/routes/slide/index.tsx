import { Hono } from 'hono'
import { SlidePage } from './page'

const app = new Hono().basePath('/slide')

app.get('/', (c) => {
  const page = c.req.query('page')
  return c.render(<SlidePage searchParams={{ page }} />, { title: 'Slide Presentation' })
})

export default app
