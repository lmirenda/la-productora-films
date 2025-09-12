// heros/config.ts
import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  label: false,
  fields: [
    // —————————————————————————————————————————————————————
    // Tipo de hero
    // —————————————————————————————————————————————————————
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
        { label: 'Video Loop', value: 'videoLoop' },
        { label: 'No Impact', value: 'noImpact' },
        { label: 'AI Video', value: 'soundVideo' },
      ],
      required: true,
    },

    // —————————————————————————————————————————————————————
    // Campos de VIDEO (solo para videoLoop / soundVideo)
    // —————————————————————————————————————————————————————
    {
      name: 'videoDesktop',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_: any, { type } = {} as any) => ['videoLoop', 'soundVideo'].includes(type),
        description: 'Video horizontal (mp4) para desktop',
      },
    },
    {
      name: 'videoMobile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_: any, { type } = {} as any) => ['videoLoop', 'soundVideo'].includes(type),
        description: 'Video vertical/cuadrado (mp4) para mobile',
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_: any, { type } = {} as any) => ['videoLoop', 'soundVideo'].includes(type),
        description: 'Imagen poster (opcional, para evitar frame negro al cargar)',
      },
    },

    // —————————————————————————————————————————————————————
    // RichText (oculto en héroes de video para simplificar)
    // —————————————————————————————————————————————————————
    {
      name: 'richText',
      type: 'richText',
      admin: {
        // ocultar en tipos de video
        condition: (_: any, { type } = {} as any) => !['videoLoop', 'soundVideo'].includes(type),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },

    // —————————————————————————————————————————————————————
    // Links (ocultos en video: ahí usamos CTA dedicado)
    // —————————————————————————————————————————————————————
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          // ocultar si es video (videoLoop / soundVideo)
          condition: (_: any, { type } = {} as any) => !['videoLoop', 'soundVideo'].includes(type),
        },
      },
    }),

    // —————————————————————————————————————————————————————
    // CTA (en videoLoop y también en soundVideo si querés)
    // —————————————————————————————————————————————————————
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      admin: {
        condition: (_: any, { type } = {} as any) => ['videoLoop'].includes(type),
        description: 'Botón del Hero: etiqueta + PDF (o URL alternativa)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta',
          defaultValue: 'Cash Rebate Program',
          required: true,
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'PDF',
          admin: { description: 'Elegí un PDF desde Media (opcional si usás URL)' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL (opcional)',
          admin: { description: 'Se usa si no hay PDF arriba' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Abrir en nueva pestaña',
          defaultValue: false,
        },
        {
          name: 'download',
          type: 'checkbox',
          label: 'Forzar descarga si es PDF',
          defaultValue: true,
        },
        {
          name: 'filename',
          type: 'text',
          label: 'Nombre de archivo (opcional)',
          admin: { condition: (data: any) => Boolean(data?.cta?.download) },
        },
      ],
    },

    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_: any, { type } = {} as any) => ['highImpact', 'mediumImpact'].includes(type),
      },

      required: false,
    },
    {
      name: 'sponsors',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { description: 'Logos opcionales de sponsors' },
    },

    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_: any, { type } = {} as any) =>
          ['soundVideo', 'highImpact', 'mediumImpact', 'lowImpact'].includes(type),
        description:
          'Título principal del hero.',
      },
      required: false,
    },
  ],
}
