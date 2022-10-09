import { CollectionConfig } from "payload/types";
import afterDelete from "./hooks/afterDelete";
import beforeChange from "./hooks/beforeChange";

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
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    adminThumbnail: ({ doc }) => {
      return `https://fiume-product-photos.s3.ap-south-1.amazonaws.com/${doc.filename}`;
    },
  },
  fields: [],
  hooks: {
    beforeChange: [
      beforeChange,
    ],
    afterDelete: [
      afterDelete,
    ]
  }
};

export default ProductPhotos;