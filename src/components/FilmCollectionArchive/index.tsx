'use client'

import React, { useState, useEffect } from 'react'
import { Film } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
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
                  <div className="mt-4">
                    {film.platform && <p className="text-sm opacity-90">{film.platform}</p>}
                    {film.description && (
                      <div className="text-xs mt-2 opacity-75 line-clamp-2">
                        <RichText
                          data={film.description}
                          enableGutter={false}
                          enableProse={false}
                          className="text-xs"
                        />
                      </div>
                    )}
                  </div>
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
