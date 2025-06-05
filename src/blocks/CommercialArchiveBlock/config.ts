import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CommercialArchive: Block = {
  slug: 'commercialArchive',
  interfaceName: 'CommercialArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Intro Content',
    },
    {
      name: 'selectedCommercials',
      type: 'array', // enables ordering!
      label: 'Selected Commercials',
      required: false,
      fields: [
        {
          name: 'commercial',
          type: 'relationship',
          relationTo: 'commercials',
          required: true,
        },
      ],
    },
  ],
}
