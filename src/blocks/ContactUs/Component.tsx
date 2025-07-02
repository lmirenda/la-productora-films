import React from 'react'
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react'

export type Props = {
  blockType: 'contactUs'
}

export const ContactUsBlock: React.FC<Props> = () => {
  return (
    <div className="w-full bg-black text-white py-4 container">
      <div className="max-w-4xl space-y-12">
        {/* Location */}
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-[#FF4D00] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium mb-2">Our Location</h3>
            <p className="text-gray-400">
              WTC Free Zone, Dr. Luis Bonavita 1294, 11300 Montevideo, Uruguay
            </p>
            <a
              href="https://maps.google.com"
              className="text-[#FF4D00] hover:underline text-sm mt-2 block"
            >
              View on Google Maps
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <a href="mailto:info@laproductora.com">
            <Mail className="w-6 h-6 text-[#FF4D00] flex-shrink-0 mt-1" />
          </a>
          <div>
            <h3 className="text-lg font-medium mb-2">Email Us</h3>
            <div className="space-y-4">
              <div>
                <a href="mailto:info@laproductora.com" className="text-gray-400 hover:text-white">
                  info@laproductora.com
                </a>
                <p className="text-sm text-gray-500">For general inquiries</p>
              </div>
              <div>
                <a
                  href="mailto:productions@laproductora.com"
                  className="text-gray-400 hover:text-white"
                >
                  productions@laproductora.com
                </a>
                <p className="text-sm text-gray-500">For production-specific inquiries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call Us */}
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-[#FF4D00] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium mb-2">Call Us</h3>
            <p className="text-gray-400">+598 2 601 1117</p>
            <p className="text-sm text-gray-500">Monday to Friday, 9am to 6pm (UYT)</p>
          </div>
        </div>

        {/* Office Hours */}
        <div className="flex items-start gap-4">
          <Clock className="w-6 h-6 text-[#FF4D00] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium mb-2">Office Hours</h3>
            <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM (UYT)</p>
            <p className="text-gray-400">Saturday - Sunday: Closed</p>
            <p className="text-sm text-gray-500 mt-2">
              Available for production support 24/7 during active shoots
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsBlock
