"use client"

import { useCallback, useEffect, useState } from 'react'

export function useCurrentPage(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window === 'undefined') {
      return initialPage
    }

    const url = new URL(window.location.href)
    const pageParam = url.searchParams.get('page')
    return pageParam ? Number(pageParam) : initialPage
  })

  const getCurrentPageFromUrl = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialPage
    }

    const url = new URL(window.location.href)
    const pageParam = url.searchParams.get('page')
    const pageNumber = pageParam ? Number(pageParam) : initialPage
    return pageNumber
  }, [initialPage])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getCurrentPageFromUrl())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [getCurrentPageFromUrl])

  return currentPage
}
