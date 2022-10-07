import { CollectionConfig } from "payload/types";

const ProductPhotos: CollectionConfig = {
  slug: 'product_photos',
  labels: {
    singular: 'Product Photo',
    plural: 'Product Photos',
  },
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
    imageSizes: [
      {
        name: 'small',
        width: 100,
        crop: 'center',
      },
      {
        name: 'medium',
        width: 500,
        crop: 'center',
      },
      {
        name: 'large',
        width: 1100,
        crop: 'center',
      },
      {
        name: 'xlarge',
        width: 2100,
        crop: 'center',
      },
    ],
    adminThumbnail: 'medium',
    mimeTypes: ['image/*'],
  },
  fields: [],
};

export default ProductPhotos;
