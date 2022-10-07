import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders',
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
    /*delete: ({ req: { user } }) => {
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
    },*/
  },
  fields: [
    {
      name: 'buyer_id',
      type: 'relationship',
      label: 'Buyer',
      relationTo: 'buyers',
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
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Confirmed',
          value: 'confirmed',
        },
        {
          label: 'Placed',
          value: 'placed',
        },
        {
          label: 'Shipped',
          value: 'shipped',
        },
        {
          label: 'Out For Delivery',
          value: 'out_for_delivery',
        },
        {
          label: 'Delivered',
          value: 'delivered',
        },
        {
          label: 'Returned',
          value: 'returned',
        },
      ],
      required: true,
    },
    {
      type: 'text',
      name: 'payment_gateway',
      label: 'Payment Gateway',
      required: true,
    },
    {
      type: 'select',
      name: 'payment_status',
      label: 'Payment Status',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Paid',
          value: 'paid',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
      ],
      required: true,
    },
    {
      type: 'group',
      name: 'gateway_details',
      label: 'Gateway Details',
      fields: [
        {
          type: 'text',
          name: 'payment_id',
          label: 'Payment Id',
        },
        {
          type: 'text',
          name: 'order_id',
          label: 'Order Id',
        },
      ],
    },
  ],
};

export default Orders;
