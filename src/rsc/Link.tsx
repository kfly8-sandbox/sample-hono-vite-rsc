"use client"

import React from 'react'
import * as ReactClient from '@vitejs/plugin-rsc/browser'
import type { RscPayload } from './types'

type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

// Global state for managing RSC payload updates
let globalSetPayload: ((payload: RscPayload) => void) | null = null

export function setGlobalPayloadSetter(setter: (payload: RscPayload) => void) {
  globalSetPayload = setter
}

export function Link({ href, children, className, onClick }: LinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e)
      if (e.defaultPrevented) return
    }

    // Check if this is a disabled link (href="#") or external link
    if (href === '#') {
      return // Do nothing for disabled links
    }

    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return // Let browser handle these normally
    }

    // Check if this is an external link
    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) {
      return // Let browser handle external links normally
    }

    // Prevent default browser navigation
    e.preventDefault()

    try {
      console.log('Link navigation: fetching RSC for', href)

      // Fetch RSC payload directly
      const response = await fetch(href)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }

      // Create RSC payload from response
      const payload = await ReactClient.createFromFetch<RscPayload>(
        Promise.resolve(response)
      )

      // Update URL without triggering navigation
      window.history.pushState({}, '', href)

      // Update the global RSC state if setter is available
      if (globalSetPayload) {
        globalSetPayload(payload)
      } else {
        console.warn('Global payload setter not available, falling back to page reload')
        window.location.href = href
      }
    } catch (error) {
      console.error('Link navigation error:', error)
      // Fallback to normal navigation
      window.location.href = href
    }
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
