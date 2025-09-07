type Props = {
  currentPage: number
  hasNextPage: boolean
}

export function BlogPagination({ currentPage, hasNextPage }: Props) {
  const isFirstPage = currentPage <= 1

  return (
    <nav className="flex justify-between items-center mt-8">
      {/* Previous button */}
      {isFirstPage ? (
        <div></div> // Empty space to maintain layout
      ) : (
        <a
          href={`/blog?page=${currentPage - 1}`}
          className="flex items-center px-6 py-3 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </a>
      )}

      {/* Current page info */}
      <div className="text-sm text-gray-600">
        Page {currentPage}
      </div>

      {/* Next button */}
      {hasNextPage ? (
        <a
          href={`/blog?page=${currentPage + 1}`}
          className="flex items-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
        >
          Next
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      ) : (
        <div></div> // Empty space to maintain layout
      )}
    </nav>
  )
}
