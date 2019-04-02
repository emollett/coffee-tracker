const dotenv = require('dotenv');

dotenv.config();

export const AUTH_CONFIG = {
  domain: 'coffee-tracker.eu.auth0.com',
  clientId: 'Dn61gamMNP0DhK5410emcTc4BholdXGc',
  callbackUrl: process.env.REACT_APP_AUTH_CALLBACK
}
