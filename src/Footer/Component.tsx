import React from 'react'

import type { Footer } from '@/payload-types'

export async function Footer() {
  return (
    <footer className="bg-black text-white py-8 md:pb-8 md:pt-0">
      <div className="w-full mx-auto px-6 md:px-12">
        {/* Main Content Grid */}
        {/* commented out */}

        {/* Divider */}
        <div className="border-t border-gray-500 my-4"></div>

        {/* Copyright */}
        <div className="text-center text-[14px] md:text-[16px] mx-auto">
          ©2025 La Productora Films. <br className="block md:hidden" /> Follow us on{' '}
          <a href="https://www.instagram.com/laproductorafilms/?hl=en" target="_blank">
            Instagram
          </a>{' '}
          |{' '}
          <a href="https://www.vimeo.com/laproductorafilms" target="_blank">
            Vimeo
          </a>{' '}
          |{' '}
          <a href="https://www.imdb.com/es-es/search/title/?companies=co0280497" target="_blank">
            IMDB
          </a>
        </div>
      </div>
    </footer>
  )
}

// <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-24">
// {/* Left Section - LA PRODUCTORA (spans 2 columns on md+) */}
// <div className="md:col-span-2">
//   <div className="mb-2">
//     <Link href="/" className="flex-shrink-0">
//       <Logo className="text-white w-[200px] md:w-[250px] h-auto" />
//     </Link>
//   </div>
//   <p className="text-[16px] mb-6">
//     20 years of global production
//     <br />
//     services in Uruguay.
//   </p>

//   {/* Social Media Icons */}
//   <div className="flex gap-4">
//     <a
//       href="https://vimeo.com/laproductorafilms"
//       className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden"
//     >
//       <Image
//         src="/vimeo.png"
//         alt="Vimeo"
//         width={16}
//         height={16}
//         className="object-cover"
//       />
//     </a>
//     <a
//       href="https://www.instagram.com/laproductorafilms/?hl=en"
//       className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
//     >
//       <Instagram size={16} className="text-black" />
//     </a>
//     <a
//       href="https://www.imdb.com/es-es/search/title/?companies=co0280497"
//       className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="21"
//         height="9"
//         viewBox="0 0 21 9"
//         fill="none"
//       >
//         <g clipPath="url(#clip0_789_233)">
//           <path
//             d="M6.85723 0.00732422C6.83838 0.00732422 6.80774 0.0632853 6.80774 0.0924824C6.69464 1.36499 6.36475 4.06572 6.33176 4.09735C6.2917 4.05599 5.93824 1.27983 5.75916 0.00732422H2.84668V8.86134H4.80954C4.81661 7.08275 4.81661 3.292 4.82603 3.08275C4.86374 3.33579 5.37507 7.07059 5.6272 8.84674H7.00568C7.00568 8.84674 7.73615 3.03652 7.7715 3.01462C7.7715 3.14358 7.75265 4.86134 7.78799 5.71779C7.78799 6.76402 7.78799 7.81268 7.78799 8.86134H9.75085V0.00732422H6.85487H6.85723Z"
//             fill="#010000"
//           />
//           <path
//             d="M15.5142 2.15334C15.4436 0.883263 15.1467 0.257959 13.8247 0.0803433C12.6984 -0.0705083 11.5131 0.0487131 10.375 0.00978368V8.8638C11.4684 8.81757 12.6088 8.92463 13.6975 8.8638C14.3431 8.82973 15.1066 8.68862 15.3776 7.99518C15.5072 7.66672 15.5331 7.1436 15.5472 6.78351C15.6038 5.32365 15.5944 3.60589 15.5142 2.1509V2.15334ZM13.2898 6.64969C13.2427 7.18983 13.1508 7.33095 12.6018 7.34068V1.52803C12.9128 1.52317 13.2686 1.55966 13.2851 1.95382C13.2969 3.49154 13.4241 5.12414 13.2898 6.64969Z"
//             fill="#010000"
//           />
//           <path
//             d="M20.9483 2.65939C20.814 1.2336 18.9454 1.14114 18.1654 2.06815V0.00732422H16.0376V8.86134H18.017C18.1065 8.71049 18.1253 8.49638 18.1654 8.32119C18.7074 9.03652 19.73 9.24577 20.4393 8.65696C20.8069 8.35282 20.9176 7.96839 20.9483 7.49394C21.0496 5.9246 20.9813 4.34309 20.9483 2.65939ZM18.8205 6.9538C18.8158 7.07545 18.7993 7.27253 18.7828 7.38932C18.7192 7.83457 18.2573 7.81511 18.2007 7.38932C18.1843 7.27253 18.1725 7.07545 18.1654 6.95136C18.1088 5.91 18.1136 4.54747 18.1654 3.50367C18.1725 3.37229 18.1843 3.16061 18.2007 3.03409C18.2361 2.78105 18.5094 2.67642 18.6791 2.82241C18.7781 2.90513 18.8134 3.35769 18.8205 3.50367C18.877 4.5353 18.8723 5.91973 18.8205 6.9538Z"
//             fill="black"
//           />
//           <path
//             d="M2.25741 0.00732422V8.81024C2.25741 8.81024 2.21263 8.86134 2.20792 8.86134H0V0.00732422H2.25741Z"
//             fill="#010101"
//           />
//         </g>
//         <defs>
//           <clipPath id="clip0_789_233">
//             <rect width="21" height="9" fill="white" />
//           </clipPath>
//         </defs>
//       </svg>{' '}
//     </a>
//   </div>
// </div>

// {/* Right Section - Contact (spans 1 column on md+) */}
// <div className="md:col-span-1 hidden md:block">
//   <h3 className="text-[16px] md:text-[18px] uppercase mb-3 font-medium font-avenir">
//     CONTACT
//   </h3>
//   <div className="flex flex-col space-y-2 md:space-y-4 text-[14px] md:text-[14px]">
//     <p>Costa Rica 1651, 11500 Montevideo, Uruguay</p>
//     <p>info@laproductorafilms.com</p>
//     <p>+(598) 94 843 769</p>
//   </div>
// </div>
// </div>
