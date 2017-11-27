require('dotenv').config();
const ManagementClient = require('auth0').ManagementClient;
const auth0config = require('./config.json');

const auth0 = new ManagementClient({
  domain: auth0config.AUTH0_CLIENT_DOMAIN,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  scope: 'read:users_app_metadata update:users_app_metadata create:users_app_metadata'
});

auth0.updateAppMetadata({'id': 'facebook|10155244300288178'}, {policyholder_id: '803d258f-b515-48c6-98b6-fbafac0f3873'}).then(console.log).catch(console.error);
