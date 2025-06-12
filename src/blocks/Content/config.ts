import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'contentType',
    type: 'select',
    defaultValue: 'text',
    options: [
      {
        label: 'Text',
        value: 'text',
      },
      {
        label: 'Media',
        value: 'media',
      },
      {
        label: 'Employee',
        value: 'employee',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (data, siblingData) => siblingData?.contentType === 'text',
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: {
      condition: (data, siblingData) => siblingData?.contentType === 'media',
    },
  },
  {
    name: 'employee',
    type: 'relationship',
    relationTo: 'employees',
    required: false,
    admin: {
      condition: (data, siblingData) => siblingData?.contentType === 'employee',
    },
    hooks: {
      afterRead: [
        async ({ value, req }) => {
          if (typeof value === 'number') {
            const populated = await req.payload.findByID({
              collection: 'employees',
              id: value,
              depth: 1,
            })
            return populated
          }
          return value
        },
      ],
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
