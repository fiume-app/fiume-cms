import { buildConfig } from 'payload/config';
import path from 'path';
import Admins from './collections/Admins';
import Resources from './collections/Resources';
import AccessControlPolicies from './collections/AccessControlPolicies';
import Sellers from './collections/Sellers';
import Kyc from './collections/Kyc';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Admins.slug,
  },
  collections: [
    Admins,
    AccessControlPolicies,
    Resources,
    Sellers,
    Kyc,
    // Add Collections here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
