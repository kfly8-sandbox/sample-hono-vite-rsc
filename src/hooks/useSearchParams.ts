"use client"

import { useMemo, useSyncExternalStore } from 'react'

/**
 * Internal function to subscribe to URL changes
 * Listens to both popstate events and programmatic navigation (pushState/replaceState)
 */
function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback)

  // Also listen for pushState/replaceState by overriding them
  const originalPushState = window.history.pushState
  const originalReplaceState = window.history.replaceState

  window.history.pushState = function(...args) {
    originalPushState.apply(window.history, args)
    callback()
  }

  window.history.replaceState = function(...args) {
    originalReplaceState.apply(window.history, args)
    callback()
  }

  return () => {
    window.removeEventListener('popstate', callback)
    window.history.pushState = originalPushState
    window.history.replaceState = originalReplaceState
  }
}

function getSnapshot() {
  if (typeof window === 'undefined') {
    return ''
  }
  return window.location.search
}

function getServerSnapshot() {
  return ''
}

/**
 * Type definitions for typed search params
 */
export type SearchParamsConfig = Record<string, string | number | boolean>

export type TypedSearchParams<T extends SearchParamsConfig> = {
  get<K extends keyof T>(key: K): string | null
  getNumber<K extends keyof T>(key: K): number | null
  getBoolean<K extends keyof T>(key: K): boolean | null
  has<K extends keyof T>(key: K): boolean
  getAll<K extends keyof T>(key: K): string[]
  raw: URLSearchParams
}

/**
 * Hook to access and react to URL search parameters with type safety
 *
 * @returns TypedSearchParams object that updates when URL changes
 *
 * @example
 * ```tsx
 * // Basic usage (no type parameter = all keys are strings)
 * function BasicComponent() {
 *   const searchParams = useSearchParams()
 *   const page = searchParams.get('page') // string | null
 * }
 *
 * // Type-safe usage
 * type MySearchParams = {
 *   page: number
 *   filter: string
 *   active: boolean
 * }
 *
 * function TypedComponent() {
 *   const searchParams = useSearchParams<MySearchParams>()
 *
 *   // Type-safe access - TypeScript knows these keys exist
 *   const page = searchParams.get('page') // string | null
 *   const pageNum = searchParams.getNumber('page') // number | null
 *   const isActive = searchParams.getBoolean('active') // boolean | null
 *
 *   // TypeScript will error on invalid keys
 *   // const invalid = searchParams.get('invalid') // Error!
 * }
 * ```
 *
 * @remarks
 * - Automatically syncs with browser navigation (back/forward buttons)
 * - Works with the Link component for client-side navigation
 * - Returns an empty URLSearchParams during SSR
 * - Re-renders component when URL search parameters change
 */
export function useSearchParams<T extends SearchParamsConfig = Record<string, string>>(): TypedSearchParams<T> {
  const search = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const searchParams = useMemo(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams()
    }
    return new URLSearchParams(search)
  }, [search])

  return useMemo(() => ({
    get<K extends keyof T>(key: K): string | null {
      return searchParams.get(String(key))
    },
    getNumber<K extends keyof T>(key: K): number | null {
      const value = searchParams.get(String(key))
      if (value === null) return null
      const num = Number(value)
      return isNaN(num) ? null : num
    },
    getBoolean<K extends keyof T>(key: K): boolean | null {
      const value = searchParams.get(String(key))
      if (value === null) return null
      return value === 'true' || value === '1'
    },
    has<K extends keyof T>(key: K): boolean {
      return searchParams.has(String(key))
    },
    getAll<K extends keyof T>(key: K): string[] {
      return searchParams.getAll(String(key))
    },
    raw: searchParams
  }), [searchParams])
}
