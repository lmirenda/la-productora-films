import React from 'react'
import { ExpertiseBlock as ExpertiseBlockProps } from '@/payload-types'
import Link from 'next/link'

export const ExpertiseBlock: React.FC<ExpertiseBlockProps> = () => {
  return (
    <div className="bg-black text-white py-16 px-8 font-avenir">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[465px_1fr] gap-[120px] mb-16">
          {/* Left Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div className="text-[24px] font-[600] mb-8 leading-[30px]">
              Cash Rebates.
              <br />
              Compelling financial advantages for
              <br />
              international productions.
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div className="mb-8">
              <p className="text-[16px] font-[400] leading-normal text-justify mb-6">
                Advertising projects benefit from a{' '}
                <strong>20% cash rebate on eligible production expenses</strong>, while{' '}
                <strong>films, series, and documentaries can receive up to 25% cash back</strong>.
                Additionally, services are exempt from VAT, making Uruguay not only creatively
                diverse but also financially strategic for your next shoot.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="border border-white rounded-full px-6 py-2 text-[22px] font-[600] leading-normal hover:bg-white hover:text-black transition-colors">
                  <Link href="/commercials">Advertising</Link>
                </button>
                <button className="border border-white rounded-full px-6 py-2 text-[22px] font-[600] leading-normal hover:bg-white hover:text-black transition-colors">
                  <Link href="/feature-films">Movies & Series</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-[465px_1fr] gap-[120px] mb-16">
          {/* Left Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div className="text-[24px] font-[600] mb-8 leading-[30px]">
              Uruguay, South America&apos;s hidden gem.
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div>
              <p className="text-[16px] font-[400] leading-normal text-justify mb-4">
                Safe, stable, and strategically located, it offers a variety of{' '}
                <strong>unique locations, reliable logistics, and cost-effective services</strong> -
                making it the perfect setting for your next production.
              </p>
              <p className="text-[16px] font-[400] leading-normal text-justify">
                Situated between Argentina and Brazil, Uruguay combines{' '}
                <strong>political stability with diverse landscapes</strong> including beaches,
                countryside, and urban settings.{' '}
                <strong>
                  International crews benefit from favorable exchange rates, competitive production
                  costs, experienced local teams, and access to modern equipment.
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-[465px_1fr] gap-[120px]">
          {/* Left Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div className="text-[24px] font-[600] mb-8 leading-[30px]">
              Experienced. International. Built to adapt.
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div>
              <p className="text-[16px] font-[400] leading-normal text-justify mb-4">
                We provide <strong>full production support for all types of media</strong> from
                commercials to features, digital content, and beyond. Our{' '}
                <strong>experienced, multi-lingual team</strong> has{' '}
                <strong>supported countless global production companies</strong>, blending
                international standards with unmatched regional expertise.
              </p>
              <p className="text-[16px] font-[400] leading-normal text-justify">
                We <strong>combine deep regional knowledge with global production standards</strong>{' '}
                - caring about every detail – because we know that great production happens when
                everything runs smoothly and nothing feels forced.{' '}
                <strong>From prep to wrap, we focus on what matters most</strong> - creative
                collaboration, and ensuring your shoot is both efficient and unforgettable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
