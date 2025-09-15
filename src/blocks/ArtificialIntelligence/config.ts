import type { Block } from 'payload'
import {
  lexicalEditor,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const ArtificialIntelligence: Block = {
  slug: 'artificialIntelligence',
  labels: {
    singular: 'Artificial Intelligence',
    plural: 'Artificial Intelligence',
  },
  fields: [
    {
      name: 'topImage',
      label: 'Imagen superior',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'leftImage',
      label: 'Imagen izquierda (decorativa)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'rightImage',
      label: 'Imagen derecha (decorativa)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'content',
      label: 'Texto (cuerpo)',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      required: false,
    },
  ],
}
