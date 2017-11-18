import { setSecret } from './auth';

import uuid from 'uuid';

const getLock = (options) => {
  const config = require('../config.json');
  const Auth0Lock = require('auth0-lock').default;
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, options);
};

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const getOptions = (container, options = {}) => {
  const secret = uuid.v4();
  setSecret(secret);
  return {
    container,
    closable: false,
    theme: {
      logo: ''
    },
    languageDictionary: {
      title: ''
    },
    auth: {
      responseType: 'token',
      redirectUrl: `${getBaseUrl()}/logged-in`,
      params: {
        scope: 'openid profile email',
        state: secret
      }
    },
    ...options
  };
};

export const show = (container, options) => getLock(getOptions(container, options)).show();
export const logout = () => getLock().logout({ returnTo: getBaseUrl() });
