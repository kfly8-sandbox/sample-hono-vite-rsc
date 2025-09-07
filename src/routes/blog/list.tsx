import { BlogList } from './components/BlogList'
import { BlogPagination } from './components/BlogPagination'
import type { BlogPost } from './data'

type Props = {
  posts: BlogPost[]
  currentPage: number
  hasNextPage: boolean
}

export function BlogListPage({ posts, currentPage, hasNextPage }: Props) {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Blog</h1>

        <BlogList posts={posts} />

        <BlogPagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  )
}
