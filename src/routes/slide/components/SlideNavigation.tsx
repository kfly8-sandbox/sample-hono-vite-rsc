"use client"

import { useEffect, useCallback } from 'react'

type Props = {
  initialPage: number
  totalPages: number
}

export function SlideNavigation({ initialPage, totalPages }: Props) {
  // Get current page from URL
  const getCurrentPageFromUrl = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialPage
    }

    const url = new URL(window.location.href)
    const pageParam = url.searchParams.get('page')
    const pageNumber = pageParam ? Number(pageParam) : 1
    return pageNumber
  }, [initialPage])

  const currentPage = getCurrentPageFromUrl()

  // Navigate to a specific page using browser navigation
  const navigateToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    // Use pushState to trigger listenNavigation in entry.browser.tsx
    window.history.pushState({}, '', `/slide?page=${page}`)

    console.log(`Navigating to page ${page} using listenNavigation`)
  }, [currentPage, totalPages])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        navigateToPage(currentPage - 1)
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        navigateToPage(currentPage + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, navigateToPage, totalPages])

  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={isFirstPage}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-all transform hover:scale-105 disabled:transform-none"
      >
        ← Previous
      </button>

      <div className="flex items-center space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => navigateToPage(i + 1)}
            className={`w-12 h-12 rounded-lg transition-all transform hover:scale-110 ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white shadow-lg scale-110'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={isLastPage}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-all transform hover:scale-105 disabled:transform-none"
      >
        Next →
      </button>
    </div>
  )
}
