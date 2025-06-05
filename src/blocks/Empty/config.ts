import type { Block } from 'payload'

export const Empty: Block = {
  slug: 'empty',
  interfaceName: 'EmptyBlock',
  fields: [],
  labels: {
    plural: 'Empties',
    singular: 'Empty',
  },
}
