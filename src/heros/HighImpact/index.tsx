'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'

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
          <h1 className="text-4xl md:text-4xl font-regular max-w-4xl mx-auto pt-12">{title}</h1>

          {richText && (
            <div className="max-w-[450px] mx-auto text-lg md:text-xl font-semibold text-center">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
        </div>

        <div className="pb-2 ">
          {Array.isArray(sponsors) && sponsors.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 pb-4">
              {sponsors.map((sponsor, i) => (
                <div key={i}>
                  {typeof sponsor === 'object' && 'url' in sponsor && sponsor.url ? (
                    <Image
                      src={sponsor.url}
                      className="block h-6 md:h-8 w-auto object-contain"
                      alt={sponsor.alt || ''}
                      width={100}
                      height={100}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
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
