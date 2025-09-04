import { Suspense } from 'react'
import { DelayedMessage } from './components'

export function SuspensePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Suspense Demo</h1>
        <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
          <DelayedMessage />
        </Suspense>
      </div>
    </div>
  )
}