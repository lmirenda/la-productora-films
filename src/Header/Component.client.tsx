'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      // bg-black/50 for off black tint
      className="absolute top-0 left-0 right-0 z-40  backdrop-blur-sm pointer-events-none"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex-shrink-0">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="flex-1 flex justify-center">
          <HeaderNav data={data} />
        </div>
        <div className="flex-shrink-0 w-[100px]">{/* Empty div to balance the logo */}</div>
      </div>
    </header>
  )
}
