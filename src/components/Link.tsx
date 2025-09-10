"use client"

import React from 'react'

type LinkProps = {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  prefetch?: boolean // TODO: implement prefetching
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'onMouseEnter'>

export function Link({
  href,
  children,
  onClick,
  onMouseEnter,
  prefetch = true,
  ...anchorProps
}: LinkProps) {

  const shouldNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget

    return (
      link.href &&
      (!link.target || link.target === '_self') &&
      link.origin === location.origin &&
      !link.hasAttribute('download') &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.shiftKey &&
      !e.defaultPrevented
    )
  }

  const handleClick = onClick ? onClick : (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldNavigate(e)) {
      e.preventDefault()
      window.history.pushState(null, '', href)
    }
  }

  const handleMouseEnter = onMouseEnter ? onMouseEnter : (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefetch && shouldNavigate(e)) {
      console.log('prefetching... (not implemented yet)')
      // TODO: implement prefetching
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...anchorProps}
    >
      {children}
    </a>
  )
}
