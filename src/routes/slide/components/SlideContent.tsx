export async function SlideContent({ page }: { page: number }) {
  const slide = await getSlideData(page)

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {slide.title}
        </h2>
        <span className="text-sm text-gray-500">Slide {slide.id} of 5</span>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        {slide.content}
      </p>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Key Points:</h3>
        <ul className="space-y-2">
          {slide.bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {slide.code && (
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300">
            <code>{slide.code}</code>
          </pre>
        </div>
      )}

      <div className="text-xs text-gray-400 pt-4">
        Server rendered at: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}

async function getSlideData(page: number) {
  // Simulate database fetch with delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const slides = [
    {
      id: 1,
      title: 'Introduction to RSC',
      content: 'React Server Components enable server-side rendering with zero client-side JavaScript for components.',
      bulletPoints: [
        'Server-only code execution',
        'Direct database access',
        'Reduced bundle size',
        'Improved performance'
      ],
      code: `// Server Component
async function ServerComponent() {
  const data = await db.query('SELECT * FROM users')
  return <div>{data.map(user => <User key={user.id} {...user} />)}</div>
}`
    },
    {
      id: 2,
      title: 'Benefits of RSC',
      content: 'RSC provides several advantages over traditional client-side rendering.',
      bulletPoints: [
        'Automatic code splitting',
        'Streaming HTML responses',
        'SEO-friendly by default',
        'Better initial load performance'
      ],
      code: `// Direct database access in components
export default async function ProductList() {
  const products = await prisma.product.findMany({
    where: { featured: true }
  })
  return <Grid products={products} />
}`
    },
    {
      id: 3,
      title: 'RSC vs Client Components',
      content: 'Understanding when to use Server Components versus Client Components.',
      bulletPoints: [
        'Server Components: Data fetching, heavy computations',
        'Client Components: Interactivity, browser APIs',
        'Can be mixed in the same app',
        'Client Components can import Server Components'
      ],
      code: `'use client' // Client Component

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}`
    },
    {
      id: 4,
      title: 'RSC Payload',
      content: 'RSC generates a special payload format that can be streamed to the client.',
      bulletPoints: [
        'Serialized component tree',
        'Includes rendered HTML',
        'Supports streaming and Suspense',
        'Can be fetched directly from client'
      ],
      code: `// Fetching RSC payload directly
const response = await fetch('/slide/content?page=2&__rsc=1')
const payload = await response.text()
// Process RSC payload...`
    },
    {
      id: 5,
      title: 'Summary',
      content: 'RSC revolutionizes React development by bringing server-side benefits to component architecture.',
      bulletPoints: [
        'Better performance out of the box',
        'Simpler mental model for data fetching',
        'Reduced complexity in state management',
        'Future of React development'
      ],
      code: `// The future is server-first
export default async function App() {
  // This runs on the server
  const user = await getUser()
  const posts = await getPosts(user.id)

  return <Dashboard user={user} posts={posts} />
}`
    }
  ]

  return slides[page - 1] || slides[0]
}
