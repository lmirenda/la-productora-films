'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

export const SoundVideo: React.FC<Page['hero']> = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [useNarrowVideo, setUseNarrowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [stableViewportHeight, setStableViewportHeight] = useState(0)

  // ajusta a 16:9 siempre
  const updateSize = useCallback(() => {
    const vw = window.innerWidth
    let vh = window.innerHeight
    if (isMobile) {
      if (stableViewportHeight > 0) vh = Math.max(vh, stableViewportHeight)
      else setStableViewportHeight(vh)
    }
    const ratio = 16 / 9
    if (vw / vh > ratio) setSize({ width: vw, height: vw / ratio })
    else setSize({ width: vh * ratio, height: vh })
  }, [isMobile, stableViewportHeight])

  useEffect(() => {
    const checkAspectRatio = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      setUseNarrowVideo(vw / vh <= 0.9)
    }
    const checkMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera || ''
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)
      setIsMobile(isMobileDevice)
      if (isMobileDevice) setStableViewportHeight(window.innerHeight)
    }
    checkAspectRatio()
    checkMobile()
    window.addEventListener('resize', checkAspectRatio)
    return () => window.removeEventListener('resize', checkAspectRatio)
  }, [])

  useEffect(() => {
    setHeaderTheme('dark')
    updateSize()
    window.addEventListener('resize', updateSize)

    if (isMobile && window.visualViewport) {
      const handleVV = () => {
        const h = window.visualViewport!.height
        if (h > stableViewportHeight * 0.9) updateSize()
      }
      window.visualViewport.addEventListener('resize', handleVV)
      return () => {
        window.removeEventListener('resize', updateSize)
        window.visualViewport?.removeEventListener('resize', handleVV)
      }
    }
    return () => window.removeEventListener('resize', updateSize)
  }, [setHeaderTheme, updateSize, isMobile, stableViewportHeight])

  const desktopMp4 = '/videos/hero-ai-desktop.mp4'
  const mobileMp4  = '/videos/hero-ai-mobile.mp4'
  const useMobile = useNarrowVideo || isMobile

  const tryPlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    ;(v as any).playsInline = true // iOS
    const p = v.play()
    if (p && typeof (p as any).catch === 'function') {
      ;(p as Promise<void>).catch(() => {
        setTimeout(() => v.play().catch(() => {}), 120)
      })
    }
  }, [])

  useEffect(() => {
    tryPlay()
  }, [tryPlay, useMobile])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: isMobile && stableViewportHeight > 0 ? `${stableViewportHeight}px` : '100vh',
        minHeight: isMobile ? `${stableViewportHeight}px` : '100vh',
      }}
    >
      <div className="absolute inset-0 bg-black" />

      <video
        ref={videoRef}
        className="pointer-events-none"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"          
        disablePictureInPicture
        controls={false}
        onLoadedMetadata={tryPlay}
        onLoadedData={tryPlay}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          opacity: 1,
          transition: 'none',
        }}
        aria-hidden="true"
        src={useMobile ? mobileMp4 : desktopMp4}
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
