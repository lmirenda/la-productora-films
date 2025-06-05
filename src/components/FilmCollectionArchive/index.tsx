'use client'

import React, { useState, useEffect } from 'react'
import { Film } from '@/payload-types'
import { Media } from '@/components/Media'

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
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
        {films?.map((film, index) => {
          const thumbnail = typeof film.thumbnail === 'object' ? film.thumbnail : null

          return (
            <div
              key={index}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
              onClick={() => setSelectedFilm(film)}
            >
              {thumbnail && (
                <Media
                  resource={thumbnail}
                  className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
                  htmlElement={null}
                />
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center px-4">
                <div className="text-white font-semibold text-xl leading-tight">
                  <p className="uppercase">{film.title}</p>
                  <p className="text-base mt-1">{new Date(film.releaseDate).getFullYear()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {selectedFilm?.vimeoUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={selectedFilm.vimeoUrl}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full rounded"
            />
            <button
              onClick={() => setSelectedFilm(null)}
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
