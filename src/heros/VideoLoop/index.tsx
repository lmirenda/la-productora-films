'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

// const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
//   const [displayText, setDisplayText] = useState('')
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayText((prev) => prev + text[currentIndex])
//         setCurrentIndex((prev) => prev + 1)
//       }, 80) // about 100 WPM typing speed

//       return () => clearTimeout(timeout)
//     }
//   }, [currentIndex, text])

//   return (
//     <span className="inline-block">
//       {displayText}
//       {currentIndex < text.length && <span className="animate-blink">|</span>}
//     </span>
//   )
// }

export const VideoLoopHero: React.FC<Page['hero']> = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [useNarrowVideo, setUseNarrowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [_videoLoaded, setVideoLoaded] = useState(false)
  const [_playbackFailed, setPlaybackFailed] = useState(false)
  const [_userInteracted, setUserInteracted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldMute, setShouldMute] = useState(true)
  const [stableViewportHeight, setStableViewportHeight] = useState(0)

  const updateSize = useCallback(() => {
    const vw = window.innerWidth
    let vh = window.innerHeight

    // On mobile, use stable viewport height to prevent zoom issues from browser UI changes
    if (isMobile) {
      // Use the larger of current height or stored stable height
      // This prevents the video from zooming when browser UI appears
      if (stableViewportHeight > 0) {
        vh = Math.max(vh, stableViewportHeight)
      } else {
        // First time, store the initial height
        setStableViewportHeight(vh)
      }
    }

    const videoRatio = 16 / 9 // change this if your Vimeo video has a different ratio

    // if viewport is wider (in ratio) than video, match height, else match width
    if (vw / vh > videoRatio) {
      // viewport is wide: use full width, height scales up
      setSize({ width: vw, height: vw / videoRatio })
    } else {
      // viewport is tall: use full height, width scales up
      setSize({ width: vh * videoRatio, height: vh })
    }
  }, [isMobile, stableViewportHeight])

  // Check aspect ratio and mobile device
  useEffect(() => {
    const checkAspectRatio = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const viewportRatio = vw / vh
      const narrowThreshold = 0.9 // use narrow video if aspect ratio is this or narrower

      setUseNarrowVideo(viewportRatio <= narrowThreshold)
    }

    const checkMobile = () => {
      const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        (window as typeof window & { opera?: string }).opera ||
        ''
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      )
      setIsMobile(isMobileDevice)

      // On mobile devices, start with muted video for better autoplay success
      if (isMobileDevice) {
        setShouldMute(true)
        // Set initial stable viewport height for mobile
        setStableViewportHeight(window.innerHeight)
      }
    }

    checkAspectRatio()
    checkMobile()
    window.addEventListener('resize', checkAspectRatio)

    return () => {
      window.removeEventListener('resize', checkAspectRatio)
    }
  }, [])

  useEffect(() => {
    setHeaderTheme('dark')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    updateSize()
    window.addEventListener('resize', updateSize)

    // Handle mobile viewport changes more intelligently
    if (isMobile) {
      // Use visualViewport API if available for better mobile handling
      if (window.visualViewport) {
        const handleVisualViewportChange = () => {
          // Only update if the width changed (orientation) or height increased significantly
          // This prevents updates from just browser UI hiding/showing
          const currentHeight = window.visualViewport!.height
          if (currentHeight > stableViewportHeight * 0.9) {
            updateSize()
          }
        }
        window.visualViewport.addEventListener('resize', handleVisualViewportChange)

        return () => {
          document.documentElement.style.overflow = ''
          document.body.style.overflow = ''
          window.removeEventListener('resize', updateSize)
          window.visualViewport?.removeEventListener('resize', handleVisualViewportChange)
        }
      }
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.removeEventListener('resize', updateSize)
    }
  }, [setHeaderTheme, updateSize, isMobile, stableViewportHeight])

  const videoId = 1111399818
  const narrowVideoId = 1111767191
  const videoSrc = `https://player.vimeo.com/video/${useNarrowVideo ? narrowVideoId : videoId}?background=1&autoplay=1&loop=1&muted=${shouldMute ? 1 : 0}&controls=0&playsinline=1&quality=auto&responsive=1&title=0&byline=0&portrait=0`

  const handleIframeLoad = () => {
    setIsLoading(false)
    setVideoLoaded(true)

    // Check if video is actually playing after a delay for mobile/narrow viewports
    if (useNarrowVideo || isMobile) {
      setTimeout(() => {
        // If still no user interaction and we're on mobile/narrow, assume autoplay failed
        if (!_userInteracted) {
          setPlaybackFailed(true)
        }
      }, 3000)
    }
  }

  return (
    <div
      className="fixed overflow-hidden -z-10 pointer-events-none"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: isMobile && stableViewportHeight > 0 ? `${stableViewportHeight}px` : '100vh',
      }}
    >
      {/* Black backdrop */}
      <div className="absolute inset-0 bg-black" />

      {/* Video */}
      <iframe
        src={videoSrc}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer"
        allowFullScreen
        title="Background Video"
        onLoad={handleIframeLoad}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Overlayed text */}
      {/* <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
        <h1 className="text-white text-5xl md:text-7xl font-bold text-center">
          <TypewriterText text="La Productora Films" />
        </h1>
      </div> */}

      {/* Bottom right rebate link */}
      <a href="/pdf/cash-rebate-program.pdf" download="cash-rebate-program.pdf">
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-white border border-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer pointer-events-auto min-w-[200px]">
          Cash Rebate Program
        </div>
      </a>
    </div>
  )
}
