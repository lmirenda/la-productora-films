import React from 'react'
import type { Employee } from '@/payload-types'

/** Utilidad: obtener nombre/email desde un item del array */
function resolvePerson(p: any): { name?: string; email?: string } {
  // Si viene relación a employees:
  const rel = p?.employee
  if (rel) {
    // Puede ser ID (number) o el objeto Employee
    if (typeof rel === 'object') {
      const e = rel as Employee
      return { name: e?.title ?? undefined, email: e?.email ?? undefined }
    }
  }
  // Manual (name/email)
  return { name: p?.name ?? undefined, email: p?.email ?? undefined }
}

/** Fallbacks para que no se rompa si el CMS está vacío */
const FALLBACK = {
  leftOrgTitle: 'LA PRODUCTORA FILMS',
  leftGroups: [
    {
      heading: 'EXECUTIVE PRODUCERS',
      people: [
        { name: 'Pepe Lamboglia', email: 'pepe@laproductorafilms.com' },
        { name: 'Jean Paul Bragard', email: 'jp@laproductorafilms.com' },
        { name: 'James Lloyd', email: 'james@laproductorafilms.com' },
      ],
    },
    {
      heading: 'HEAD ACCOUNTANT',
      people: [{ name: 'Agustina Orozco', email: 'agustina@laproductorafilms.com' }],
    },
  ],
  rightOrgTitle: 'LA PRODUCTORA IA',
  rightGroups: [
    {
      heading: 'AI CREATIVE DIRECTOR',
      people: [{ name: 'Rodrigo Méndez', email: 'rodrigo@laproductorafilms.com' }],
    },
  ],
}

type Group = { heading?: string; people?: any[] }
type Props = {
  leftOrgTitle?: string
  leftGroups?: Group[]
  rightOrgTitle?: string
  rightGroups?: Group[]
  /** Payload inyecta estas props internas en los bloques */
  blockType?: 'contactUs'
  id?: string
}

export const ContactUsBlock: React.FC<Props> = (props) => {
  const leftOrgTitle = props.leftOrgTitle || FALLBACK.leftOrgTitle
  const rightOrgTitle = props.rightOrgTitle || FALLBACK.rightOrgTitle
  const leftGroups = (props.leftGroups?.length ? props.leftGroups : FALLBACK.leftGroups) as Group[]
  const rightGroups = (props.rightGroups?.length ? props.rightGroups : FALLBACK.rightGroups) as Group[]

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-full mx-auto px-6 md:px-8 md:pt-16 font-avenir">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-16">
          {/* Columna izquierda (2/3 en desktop) */}
          <div className="lg:col-span-2 md:border-l border-[#8F8F8F] md:pl-8 border-t md:border-t-0 pt-8 md:pt-0">
            <h3 className="text-lg md:text-[16px] font-semibold tracking-wide mb-8">
              {leftOrgTitle}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:mr-48">
              {leftGroups.map((g, i) => (
                <div key={`left-g-${i}`}>
                  {g.heading && (
                    <h4 className="text-[16px] font-medium mb-6 text-gray-300">{g.heading}</h4>
                  )}

                  <div className="space-y-4">
                    {(g.people ?? []).map((p, j) => {
                      const { name, email } = resolvePerson(p)
                      if (!name && !email) return null
                      return (
                        <div key={`left-g-${i}-p-${j}`}>
                          {name && <p className="font-medium">{name}</p>}
                          {email && (
                            <a
                              href={`mailto:${email}`}
                              className="text-gray-400 text-sm hover:underline hover:text-gray transition"
                            >
                              {email}
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="md:border-l border-[#8F8F8F] md:pl-8 border-t md:border-t-0 pt-8 md:pt-0">
            <h3 className="text-lg md:text-[16px] font-semibold tracking-wide mb-8">
              {rightOrgTitle}
            </h3>

            {(rightGroups ?? []).map((g, i) => (
              <div key={`right-g-${i}`} className="mb-8 last:mb-0">
                {g.heading && (
                  <h4 className="text-[16px] font-medium mb-6 text-gray-300">{g.heading}</h4>
                )}
                <div className="space-y-4">
                  {(g.people ?? []).map((p, j) => {
                    const { name, email } = resolvePerson(p)
                    if (!name && !email) return null
                    return (
                      <div key={`right-g-${i}-p-${j}`}>
                        {name && <p className="font-medium">{name}</p>}
                        {email && (
                          <a
                            href={`mailto:${email}`}
                            className="text-gray-400 text-sm hover:underline hover:text-gray transition"
                          >
                            {email}
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUsBlock
