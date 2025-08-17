import React from 'react'
import { ExpertiseBlock as ExpertiseBlockProps } from '@/payload-types'

export const ExpertiseBlock: React.FC<ExpertiseBlockProps> = () => {
  return (
    <div className="bg-black text-white py-8 lg:py-16 px-8 lg:px-20 font-avenir">
      <div className="max-w-full mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[465px_1fr] gap-8 lg:gap-[120px] mb-8 lg:mb-16">
          {/* Left Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div className="text-[20px] lg:text-[24px] font-[600] mb-2 lg:mb-8 leading-[26px] lg:leading-[30px]">
              Cash Rebates.
              <br />
              Compelling financial advantages for
              <br />
              international productions.
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="border-t border-white w-full mb-6 lg:mb-8"></div>
            <div className="mb-6 lg:mb-8">
              <p className="text-[14px] lg:text-[16px] font-[400] leading-normal text-justify mb-8 lg:mb-6">
                Advertising projects benefit from a{' '}
                <strong>20% cash rebate on eligible production expenses</strong>, while{' '}
                <strong>films, series, and documentaries can receive up to 25% cash back</strong>.
                Additionally, services are exempt from VAT, making Uruguay not only creatively
                diverse but also financially strategic for your next shoot.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:mb-20 mx-12 lg:mx-0">
                <a href="/pdf/advertising.pdf" download="advertising.pdf">
                  <button className="border border-white rounded-full px-4 lg:px-6 py-2 text-[16px] lg:text-[18px] font-[600] leading-normal hover:bg-white hover:text-black transition-colors max-w-[350px] mx-auto w-full">
                    Advertising
                  </button>
                </a>
                <a href="/pdf/entertainment.pdf" download="entertaiment.pdf">
                  <button className="border border-white rounded-full px-4 lg:px-6 py-2 text-[16px] lg:text-[18px] font-[600] leading-normal hover:bg-white hover:text-black transition-colors max-w-[350px] mx-auto w-full">
                    Entertainment
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[465px_1fr] gap-8 lg:gap-[120px] mb-8 lg:mb-16">
          {/* Left Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div className="text-[20px] lg:text-[24px] font-[600] mb-2 lg:mb-8 leading-[26px] lg:leading-[30px]">
              Uruguay, South America&apos;s hidden gem.
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="border-t border-white w-full mb-6 lg:mb-8"></div>
            <div className="lg:mb-20">
              <p className="text-[14px] lg:text-[16px] font-[400] leading-normal text-justify mb-3 lg:mb-4">
                Safe, stable, and strategically located, it offers a variety of{' '}
                <strong>unique locations, reliable logistics, and cost-effective services</strong> -
                making it the perfect setting for your next production.
              </p>
              <p className="text-[14px] lg:text-[16px] font-[400] leading-normal text-justify">
                Situated between Argentina and Brazil, Uruguay is a a vibrant production hub
                combining political stability with diverse landscapes{' '}
                <strong>
                  International crews benefit from favorable exchange rates, competitive production
                  costs, experienced local teams, and access to the latest equipment options.
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[465px_1fr] gap-8 lg:gap-[120px]">
          {/* Left Column */}
          <div>
            <div className="border-t border-white w-full mb-8"></div>
            <div className="text-[20px] lg:text-[24px] font-[600] mb-2 lg:mb-8 leading-[26px] lg:leading-[30px]">
              Experienced. International. Built to adapt.
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="border-t border-white w-full mb-6 lg:mb-8"></div>
            <div className="lg:mb-20">
              <p className="text-[14px] lg:text-[16px] font-[400] leading-normal text-justify mb-3 lg:mb-4">
                We provide <strong>full production support for all types of media</strong> from
                commercials to features, digital content, and beyond. Our{' '}
                <strong>experienced, multi-lingual team</strong> has{' '}
                <strong>supported countless global production companies</strong>, blending
                international standards with unmatched regional expertise.
              </p>
              <p className="text-[14px] lg:text-[16px] font-[400] leading-normal text-justify">
                We{' '}
                <strong>combine deep local knowledge with wolrd-wide production protocols</strong> -
                caring about every detail – because we know that great production happens when
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
