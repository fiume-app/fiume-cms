import { CollectionConfig } from "payload/types";

const Kyc: CollectionConfig = {
  slug: 'kyc',
  labels: {
    singular: 'KYC',
    plural: 'KYC',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator' || role === 'moderator') {
        return true;
      }

      return false;
    },
    update: ({ req: { user } }) => {
      const role = user.role ?? '';
    
      if (role === 'administrator' || role === 'moderator') {
        return true;
      }

      return false;
    },
    delete: () => false,
  },
  fields: [
    {
      type: 'relationship',
      name: 'seller_id',
      label: 'Seller',
      hasMany: false,
      relationTo: 'sellers',
      required: true,
    },
    {
      type: 'group',
      name: 'identification_data',
      label: 'Identification Data',
      fields: [
        {
          type: 'text',
          name: 'aadhaar_number',
          label: 'Aadhaar Number',
          required: true,
        },
        {
          type: 'checkbox',
          name: 'aadhaar_verified',
          label: 'Aadhaar Verified',
          required: true,
        },
        {
          type: 'text',
          name: 'pan_number',
          label: 'Pan Number',
          required: true,
        },
        {
          type: 'checkbox',
          name: 'pan_verified',
          label: 'Pan Verified',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'bank_data',
      label: 'Bank Data',
      fields: [
        {
          type: 'text',
          name: 'ifsc_code',
          label: 'IFSC Code',
          required: true,
        },
        {
          type: 'text',
          name: 'account_number',
          label: 'Accoount Number',
          required: true,
        },
        {
          type: 'checkbox',
          name: 'verified',
          label: 'Verified',
          required: true,
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'approved',
      label: 'Approved',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'approved_by',
      label: 'Approved By',
      hasMany: false,
      relationTo: 'admins',
      admin: {
        position: 'sidebar',
      },
      required: true,
      filterOptions: ({ user }) => {
        return {
          '_id': {
            equals: user.id,
          }
        }
      },
    },
  ],
};

export default Kyc;
