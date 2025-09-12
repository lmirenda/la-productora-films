'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

// 👇 ACEPTA los datos del hero (opcional; con fallback no se rompe si no llegan)
export const VideoLoopHero: React.FC<Page['hero']> = (hero) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [useNarrowVideo, setUseNarrowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

    const videoRatio = 16 / 9
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
      setUseNarrowVideo(viewportRatio <= 0.9)
    }

    const checkMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera || ''
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        ua,
      )
      setIsMobile(isMobileDevice)
      if (isMobileDevice) {
        setShouldMute(true)
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

    if (isMobile && (window as any).visualViewport) {
      const handleVV = () => {
        const h = (window as any).visualViewport!.height
        if (h > stableViewportHeight * 0.9) updateSize()
      }
      ;(window as any).visualViewport.addEventListener('resize', handleVV)

      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        window.removeEventListener('resize', updateSize)
        ;(window as any).visualViewport?.removeEventListener('resize', handleVV)
      }
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.removeEventListener('resize', updateSize)
    }
  }, [setHeaderTheme, updateSize, isMobile, stableViewportHeight])

  const desktopSrc = '/videos/hero-home-desktop.mp4'
  const mobileSrc = '/videos/hero-home-mobile.mp4'
  const src = useNarrowVideo || isMobile ? mobileSrc : desktopSrc

  const links = (hero as any)?.linkGroup?.links as
    | Array<{ label?: string; url?: string; newTab?: boolean }>
    | undefined
  const cta = (hero as any)?.cta ?? {}
  const fileUrl = cta.file && typeof cta.file === 'object' ? cta.file.url : undefined
  const firstLink = (hero as any)?.links?.[0]?.link
  const ctaLabel = cta.label ?? firstLink?.label ?? 'Cash Rebate Program'
  const ctaHref = fileUrl ?? cta.url ?? firstLink?.url ?? '/pdf/cash-rebate-program.pdf'
  const ctaNewTab = Boolean(cta.newTab ?? firstLink?.newTab)
  const downloadAttr = fileUrl && cta.download ? { download: cta.filename || undefined } : {}
  // Extrae URLs del CMS si existen (soporta number | Media)
  const cmsDesktop =
    (hero as any)?.videoDesktop && typeof (hero as any).videoDesktop !== 'number'
      ? (hero as any).videoDesktop.url
      : undefined

  const cmsMobile =
    (hero as any)?.videoMobile && typeof (hero as any).videoMobile !== 'number'
      ? (hero as any).videoMobile.url
      : undefined

  const poster =
    (hero as any)?.poster && typeof (hero as any).poster !== 'number'
      ? (hero as any).poster.url
      : undefined

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
      <div className="absolute inset-0 bg-black" />

      <video
        autoPlay
        muted={shouldMute}
        playsInline
        loop
        preload="auto"
        src={src}
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
          opacity: 1,
          transition: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
        poster={poster}
      />

      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <a
        href={ctaHref}
        {...(ctaNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...downloadAttr}
      >
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-white border border-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer pointer-events-auto min-w-[200px]">
          {ctaLabel}
        </div>
      </a>
    </div>
  )
}
