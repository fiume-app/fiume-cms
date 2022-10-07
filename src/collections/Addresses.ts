import { CollectionConfig } from "payload/types";

const Addresses: CollectionConfig = {
  slug: 'addresses',
  labels: {
    singular: 'Address',
    plural: 'Addresses',
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
      type: 'relationship',
      name: 'buyer_id',
      label: 'Buyer',
      hasMany: false,
      relationTo: 'buyers',
      required: true,
    },
    {
      type: 'textarea',
      name: 'line1',
      label: 'Line 1',
    },
    {
      type: 'textarea',
      name: 'line2',
      label: 'Line 2',
    },
    {
      type: 'text',
      name: 'city',
      label: 'City',
    },
    {
      type: 'text',
      name: 'state',
      label: 'State',
    },
    {
      type: 'text',
      name: 'pin_code',
      label: 'Pin Code',
    },
  ],
};

export default Addresses;
