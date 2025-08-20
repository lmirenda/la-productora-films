'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

export const SoundVideo: React.FC<Page['hero']> = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [useNarrowVideo, setUseNarrowVideo] = useState(false)
  const [_videoLoaded, setVideoLoaded] = useState(false)
  const [_playbackFailed, setPlaybackFailed] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  // Check aspect ratio and set video type
  useEffect(() => {
    const checkAspectRatio = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const viewportRatio = vw / vh
      const narrowThreshold = 0.9 // use narrow video if aspect ratio is this or narrower

      setUseNarrowVideo(viewportRatio <= narrowThreshold)
    }

    checkAspectRatio()
    window.addEventListener('resize', checkAspectRatio)

    return () => {
      window.removeEventListener('resize', checkAspectRatio)
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
  const narrowVideoId = 1111772053
  const videoSrc = `https://player.vimeo.com/video/${useNarrowVideo ? narrowVideoId : videoId}?background=1&autoplay=1&loop=1&muted=0&controls=0&playsinline=1&quality=auto&responsive=1&title=0&byline=0&portrait=0`

  const handleIframeLoad = () => {
    setIsLoading(false)
    setVideoLoaded(true)

    // Check if video is actually playing after a delay for narrow viewports
    if (useNarrowVideo) {
      setTimeout(() => {
        // If still no user interaction and we're using narrow video, assume autoplay failed
        if (!userInteracted) {
          setPlaybackFailed(true)
        }
      }, 3000)
    }
  }

  const _handlePlayClick = () => {
    setUserInteracted(true)
    setPlaybackFailed(false)

    // Force video to play by reloading iframe with autoplay
    const iframe = document.querySelector('iframe[title="Background Video"]') as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
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

      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 font-avenir-next">
        <h1 className="text-white text-2xl md:text-[46px] font-[500] text-center">
          AI-powered. <br className="block md:hidden" />
          Emotion-driven.
        </h1>
      </div>
    </div>
  )
}
