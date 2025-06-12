import React from 'react'
import { ExpertiseBlock as ExpertiseBlockProps } from '@/payload-types'
import { Clapperboard, Map, Camera, Users, Truck, Film } from 'lucide-react'

export const ExpertiseBlock: React.FC<ExpertiseBlockProps> = () => {
  const expertiseItems = [
    {
      icon: <Clapperboard className="w-10 h-10 text-[#FF4D00]" />,
      title: 'Full-Service Production',
      description:
        'From pre-production planning to post-production finishing, we handle every aspect of your project with meticulous attention to detail.',
    },
    {
      icon: <Map className="w-10 h-10 text-[#FF4D00]" />,
      title: 'Location Expertise',
      description:
        "Our intimate knowledge of Uruguay's diverse landscapes allows us to find the perfect backdrop for your vision, from pristine beaches to historic urban settings.",
    },
    {
      icon: <Camera className="w-10 h-10 text-[#FF4D00]" />,
      title: 'Top-Tier Equipment',
      description:
        'Access state-of-the-art cameras, lighting, and grip equipment through our extensive network of trusted vendors and partners.',
    },
    {
      icon: <Users className="w-10 h-10 text-[#FF4D00]" />,
      title: 'Experienced Crew',
      description:
        "Our roster includes the region's most talented directors, cinematographers, gaffers, and production designers, all with international experience.",
    },
    {
      icon: <Truck className="w-10 h-10 text-[#FF4D00]" />,
      title: 'Logistics Mastery',
      description:
        'We handle all the complex logistics of production, from permits and transportation to accommodation and catering, ensuring a smooth operation.',
    },
    {
      icon: <Film className="w-10 h-10 text-[#FF4D00]" />,
      title: 'Creative Vision',
      description:
        'Our team brings creative insight and artistic sensibility to every project, helping to elevate your concept and bring your vision to life.',
    },
  ]

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertiseItems.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-zinc-800 bg-black flex flex-col items-start gap-3"
          >
            <div className="rounded-full bg-[#1A1A1A] p-3">{item.icon}</div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
