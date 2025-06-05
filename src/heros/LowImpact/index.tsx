import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
  children?: React.ReactNode
  richText?: never
}
  | (Omit<Page['hero'], 'richText'> & {
  children?: never
  richText?: Page['hero']['richText']
})

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="w-full bg-black text-white pt-20">
      <div className="container">
        <div className="max-w-screen-xl">
          {children || (richText && (
            <RichText
              data={richText}
              enableGutter={false}
              className="text-4xl font-bold uppercase"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
