import React from 'react'

export type Props = {
  blockType: 'contactUs'
}

export const ContactUsBlock: React.FC<Props> = () => {
  return (
    <section className="bg-black text-white py-16 ">
      <div className="max-w-full mx-auto px-6 md:px-8 md:pt-16 font-avenir">
        {/* Unified Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-16">
          {/* Column 1: LA PRODUCTORA FILMS */}
          <div className="lg:col-span-2 md:border-l border-[#8F8F8F] md:pl-8 border-t md:border-t-0 pt-8 md:pt-0">
            <h3 className="text-lg md:text-[16px] font-semibold tracking-wide mb-8">
              LA PRODUCTORA FILMS
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:mr-48">
              {/* Executive Producers */}
              <div className="">
                <h4 className="text-[16px] font-medium mb-6 text-gray-300">EXECUTIVE PRODUCERS</h4>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Pepe Lamboglia</p>
                    <a
                      href="mailto:pepe@laproductorafilms.com"
                      className="text-gray-400 text-sm hover:underline hover:text-gray transition"
                    >
                      pepe@laproductorafilms.com
                    </a>
                  </div>

                  <div>
                    <p className="font-medium">Jean Paul Bragard</p>
                    <a
                      href="mailto:jp@laproductorafilms.com"
                      className="text-gray-400 text-sm hover:underline hover:text-gray transition"
                    >
                      jp@laproductorafilms.com
                    </a>
                  </div>

                  <div>
                    <p className="font-medium">James Lloyd</p>
                    <a
                      href="mailto:james@laproductorafilms.com"
                      className="text-gray-400 text-sm hover:underline hover:text-gray transition"
                    >
                      james@laproductorafilms.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Head Accountant */}
              <div className="">
                <h4 className="text-[16px] font-medium mb-6 text-gray-300">HEAD ACCOUNTANT</h4>

                <div>
                  <p className="font-medium">Agustina Orozco</p>
                  <a
                    href="mailto:agustina@laproductorafilms.com"
                    className="text-gray-400 text-sm hover:underline hover:text-gray transition"
                  >
                    agustina@laproductorafilms.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: LA PRODUCTORA IA */}
          <div className="md:border-l border-[#8F8F8F] md:pl-8 border-t md:border-t-0 pt-8 md:pt-0">
            <h3 className="text-lg md:text-[16px] font-semibold tracking-wide mb-8">
              LA PRODUCTORA IA
            </h3>

            <h4 className="text-[16px] font-medium mb-6 text-gray-300">AI CREATIVE DIRECTOR</h4>

            <div>
              <p className="font-medium">Rodrigo Méndez</p>
              <a
                href="mailto:rodrigo@laproductorafilms.com"
                className="text-gray-400 text-sm hover:underline hover:text-gray transition"
              >
                rodrigo@laproductorafilms.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUsBlock
