// src/blocks/MediaBlock/Component.tsx
'use client'

import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    blockName, // 👈 lo usamos para las variantes de AI
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  // ─────────────────────────────────────────────────────────
  // Variantes específicas para la sección AI (no afectan otros usos)
  // ─────────────────────────────────────────────────────────

  // 1) Imagen superior centrada
  if (blockName === 'ai-top') {
    return (
      <div className={cn('container relative z-[1] px-4', className)}>
        <div className="flex justify-center mb-2 md:mb-2">
          <Media
            resource={media}
            src={staticImage}
            // sin borde/redondeo para respetar tu diseño
            imgClassName={cn('!border-0 !rounded-none', imgClassName)}
          />
        </div>
        {caption && (
          <div className={cn('mt-6', { container: !disableInnerContainer }, captionClassName)}>
            <RichText data={caption} enableGutter={false} />
          </div>
        )}
      </div>
    )
  }

  // 2) Decorativa izquierda (solo en xl+)
  if (blockName === 'ai-left') {
    return (
      <div className={cn('hidden xl:block relative h-0', className)} aria-hidden>
        <div className="pointer-events-none select-none absolute left-[-5%] top-0 translate-y-[100px]">
          <Media
            resource={media}
            src={staticImage}
            imgClassName={cn('!border-0 !rounded-none', imgClassName)}
          />
        </div>
        {/* sin caption en decorativas */}
      </div>
    )
  }

  // 3) Decorativa derecha (solo en xl+)
  if (blockName === 'ai-right') {
    return (
      <div className={cn('hidden xl:block relative h-0', className)} aria-hidden>
        <div className="pointer-events-none select-none absolute right-[-5%] top-0 translate-y-[40px]">
          <Media
            resource={media}
            src={staticImage}
            imgClassName={cn('!border-0 !rounded-none', imgClassName)}
          />
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────
  // Render por defecto (todo lo demás sigue igual)
  // ─────────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}

export default MediaBlock
