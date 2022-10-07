import { CollectionConfig } from "payload/types";

const Patterns: CollectionConfig = {
  slug: 'patterns',
  labels: {
    singular: 'Pattern',
    plural: 'Patterns',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator') {
        return true;
      }

      let allow = false;

      const acl: any[] = user.acl;

      acl.forEach((v) => {
        if (v.resource.name === 'Seller' && v.access_level.create) {
          allow = true;
        }
      })

      return allow;
    },
    update: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator' || role === 'moderator') {
        return true;
      }

      let allow = false;

      const acl: any[] = user.acl;

      acl.forEach((v) => {
        if (v.resource.name === 'Seller' && v.access_level.update) {
          allow = true;
        }
      })

      return allow;
    },
    delete: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator') {
        return true;
      }

      let allow = false;

      const acl: any[] = user.acl;

      acl.forEach((v) => {
        if (v.resource.name === 'Seller' && v.access_level.delete) {
          allow = true;
        }
      })

      return allow;
    },
  },
  fields: [
    {
      name: 'product_id',
      type: 'relationship',
      label: 'Product',
      relationTo: 'products',
      required: true,
      hasMany: false,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'details',
      type: 'array',
      minRows: 0,
      maxRows: 10,
      labels: {
        singular: 'Detail',
        plural: 'Details',
      },
      fields: [
        {
          type: 'text',
          name: 'key',
        },
        {
          type: 'text',
          name: 'value',
        },
      ],
    },
    {
      type: 'number',
      name: 'min_purchasable',
      label: 'Min Purchasable',
      required: true,
    },
    {
      type: 'number',
      name: 'max_purchasable',
      label: 'Max Purchasable',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      minRows: 0,
      maxRows: 10,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'product_photos'
        },
      ],
    },
    {
      type: 'number',
      name: 'price',
      label: 'Price',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'purchasable',
      label: 'Purchasable',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'checkbox',
      name: 'quarantined',
      label: 'Quarantined',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'checkbox',
      name: 'banned',
      label: 'Banned',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Patterns;
