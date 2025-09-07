"use client"

import { useCallback, useEffect, useState } from 'react'

export function useRouter() {
  const [, forceUpdate] = useState({})
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleRouteChange = () => {
      forceUpdate({})
    }
    
    // popstateイベントのリスナーを追加
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  // 現在のルート情報を取得（クライアントサイドのみ）
  const isClient = typeof window !== 'undefined'
  
  const pathname = isClient ? window.location.pathname : '/'
  const search = isClient ? window.location.search : ''
  const searchParams = isClient ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const href = isClient ? window.location.href : ''
  
  const push = useCallback((url: string) => {
    if (isClient) {
      window.history.pushState(null, '', url)
      forceUpdate({})
    }
  }, [isClient])
  
  const replace = useCallback((url: string) => {
    if (isClient) {
      window.history.replaceState(null, '', url)
      forceUpdate({})
    }
  }, [isClient])
  
  const back = useCallback(() => {
    if (isClient) {
      window.history.back()
    }
  }, [isClient])
  
  const forward = useCallback(() => {
    if (isClient) {
      window.history.forward()
    }
  }, [isClient])
  
  const refresh = useCallback(() => {
    if (isClient) {
      window.location.reload()
    }
  }, [isClient])
  
  const getParam = useCallback((key: string): string | null => {
    return searchParams.get(key)
  }, [searchParams])
  
  const getParams = useCallback((key: string): string[] => {
    return searchParams.getAll(key)
  }, [searchParams])
  
  const setSearchParams = useCallback((params: Record<string, string | number | undefined>) => {
    if (!isClient) return
    
    const newSearchParams = new URLSearchParams(search)
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, String(value))
      }
    })
    
    const newSearch = newSearchParams.toString()
    const newUrl = `${pathname}${newSearch ? `?${newSearch}` : ''}`
    
    // URLが変わる場合のみ更新
    if (newUrl !== pathname + search) {
      replace(newUrl)
    }
  }, [isClient, pathname, search, replace])
  
  return {
    pathname,
    search,
    searchParams,
    href,
    push,
    replace,
    back,
    forward,
    refresh,
    getParam,
    getParams,
    setSearchParams
  }
}