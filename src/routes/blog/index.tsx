import { Hono } from 'hono'
import { BlogListPage } from './list'
import { BlogDetailPage } from './detail'
import { getBlogPosts, getBlogPost, getBlogNavigation } from './data'

const app = new Hono().basePath('/blog')

// Blog list page
app.get('/', async (c) => {
  const currentPage = Number(c.req.query('page')) || 1
  const postsPerPage = 2

  const { posts, hasNextPage } = await getBlogPosts(currentPage, postsPerPage)

  return c.render(<BlogListPage posts={posts} currentPage={currentPage} hasNextPage={hasNextPage} />, { title: 'Blog' })
})

// Blog detail page
app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const post = await getBlogPost(id)

  if (!post) {
    return c.notFound()
  }

  const navigation = await getBlogNavigation(id)

  return c.render(<BlogDetailPage post={post} navigation={navigation} />, { title: post.title })
})

export default app
