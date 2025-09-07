"use client"

import { Link } from '../../../components/Link'
import { useRouter } from '../../../hooks/useRouter'

type Props = {
  initialPage: number
  totalPages: number
}

export function SlideNavigation({ initialPage, totalPages }: Props) {
  const router = useRouter()
  const pageParam = router.getParam('page')
  const currentPage = pageParam ? Number(pageParam) : initialPage

  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  return (
    <div className="space-y-6">
      {/* Navigation Links */}
      <div className="flex justify-between items-center">
        <Link
          href={isFirstPage ? '#' : `/slide?page=${currentPage - 1}`}
          className={`px-6 py-3 rounded-lg transition-all ${
            isFirstPage
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
          }`}
        >
          ← Previous
        </Link>

        <Link
          href={isLastPage ? '#' : `/slide?page=${currentPage + 1}`}
          className={`px-6 py-3 rounded-lg transition-all ${
            isLastPage
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
          }`}
        >
          Next →
        </Link>
      </div>
    </div>
  )
}
