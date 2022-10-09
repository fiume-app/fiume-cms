import { buildConfig } from 'payload/config';
import path from 'path';
import Admins from './collections/Admins';
import Resources from './collections/Resources';
import AccessControlPolicies from './collections/AccessControlPolicies';
import Buyers from './collections/Buyers';
import Addresses from './collections/Addresses';
import Products from './collections/Products';
import Patterns from './collections/Patterns';
import Inventory from './collections/Inventory';
import Orders from './collections/Orders';
import ProductPhotos from './collections/ProductPhotos';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Admins.slug,
  },
  collections: [
    Admins,
    AccessControlPolicies,
    Resources,
    //Sellers,
    //Kyc,
    Buyers,
    Addresses,
    Products,
    ProductPhotos,
    Patterns,
    Inventory,
    Orders,
    // Add Collections here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
