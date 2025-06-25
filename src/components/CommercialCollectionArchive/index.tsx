'use client'

import React, { useState, useEffect } from 'react'
import { Commercial, Film } from '@/payload-types'
import Image from 'next/image'

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
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-px mx-auto w-full">
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
              className="relative w-full aspect-[11/5] cursor-pointer overflow-hidden group"
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
                <div className="text-white font-semibold text-xl leading-tight">
                  <p className="uppercase">{commercial.title}</p>
                  <p className="text-base mt-1">{new Date(commercial.releaseDate).getFullYear()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedCommercial?.vimeoUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={selectedCommercial.vimeoUrl}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full rounded"
            />
            <button
              onClick={() => setSelectedCommercial(null)}
              className="absolute top-2 right-2 text-white bg-black/70 rounded-full p-2 hover:bg-white/20"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
