import type { BlogPost } from '../data'
import { Link } from '../../../components/Link'

type Props = {
  posts: BlogPost[]
}

export function BlogList({ posts }: Props) {
  return (
    <div className="space-y-8 mb-12">
      {posts.map(post => (
        <article key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <Link href={`/blog/${post.id}`} className="block">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
          </Link>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime} min read</span>
          </div>

          <p className="text-gray-700 mb-4">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.id}`}
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
          >
            Read more →
          </Link>
        </article>
      ))}
    </div>
  )
}
