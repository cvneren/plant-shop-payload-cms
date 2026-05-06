import type { CollectionConfig } from 'payload'
import { revalidateProducts, revalidateProductsDelete } from '../hooks/revalidateProducts.ts'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'stock'],
  },
  hooks: {
    afterChange: [revalidateProducts],
    afterDelete: [revalidateProductsDelete],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'lightLevel',
      type: 'select',
      options: [
        { label: 'Low', value: 'Low' },
        { label: 'Bright Indirect', value: 'Bright Indirect' },
        { label: 'Direct', value: 'Direct' },
      ],
      required: true,
    },
    {
      name: 'petFriendly',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'careInstructions',
      type: 'textarea',
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
