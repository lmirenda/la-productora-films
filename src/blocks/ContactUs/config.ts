import type { Block } from 'payload'

export const ContactUs: Block = {
  slug: 'contactUs',
  labels: { singular: 'Contact Us', plural: 'Contact Us' },
  fields: [
    {
      name: 'leftOrgTitle',
      type: 'text',
      label: 'Título columna izquierda',
      defaultValue: 'LA PRODUCTORA FILMS',
    },
    {
      name: 'leftGroups',
      type: 'array',
      label: 'Grupos (columna izquierda)',
      labels: { singular: 'Grupo', plural: 'Grupos' },
      fields: [
        { name: 'heading', type: 'text', label: 'Subtítulo', required: true },
        {
          name: 'people',
          type: 'array',
          label: 'Personas',
          labels: { singular: 'Persona', plural: 'Personas' },
          fields: [
            {
              name: 'employee',
              type: 'relationship',
              relationTo: 'employees',
              label: 'Empleado (opcional)',
            },
            { name: 'name', type: 'text', label: 'Nombre' },
            { name: 'email', type: 'email', label: 'Email' },
          ],
        },
      ],
    },

    {
      name: 'rightOrgTitle',
      type: 'text',
      label: 'Título columna derecha',
      defaultValue: 'LA PRODUCTORA IA',
    },
    {
      name: 'rightGroups',
      type: 'array',
      label: 'Grupos (columna derecha)',
      labels: { singular: 'Grupo', plural: 'Grupos' },
      fields: [
        { name: 'heading', type: 'text', label: 'Subtítulo', required: true },
        {
          name: 'people',
          type: 'array',
          label: 'Personas',
          labels: { singular: 'Persona', plural: 'Personas' },
          fields: [
            {
              name: 'employee',
              type: 'relationship',
              relationTo: 'employees',
              label: 'Empleado (opcional)',
            },
            { name: 'name', type: 'text', label: 'Nombre' },
            { name: 'email', type: 'email', label: 'Email' },
          ],
        },
      ],
    },
  ],
}
