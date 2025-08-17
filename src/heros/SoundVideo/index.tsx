'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

export const SoundVideo: React.FC<Page['hero']> = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const updateSize = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const videoRatio = 16 / 9 // change this if your Vimeo video has a different ratio

    // if viewport is wider (in ratio) than video, match height, else match width
    if (vw / vh > videoRatio) {
      // viewport is wide: use full width, height scales up
      setSize({ width: vw, height: vw / videoRatio })
    } else {
      // viewport is tall: use full height, width scales up
      setSize({ width: vh * videoRatio, height: vh })
    }
  }, [])

  useEffect(() => {
    setHeaderTheme('dark')

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [setHeaderTheme, updateSize])

  const videoId = 1110576918
  const videoSrc = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=0&controls=0`

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Black backdrop */}
      <div className="absolute inset-0 bg-black" />
      {/* Video */}
      <iframe
        src={videoSrc}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Background Video"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 font-avenir-next">
        <h1 className="text-white text-2xl md:text-[46px] font-[500] text-center">
          AI-powered. <br className="block md:hidden" />
          Emotion-driven.
        </h1>
      </div>
    </div>
  )
}
