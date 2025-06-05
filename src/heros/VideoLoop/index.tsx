'use client'
import React, { useEffect, useState } from 'react'
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
      <span className="animate-blink">|</span>
    </span>
  )
}

export const VideoLoopHero: React.FC<Page['hero']> = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')

    // Disable any page scrolling while this component is mounted.
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      // Re‐enable scrolling when unmounted
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [setHeaderTheme])

  const videoId = 849162755
  const videoSrc = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        // Use 100dvh to account for mobile browser UI + truly fill screen
        height: '100dvh',
        width: '100vw',
        margin: 0,
        padding: 0,
      }}
    >
      <iframe
        src={videoSrc}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Background Video"
        className="absolute top-1/2 left-1/2"
        style={{
          // Make sure the video always covers the full area
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
        <h1 className="text-white text-5xl md:text-7xl font-bold text-center">
          <TypewriterText text="La Productora Films" />
        </h1>
      </div>
    </div>
  )
}
