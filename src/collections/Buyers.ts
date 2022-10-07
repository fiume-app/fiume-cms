import { CollectionConfig } from "payload/types";

const Buyers: CollectionConfig = {
  slug: 'buyers',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Buyer',
    plural: 'Buyers',
  },
  access: {
    create: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator') {
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
    read: () => true,
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
      name: 'email',
      label: 'Email',
      required: true,
    },
    {
      type: 'text',
      name: 'contact',
      label: 'Contact',
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
  ],
};

export default Buyers;
