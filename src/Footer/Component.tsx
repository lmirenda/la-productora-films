import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { Mail, MapPin, Phone, Facebook, Instagram, X, Youtube } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-black text-sm text-white">
      {/* Divider */}
      <div className="w-full flex justify-center">
        <div className="border-t border-border w-full max-w-3xl" />
      </div>
      {/* Big bold text */}
      <div className="w-full flex justify-center items-center py-8">
        <span
          className="w-full text-center whitespace-nowrap font-bold tracking-tight text-white leading-none select-none"
          style={{
            fontSize: 'clamp(2.5rem, 12vw, 8rem)',
            letterSpacing: '-0.04em',
            display: 'block',
          }}
        >
          <span className="font-thin">LA </span>
          <span className="font-extrabold">PRODUCTORA</span>
        </span>
      </div>
      <div className="flex flex-col items-center w-full px-4 md:px-0">
        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-16 md:gap-32 w-full max-w-3xl py-8">
          {/* Contact Info */}
          <div className="pr-4">
            <h4 className="text-lg font-semibold text-white mb-2">Contact Information</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Mar Artico 1234, Montevideo - Uruguay
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />{' '}
                <a href="mailto:info@laproductorafilms.com" className="underline">
                  info@laproductorafilms.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +598 2 601 1117
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="pr-4">
            <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Instagram size={16} />{' '}
                <a href="#" className="underline">
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Youtube size={16} />{' '}
                <a href="#" className="underline">
                  Vimeo
                </a>
              </li>
              <li className="flex items-center gap-2">
                <X size={16} />{' '}
                <a href="#" className="underline">
                  X
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Facebook size={16} />{' '}
                <a href="#" className="underline">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex justify-center">
          <div className="border-t border-border w-full max-w-3xl" />
        </div>

        {/* Copyright */}
        <div className="text-center text-xs py-4 text-muted-foreground w-full max-w-3xl">
          © 2025 La Productora. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
