export type BlogPost = {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: number
  tags: string[]
}

export type BlogPostDetail = BlogPost & {
  content: string
}

export type BlogNavigation = {
  previousPost?: {
    id: string
    title: string
  } | null
  nextPost?: {
    id: string
    title: string
  } | null
}

// Mock data fetching function for blog list
export async function getBlogPosts(page: number, limit: number) {

  // Generate mock blog posts
  const totalPosts = 45 // Total number of blog posts (this won't be exposed)
  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, totalPosts)

  const posts: BlogPost[] = []
  for (let i = startIndex; i < endIndex; i++) {
    posts.push({
      id: `post-${i + 1}`,
      title: `Blog Post ${i + 1}: ${getPostTitle(i)}`,
      excerpt: `This is the excerpt for blog post ${i + 1}. It contains a brief summary of the content that will entice readers to click and read more.`,
      author: getAuthor(i),
      date: new Date(Date.now() - (totalPosts - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      readTime: Math.floor(Math.random() * 10) + 3,
      tags: getTags(i)
    })
  }

  // Check if there are more posts by trying to get one more
  const hasNextPage = endIndex < totalPosts

  return { posts, hasNextPage }
}

// Mock data fetching function for blog detail
export async function getBlogPost(id: string): Promise<BlogPostDetail | null> {

  const postIndex = parseInt(id.replace('post-', '')) - 1
  if (postIndex < 0 || postIndex >= 45) {
    return null // Post not found
  }

  const numTags = (postIndex % 3) + 2
  const tags = []
  for (let i = 0; i < numTags; i++) {
    tags.push(ALL_TAGS[(postIndex + i) % ALL_TAGS.length])
  }

  return {
    id,
    title: `Blog Post ${postIndex + 1}: ${getPostTitle(postIndex)}`,
    excerpt: `This is the excerpt for blog post ${postIndex + 1}. It contains a brief summary of the content that will entice readers to click and read more.`,
    author: getAuthor(postIndex),
    date: new Date(Date.now() - (45 - postIndex) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    readTime: Math.floor(Math.random() * 10) + 3,
    tags,
    content: generateContent(postIndex, getPostTitle(postIndex))
  }
}

// Mock data fetching function for blog navigation
export async function getBlogNavigation(id: string): Promise<BlogNavigation> {
  const postIndex = parseInt(id.replace('post-', '')) - 1

  return {
    previousPost: postIndex > 0 ? {
      id: `post-${postIndex}`,
      title: `Blog Post ${postIndex}: ${getPostTitle(postIndex - 1)}`
    } : null,
    nextPost: postIndex < 44 ? {
      id: `post-${postIndex + 2}`,
      title: `Blog Post ${postIndex + 2}: ${getPostTitle(postIndex + 1)}`
    } : null
  }
}

// Helper functions
function getPostTitle(index: number): string {
  const titles = [
    'Getting Started with React Server Components',
    'Building Type-Safe Applications with TypeScript',
    'Performance Optimization Techniques',
    'Understanding the Event Loop in JavaScript',
    'Modern CSS Layout Techniques',
    'State Management in React Applications',
    'Testing Best Practices',
    'Deploying Applications with Docker',
    'GraphQL vs REST: Making the Right Choice',
    'Web Security Fundamentals'
  ]
  return titles[index % titles.length]
}

function getAuthor(index: number): string {
  const authors = ['Alice Chen', 'Bob Smith', 'Carol Davis', 'David Lee', 'Emma Wilson']
  return authors[index % authors.length]
}

const ALL_TAGS = ['React', 'TypeScript', 'JavaScript', 'CSS', 'Performance', 'Testing', 'Security', 'DevOps']

function getTags(index: number): string[] {
  const numTags = (index % 3) + 2
  const tags = []
  for (let i = 0; i < numTags; i++) {
    tags.push(ALL_TAGS[(index + i) % ALL_TAGS.length])
  }
  return tags
}

function generateContent(index: number, title: string): string {
  const paragraphs = [
    `Welcome to this comprehensive guide on ${title.toLowerCase()}. In this post, we'll explore the fundamental concepts and practical applications that will help you master this important topic.`,

    `Understanding the core principles is essential for any developer looking to improve their skills. We'll start by examining the basic concepts and then gradually move to more advanced techniques that you can apply in your daily work.`,

    `One of the key advantages of this approach is its flexibility and scalability. Many developers have found success by implementing these strategies in their projects, leading to improved performance and maintainability.`,

    `Let's dive into some practical examples that demonstrate these concepts in action. These real-world scenarios will help you understand how to apply what you've learned in your own projects.`,

    `It's important to consider best practices when implementing these solutions. Following established patterns and conventions will help ensure your code is maintainable and follows industry standards.`,

    `As we wrap up this discussion, remember that continuous learning and practice are key to mastering any technology. Don't hesitate to experiment with these concepts and adapt them to your specific use cases.`
  ]

  return paragraphs.join('\n\n')
}
