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
      <div className="container relative z-[2] flex flex-col items-center text-center px-4 pt-12 min-h-[80vh] font-avenir">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl md:text-[36px] lg:text-[46px] font-[500] text-center">
            {title}
          </h1>
        </div>

        {/* <div className="pb-2 ">
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
        </div> */}
        <div className="pb-2 hidden md:block mx-auto">
          <Image
            src={
              typeof sponsors?.[0] === 'object' &&
              sponsors?.[0] !== null &&
              'url' in sponsors[0] &&
              sponsors[0].url
                ? sponsors[0].url
                : '/images/logos.png'
            }
            alt="High Impact"
            width={1200}
            height={200}
          />
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
