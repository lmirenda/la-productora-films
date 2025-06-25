'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface HeaderNavProps {
  data: HeaderType
  isMobile?: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, isMobile = false }) => {
  const navItems = data?.navItems || []

  if (isMobile) {
    return (
      <nav className="flex flex-col items-center space-y-6 relative z-50">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="font-inter uppercase tracking-wider text-lg text-white hover:text-white/80 transition-colors"
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
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="font-inter uppercase tracking-wider text-sm hover:text-white/80 transition-colors"
            />
          )
        })}
      </div>
    </nav>
  )
}
