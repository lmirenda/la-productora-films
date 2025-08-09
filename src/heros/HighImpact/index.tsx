'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ title, media, richText, sponsors }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative min-h-[80vh] flex items-center justify-center text-white"
      data-theme="dark"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <div className="container relative z-[2] flex flex-col items-center text-center px-4 pt-4 min-h-[80vh] font-avenir">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-4xl font-regular mb-8 max-w-4xl mx-auto">{title}</h1>

          {richText && (
            <div className="max-w-[450px] mx-auto text-lg md:text-xl font-semibold text-center">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
        </div>

        {Array.isArray(sponsors) && sponsors.length > 0 && (
          <div className="pb-2">
            <ul className="flex justify-center gap-2 md:gap-4 flex-wrap">
              {sponsors.map((sponsor, i) => {
                return (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                    <Media resource={sponsor} />
                  </div>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Background image */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0">
          <Media fill imgClassName="object-cover" priority resource={media} />
        </div>
      )}
    </div>
  )
}
