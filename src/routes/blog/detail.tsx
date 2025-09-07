import type { BlogPostDetail, BlogNavigation } from './data'

type Props = {
  post: BlogPostDetail
  navigation: BlogNavigation
}

export function BlogDetailPage({ post, navigation }: Props) {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <a href="/blog" className="text-blue-600 hover:text-blue-800">
            ← Back to Blog
          </a>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600 mb-6">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <time>{post.date}</time>
            <span className="mx-2">•</span>
            <span>{post.readTime} min read</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article content */}
        <article className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Published on {post.date} by {post.author}
            </div>
          </div>
        </article>

        {/* Navigation to other posts */}
        <nav className="mt-8 flex justify-between">
          {navigation.previousPost && (
            <a
              href={`/blog/${navigation.previousPost.id}`}
              className="flex-1 mr-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-sm text-gray-500 mb-1">Previous post</div>
              <div className="font-semibold text-gray-900">{navigation.previousPost.title}</div>
            </a>
          )}

          {navigation.nextPost && (
            <a
              href={`/blog/${navigation.nextPost.id}`}
              className="flex-1 ml-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-right"
            >
              <div className="text-sm text-gray-500 mb-1">Next post</div>
              <div className="font-semibold text-gray-900">{navigation.nextPost.title}</div>
            </a>
          )}
        </nav>
      </div>
    </div>
  )
}
