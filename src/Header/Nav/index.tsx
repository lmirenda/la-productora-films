'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface HeaderNavProps {
  data: HeaderType
  isMobile?: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, isMobile = false }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  const isActiveLink = (link: any) => {
    if (!link) return false

    // Handle reference links (pages/posts)
    if (link.type === 'reference' && link.reference?.value?.slug) {
      const linkPath =
        link.reference.relationTo !== 'pages'
          ? `/${link.reference.relationTo}/${link.reference.value.slug}`
          : `/${link.reference.value.slug}`

      // Handle home page special case
      if (link.reference.value.slug === 'home') {
        return pathname === '/'
      }

      return pathname === linkPath
    }

    // Handle custom URL links
    if (link.type === 'custom' && link.url) {
      return pathname === link.url
    }

    return false
  }

  if (isMobile) {
    return (
      <nav className="flex flex-col items-center space-y-6 relative z-50">
        {navItems.map(({ link }, i) => {
          const isActive = isActiveLink(link)
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={`font-inter uppercase tracking-wider text-[20px] text-white hover:text-white/80 transition-colors ${
                isActive ? 'underline underline-offset-4' : ''
              }`}
            />
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex gap-5 items-center justify-center flex-1">
        {navItems.map(({ link }, i) => {
          const isActive = isActiveLink(link)
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={`font-inter uppercase tracking-wider text-sm hover:text-white/80 transition-colors ${
                isActive ? 'underline underline-offset-4' : ''
              }`}
            />
          )
        })}
      </div>
    </nav>
  )
}
