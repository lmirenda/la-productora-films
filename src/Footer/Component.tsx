import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { Mail, MapPin, Phone, Facebook, Instagram, X, Youtube } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-black text-sm text-muted-foreground text-white">
      <div className="container py-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Left: Company Info */}
        <div className="max-w-sm">
          <h4 className="text-lg font-semibold text-white mb-2">La Productora</h4>
          <p className="text-muted-foreground">
            Creating cinematic excellence since 2010. Award-winning production company specializing in commercials, films, and branded content.
          </p>
        </div>

        {/* Center: Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contact Information</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Mar Artico 1234, Montevideo - Uruguay
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> <a href="mailto:info@laproductorafilms.com" className="underline">info@laproductorafilms.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +598 2 601 1117
            </li>
          </ul>
        </div>

        {/* Right: Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex items-center gap-2">
              <Instagram size={16} /> <a href="#" className="underline">Instagram</a>
            </li>

            <li className="flex items-center gap-2">
              <Youtube size={16} /> <a href="#" className="underline">Vimeo</a>
            </li>
            <li className="flex items-center gap-2">
              <X size={16} /> <a href="#" className="underline">X</a>
            </li>
            <li className="flex items-center gap-2">
              <Facebook size={16} /> <a href="#" className="underline">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-border text-center text-xs py-4 text-muted-foreground">
        © 2025 La Productora. All rights reserved.
      </div>
    </footer>
  )
}
