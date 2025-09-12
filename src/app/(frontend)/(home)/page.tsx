// app/(frontend)/(home)/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { homeStatic } from '@/endpoints/seed/home-static'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    draft, // ← trae borrador si venís de Preview
    overrideAccess: draft, // ← ignora reglas de acceso en preview
    limit: 1,
    pagination: false,
    where: { slug: { equals: 'home' } },
    depth: 2,
  })

  const page = docs?.[0] ?? null

  // Fallback de “sitio semilla” si aún no existe la home en CMS
  const finalPage = page ?? homeStatic
  if (!finalPage) return <PayloadRedirects url="/" />

  return (
    <main>
      {draft && <LivePreviewListener />}
      <RenderHero {...finalPage.hero} />
      <RenderBlocks blocks={finalPage.layout} />
    </main>
  )
}
