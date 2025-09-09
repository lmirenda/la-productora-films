'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'
import { createFromNextReadableStream } from 'next/dist/client/components/router-reducer/fetch-server-response'

export const VideoLoopHero: React.FC<Page['hero']> = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [useNarrowVideo, setUseNarrowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // para fade-in/spinner
  const [shouldMute, setShouldMute] = useState(true)
  const [stableViewportHeight, setStableViewportHeight] = useState(0)

  const updateSize = useCallback(() => {
    const vw = window.innerWidth
    let vh = window.innerHeight

    if (isMobile) {
      if (stableViewportHeight > 0) {
        vh = Math.max(vh, stableViewportHeight)
      } else {
        setStableViewportHeight(vh)
      }
    }

    const videoRatio = 16 / 9 // tu video desktop es 16:9
    if (vw / vh > videoRatio) {
      setSize({ width: vw, height: vw / videoRatio })
    } else {
      setSize({ width: vh * videoRatio, height: vh })
    }
  }, [isMobile, stableViewportHeight])

  useEffect(() => {
    const checkAspectRatio = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const viewportRatio = vw / vh
      setUseNarrowVideo(viewportRatio <= 0.9) // vertical/estrecho → mobile
    }

    const checkMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera || ''
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        ua,
      )
      setIsMobile(isMobileDevice)
      if (isMobileDevice) {
        setShouldMute(true) // autoplay en iOS exige muted
        setStableViewportHeight(window.innerHeight)
      }
    }

    checkAspectRatio()
    checkMobile()
    window.addEventListener('resize', checkAspectRatio)
    return () => window.removeEventListener('resize', checkAspectRatio)
  }, [])

  useEffect(() => {
    setHeaderTheme('dark')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    updateSize()
    window.addEventListener('resize', updateSize)

    if (isMobile && window.visualViewport) {
      const handleVV = () => {
        const h = window.visualViewport!.height
        if (h > stableViewportHeight * 0.9) updateSize()
      }
      window.visualViewport.addEventListener('resize', handleVV)

      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        window.removeEventListener('resize', updateSize)
        window.visualViewport?.removeEventListener('resize', handleVV)
      }
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.removeEventListener('resize', updateSize)
    }
  }, [setHeaderTheme, updateSize, isMobile, stableViewportHeight])

  // Rutas de video local (ponlos en /public/video/)
  const desktopSrc = '/videos/hero-home-desktop.mp4'
  const mobileSrc = '/videos/hero-home-mobile.mp4'

  // Elegimos fuente: si el viewport es estrecho o es dispositivo móvil, usa el mobile
  const src = useNarrowVideo || isMobile ? mobileSrc : desktopSrc

  return (
    <div
      className="fixed overflow-hidden -z-10"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: isMobile && stableViewportHeight > 0 ? `${stableViewportHeight}px` : '100vh',
      }}
    >
      {/* Fondo negro */}
      <div className="absolute inset-0 bg-black" />

      {/* Video local (sin poster) */}
      <video
        autoPlay
        muted={shouldMute}
        playsInline
        loop
        preload="auto"
        src={src}
        // IMPORTANTE: mostrar el video apenas hay primer frame
        onLoadedData={() => setIsLoading(false)}
        onPlay={() => setIsLoading(false)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          // no arranques en 0 de opacidad; dejalo visible
          opacity: 1,
          transition: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Loading overlay mientras sale el primer frame */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* CTA inferior (igual que el tuyo) */}
      <a href="/pdf/cash-rebate-program.pdf" download="cash-rebate-program.pdf">
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-white border border-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer pointer-events-auto min-w-[200px]">
          Cash Rebate Program
        </div>
      </a>
    </div>
  )
}
