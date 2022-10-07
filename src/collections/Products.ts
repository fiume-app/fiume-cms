import { CollectionConfig } from "payload/types";

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Product',
    plural: 'Products'
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
      label: 'Name',
      maxLength: 128,
      required: true,
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      required: true,
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
      type: 'array',
      name: 'differentiator',
      labels: {
        plural: 'Differentiators',
        singular: 'Differentiator',
      },
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          type: 'text',
          name: 'key',
          required: true,
        },
        {
          type: 'checkbox',
          name: 'header_leading_enabled',
          label: 'Header Leading Enabled',
          required: true,
        },
        {
          type: 'select',
          name: 'header_leading_type',
          label: 'Header Leading Type',
          hasMany: false,
          options: [
            {
              label: 'Icon',
              value: 'icon',
            },
          ],
        },
        {
          type: 'text',
          name: 'header_leading_content',
          label: 'Header Leading Content',
        },
        {
          type: 'text',
          name: 'header_title',
          label: 'Header Title',
        },
        {
          type: 'checkbox',
          name: 'header_trailing_enabled',
          label: 'Header Trailing Enabled',
          required: true,
        },
        {
          type: 'select',
          name: 'header_trailing_type',
          label: 'Header Trailing Type',
          hasMany: false,
          options: [
            {
              label: 'Link',
              value: 'link',
            },
          ],
        },
        {
          type: 'text',
          name: 'header_trailing_content',
          label: 'Header Trailing Content',
        },
        {
          type: 'select',
          name: 'selector_type',
          label: 'Selector Type',
          hasMany: false,
          options: [
            {
              label: 'Image',
              value: 'image',
            },
            {
              label: 'Text',
              value: 'text',
            },
          ],
        },
        {
          type: 'select',
          name: 'selector_shape',
          label: 'Selector Shape',
          hasMany: false,
          options: [
            {
              label: 'Circle',
              value: 'circle',
            },
            {
              label: 'Rectangle',
              value: 'rectangle',
            },
            {
              label: 'Square',
              value: 'square',
            },
            {
              label: 'Rounded Rectangle',
              value: 'rounded_rectangle'
            },
          ],
        },
      ],
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

export default Products;
