import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FilmArchive: Block = {
  slug: 'filmArchive',
  interfaceName: 'FilmArchiveBlock',
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
      name: 'selectedFilms',
      type: 'array', // enables ordering!
      label: 'Selected Films',
      required: false,
      fields: [
        {
          name: 'film',
          type: 'relationship',
          relationTo: 'films',
          required: true,
        },
      ],
    },
  ],
}
