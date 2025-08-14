'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 80) // about 100 WPM typing speed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className="inline-block">
      {displayText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </span>
  )
}

export const VideoLoopHero: React.FC<Page['hero']> = () => {
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
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.removeEventListener('resize', updateSize)
    }
  }, [setHeaderTheme, updateSize])

  const videoId = 1110049044
  const videoSrc = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
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
        }}
      />

      {/* Overlayed text */}
      {/* <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
        <h1 className="text-white text-5xl md:text-7xl font-bold text-center">
          <TypewriterText text="La Productora Films" />
        </h1>
      </div> */}

      {/* Bottom right rebate link */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-white border border-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer pointer-events-auto min-w-[200px]">
        <a href="/pdf/cash-rebate-program.pdf" download="cash-rebate-program.pdf">
          Cash Rebate Program
        </a>
      </div>
    </div>
  )
}
