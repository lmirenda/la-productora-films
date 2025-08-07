'use client'

import React, { useState, useEffect } from 'react'
import { Film } from '@/payload-types'
import Image from 'next/image'

export type Props = {
  films: Film[]
}

export const FilmCollectionArchive: React.FC<Props> = ({ films }) => {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null)

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFilm(null)
      }
    }

    if (selectedFilm) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedFilm])

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-px mx-auto w-full">
        {films?.map((film, index) => {
          const thumbnail = typeof film.thumbnail === 'object' ? film.thumbnail : null
          let src: string
          if (thumbnail && thumbnail.url) {
            src = thumbnail.url // TS now knows thumbnail.url is a string
          } else {
            src = '/path/to/placeholder.png'
          }
          return (
            <div
              key={index}
              className="relative w-full aspect-[16/9] sm:aspect-[16/6] cursor-pointer overflow-hidden group"
              onClick={() => setSelectedFilm(film)}
            >
              {thumbnail && (
                <Image
                  src={src}
                  alt={film.title || 'film thumbnail'}
                  fill
                  className="object-cover"
                />
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center px-4">
                <div className="text-white flex flex-col items-center w-full">
                  {film.director && (
                    <p className="text-base sm:text-lg md:text-[20px] opacity-90 tracking-wide font-avenir font-[300]">
                      Vergara te lechea
                    </p>
                  )}
                  <p className="uppercase text-2xl sm:text-4xl md:text-[32px] leading-tight my-2 sm:my-4 font-avenir font-[500]">
                    {film.title}
                  </p>
                  <p className="text-lg sm:text-2xl md:text-[20px] opacity-90 font-avenir font-[100]">
                    {film?.platform || 'La Productora Films'}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {selectedFilm?.vimeoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90" onClick={() => setSelectedFilm(null)} />

          {/* Modal window */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
            {/* Extract the ID from any Vimeo URL */}
            {(() => {
              let videoId = String(selectedFilm.vimeoUrl)
              try {
                // new URL(...) handles query strings, trailing slashes, etc.
                const url = new URL(selectedFilm.vimeoUrl)
                videoId = url.pathname.split('/').filter(Boolean).pop() || videoId
              } catch {
                // fallback if URL parsing fails
                const parts = selectedFilm.vimeoUrl.split('/')
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
