'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

export const SoundVideo: React.FC<Page['hero']> = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [useNarrowVideo, setUseNarrowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [_videoLoaded, setVideoLoaded] = useState(false)
  const [_playbackFailed, setPlaybackFailed] = useState(false)
  const [_userInteracted, setUserInteracted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldMute, setShouldMute] = useState(false)
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
          window.removeEventListener('resize', updateSize)
          window.visualViewport?.removeEventListener('resize', handleVisualViewportChange)
        }
      }
    }

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [setHeaderTheme, updateSize, isMobile, stableViewportHeight])

  const videoId = 1110576918
  const narrowVideoId = 1111772053
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
      className="relative w-full overflow-hidden"
      style={{
        height: isMobile && stableViewportHeight > 0 ? `${stableViewportHeight}px` : '100vh',
        minHeight: isMobile ? `${stableViewportHeight}px` : '100vh',
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
          pointerEvents: 'none',
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

      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 font-avenir-next">
        <h1 className="text-white text-2xl md:text-[46px] font-[500] text-center">
          AI-powered. <br className="block md:hidden" />
          Emotion-driven.
        </h1>
      </div>
    </div>
  )
}
