import React from 'react'
import { ArtificialIntelligenceBlock as ArtificialIntelligenceBlockProps } from '@/payload-types'
import Image from 'next/image'

export const ArtificialIntelligenceBlock: React.FC<ArtificialIntelligenceBlockProps> = () => {
  return (
    <section className="relative text-white overflow-hidden md:py-2 font-avenir mb-20">
      {/* Three decorative images: one top, two near bottom sides */}
      <div className="pointer-events-none select-none" aria-hidden>
        {/* bottom left */}
        <div className="hidden md:block absolute bottom-20 left-[-5%] translate-y-[100px]">
          <Image src="/images/left.png" alt="" width={630} height={420} />
        </div>

        {/* bottom right */}
        <div className="hidden md:block absolute bottom-10 right-[-5%]">
          <Image src="/images/right.png" alt="" width={630} height={420} />
        </div>
      </div>

      {/* center content */}
      <div className="container relative z-[1] px-4">
        {/* top image centered above text */}
        <div className="flex justify-center mb-2 md:mb-2">
          <Image src="/images/top.png" alt="" width={780} height={510} priority />
        </div>

        <div className="mx-auto max-w-3xl text-center leading-relaxed space-y-6">
          <p className="text-[15px] md:text-lg opacity-90">
            “There are ideas too big to fit on a set.
            <br className="hidden md:block" />
            Stories so powerful they demand new ways of being told.
            <br className="hidden md:block" />
            Images that, until now, seemed impossible.”
          </p>
          <p className="text-[15px] md:text-lg opacity-90">
            This is new territory.
            <br className="hidden md:block" />
            A laboratory where artificial intelligence serves emotion, art, and visual storytelling.
            <br className="hidden md:block" />
            It’s not a replacement. It’s expansion. It’s creative freedom.
          </p>
          <p className="text-[15px] md:text-lg opacity-90">
            Where there were once technical limits, now there are open doors.
            <br className="hidden md:block" />
            Where we used to say “it can’t be done,” now we say “imagine it.”
          </p>
          <p className="text-[15px] md:text-lg opacity-90">
            The future of image is no longer a promise.
            <br className="hidden md:block" />
            It’s a tool.
            <br className="hidden md:block" />
            And it’s ready to be used.”
          </p>
          <div className="pt-2 pb-10">
            <span className="tracking-wide text-lg md:text-xl font-semibold">LA PRODUCTORA </span>
            <span className="tracking-wide text-lg md:text-xl font-semibold text-emerald-400">
              AI
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
