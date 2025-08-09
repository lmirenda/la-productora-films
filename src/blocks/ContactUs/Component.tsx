import React from 'react'

export type Props = {
  blockType: 'contactUs'
}

export const ContactUsBlock: React.FC<Props> = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-full mx-auto px-12 font-avenir">
        {/* Section Title */}
        <h2 className="text-center text-2xl md:text-3xl font-light mb-16 tracking-wide font-avenir-next">
          MEET OUR TEAM
        </h2>

        {/* Unified Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Column 1: LA PRODUCTORA FILMS */}
          <div className="lg:col-span-2 border-l border-[#8F8F8F] pl-8">
            <h3 className="text-[16px] font-semibold tracking-wide mb-8">LA PRODUCTORA FILMS</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Executive Producers */}
              <div>
                <h4 className="text-[16px] font-medium mb-6 text-gray-300">EXECUTIVE PRODUCERS</h4>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Pepe Lamboglia</p>
                    <p className="text-gray-400 text-sm">pepe@laproductorafilms.com</p>
                  </div>

                  <div>
                    <p className="font-medium">Jean Paul Bragard</p>
                    <p className="text-gray-400 text-sm">jp@laproductorafilms.com</p>
                  </div>

                  <div>
                    <p className="font-medium">James Lloyd</p>
                    <p className="text-gray-400 text-sm">james@laproductorafilms.com</p>
                  </div>
                </div>
              </div>

              {/* Head Accountant */}
              <div>
                <h4 className="text-[16px] font-medium mb-6 text-gray-300">HEAD ACCOUNTANT</h4>

                <div>
                  <p className="font-medium">Agustina Orozco</p>
                  <p className="text-gray-400 text-sm">agustina@laproductorafilms.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: LA PRODUCTORA IA */}
          <div className="border-l border-[#8F8F8F] pl-8">
            <h3 className="text-[16px] font-semibold tracking-wide mb-8">LA PRODUCTORA IA</h3>

            <h4 className="text-[16px] font-medium mb-6 text-gray-300">AI CREATIVE DIRECTOR</h4>

            <div>
              <p className="font-medium">Rodrigo Méndez</p>
              <p className="text-gray-400 text-sm">rodrigo@laproductorafilms.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUsBlock
