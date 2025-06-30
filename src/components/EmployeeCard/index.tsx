'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import type { Employee } from '@/payload-types'
import { Media } from '@/components/Media'

export type EmployeeCardData = Pick<Employee, 'slug' | 'role' | 'title' | 'pic' | 'email'>

export const EmployeeCard: React.FC<{
  className?: string
  doc?: EmployeeCardData
}> = (props) => {
  const { className, doc } = props
  const { role, title, pic, email } = doc || {}

  return (
    <article
      className={cn(
        'relative h-auto w-full max-h-[210px] border mx-auto overflow-hidden group',
        className,
      )}
    >
      <div className="relative w-full h-full">
        {!pic && <div className="h-full flex items-center justify-center bg-muted">No image</div>}
        {pic && typeof pic !== 'string' && (
          <Media
            resource={pic}
            className="object-cover w-full h-full grayscale"
            imgClassName="w-full h-auto"
          />
        )}

        {/* Text overlay - appears on hover */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-sm uppercase tracking-wider mb-2">{role}</p>
          {email && <p className="text-xs">{email}</p>}
        </div>
      </div>
    </article>
  )
}
