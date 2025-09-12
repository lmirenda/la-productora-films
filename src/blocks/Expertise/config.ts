import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const Expertise: Block = {
  slug: 'expertise',
  labels: { singular: 'Expertise', plural: 'Expertise' },
  fields: [
    // Sección superior: título + texto + 2 botones (PDF/URL)
    {
      name: 'top',
      type: 'group',
      label: 'Top (Cash Rebates)',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        {
          name: 'body',
          type: 'richText',
          label: 'Cuerpo',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'ctas',
          type: 'array',
          label: 'Botones',
          minRows: 0,
          maxRows: 2,
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Etiqueta' },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'PDF (opcional)',
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL (si no hay PDF)',
              admin: { description: 'Se usa si no hay PDF arriba' },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Abrir en nueva pestaña',
              defaultValue: false,
            },
            { name: 'download', type: 'checkbox', label: 'Forzar descarga', defaultValue: true },
            {
              name: 'filename',
              type: 'text',
              label: 'Nombre de archivo (opcional)',
              admin: { condition: (_, siblingData) => Boolean(siblingData?.download) },
            },
          ],
        },
      ],
    },

    // Sección del medio
    {
      name: 'middle',
      type: 'group',
      label: 'Middle (Uruguay)',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        {
          name: 'body',
          type: 'richText',
          label: 'Cuerpo',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },

    // Sección inferior
    {
      name: 'bottom',
      type: 'group',
      label: 'Bottom (Experience)',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        {
          name: 'body',
          type: 'richText',
          label: 'Cuerpo',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}
