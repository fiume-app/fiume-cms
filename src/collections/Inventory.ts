import { CollectionConfig } from "payload/types";

const Inventory: CollectionConfig = {
  slug: 'inventory',
  labels: {
    singular: 'Inventory',
    plural: 'Inventory',
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
      name: 'pattern_id',
      type: 'relationship',
      label: 'Pattern',
      relationTo: 'patterns',
      required: true,
      hasMany: false,
    },
    {
      name: 'notes',
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
      type: 'select',
      name: 'status',
      options: [
        {
          label: 'Sold',
          value: 'sold',
        },
        {
          label: 'Ordered',
          value: 'ordered',
        },
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Returned',
          value: 'returned',
        },
      ],
      required: true,
    },
    {
      name: 'order_id',
      type: 'relationship',
      label: 'Order',
      relationTo: 'orders',
      required: false,
      hasMany: false,
    },
    {
      name: 'purchasable',
      type: 'checkbox',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Inventory;
