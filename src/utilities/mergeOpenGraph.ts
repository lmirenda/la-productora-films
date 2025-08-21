import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    '20 years of global production services in Uruguay. Full support for commercials, features, and digital content with international standards and local expertise.',
  images: [
    {
      url: `${getServerSideURL()}/opengraph.png`,
    },
  ],
  siteName: 'La Productora Films',
  title: 'La Productora Films',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
