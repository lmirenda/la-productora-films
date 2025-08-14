'use client'

import React, { useState, useEffect } from 'react'
import { Commercial, Film } from '@/payload-types'
import Image from 'next/image'
import RichText from '@/components/RichText'

export type Props = {
  commercials: Commercial[]
}

export const CommercialCollectionArchive: React.FC<Props> = ({ commercials }) => {
  const [selectedCommercial, setSelectedCommercial] = useState<Film | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCommercial(null)
      }
    }

    if (selectedCommercial) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCommercial])

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-px mx-auto w-full">
        {commercials?.map((commercial, index) => {
          const thumbnail = typeof commercial.thumbnail === 'object' ? commercial.thumbnail : null
          let src: string
          if (thumbnail && thumbnail.url) {
            src = thumbnail.url // TS now knows thumbnail.url is a string
          } else {
            src = '/path/to/placeholder.png'
          }
          return (
            <div
              key={index}
              className="relative w-full aspect-[16/9] sm:aspect-[16/5] cursor-pointer overflow-hidden group"
              onClick={() => setSelectedCommercial(commercial)}
            >
              {thumbnail && (
                <Image
                  src={src}
                  alt={commercial.title || 'commercial thumbnail'}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center px-4">
                <div className="text-white flex flex-col items-center w-full">
                  {commercial.director && (
                    <p className="text-base sm:text-lg md:text-[18px] opacity-90 tracking-wide font-avenir font-[300]">
                      {commercial.director}
                    </p>
                  )}
                  <p className="uppercase text-2xl sm:text-4xl md:text-[32px] leading-tight my-2 sm:my-4 font-avenir font-[500]">
                    {commercial.title}
                  </p>
                  <p className="text-lg sm:text-2xl md:text-[18px] opacity-90 font-avenir font-[100]">
                    {commercial.client}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedCommercial?.vimeoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setSelectedCommercial(null)}
          />

          {/* Modal window */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
            {/* Extract the ID from any Vimeo URL */}
            {(() => {
              let videoId = String(selectedCommercial.vimeoUrl)
              try {
                // new URL(...) handles query strings, trailing slashes, etc.
                const url = new URL(selectedCommercial.vimeoUrl)
                videoId = url.pathname.split('/').filter(Boolean).pop() || videoId
              } catch {
                // fallback if URL parsing fails
                const parts = selectedCommercial.vimeoUrl.split('/')
                videoId = parts[parts.length - 1] || ''
              }
              return (
                <iframe
                  src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=0&title=0&byline=0&portrait=0&controls=1`}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
