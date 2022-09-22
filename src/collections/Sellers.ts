import { CollectionConfig } from "payload/types";

const Sellers: CollectionConfig = {
  slug: 'sellers',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Seller',
    plural: 'Sellers',
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
      type: 'text',
      name: 'name',
      maxLength: 128,
      required: true,
    },
    {
      type: 'email',
      name: 'public_email',
      label: 'Public Email',
      required: true,
    },
    {
      type: 'email',
      name: 'private_email',
      label: 'Private Email',
      required: true,
    },
    {
      type: 'text',
      name: 'public_contact',
      label: 'Public Contact',
      required: true,
    },
    {
      type: 'text',
      name: 'private_contact',
      label: 'Private Contact',
      required: true,
    },
    {
      type: 'email',
      name: 'representative_email',
      label: 'Representative Email',
      required: true,
    },
    {
      type: 'email',
      name: 'billing_email',
      label: 'Billing Email',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'approved',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'checkbox',
      name: 'quarantined',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'checkbox',
      name: 'banned',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'onboarded_by',
      label: 'Onboarded By',
      required: true,
      hasMany: false,
      relationTo: 'admins',
      filterOptions: ({ user }) => {
        return {
          '_id': {
            equals: user.id,
          }
        }
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Sellers;
