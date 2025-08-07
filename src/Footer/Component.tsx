import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { Instagram } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'

export async function Footer() {
  return (
    <footer className="bg-black text-white py-8 md:py-12">
      <div className="w-full mx-auto px-6 md:px-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-24">
          {/* Left Section - LA PRODUCTORA (spans 2 columns on md+) */}
          <div className="md:col-span-2">
            <div className="mb-2">
              <Link href="/" className="flex-shrink-0">
                <Logo className="text-white w-[200px] md:w-[300px] h-auto" />
              </Link>
            </div>
            <p className="text-[16px] md:text-[20px] mb-6">
              Over 15 years bringing
              <br />
              Uruguay to the world.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://vimeo.com/laproductorafilms"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden"
              >
                <Image
                  src="/vimeo.png"
                  alt="Vimeo"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </a>
              <a
                href="https://www.instagram.com/laproductorafilms/?hl=en"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
              >
                <Instagram size={16} className="text-black" />
              </a>
            </div>
          </div>

          {/* Right Section - Contact (spans 1 column on md+) */}
          <div className="md:col-span-1">
            <h3 className="text-[16px] md:text-[18px] uppercase mb-3 font-medium font-avenir">
              CONTACT
            </h3>
            <div className="flex flex-col space-y-4 md:space-y-6 text-[14px] md:text-[16px]">
              <p>Costa Rica 1651, 11500 Montevideo, Uruguay</p>
              <p>info@laproductorafilms.com</p>
              <p>+598 93 111 111</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-6"></div>

        {/* Copyright */}
        <div className="text-left text-[14px] md:text-[16px]">
          ©2025 La Productora Films. All rights reserved
        </div>
      </div>
    </footer>
  )
}
