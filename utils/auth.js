import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

const getQueryParams = () => {
  const params = {};
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3;
  });
  return params;
};

export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const {id_token, access_token, state} = getQueryParams();

  return { idToken: id_token, secret: state, accessToken: access_token };
};

export const setToken = (idToken, accessToken) => {
  if (!process.browser) {
    return;
  }

  Cookie.set('idToken', idToken);
  Cookie.set('accessToken', accessToken);
  Cookie.set('user', jwtDecode(idToken));
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }

  Cookie.remove('idToken');
  Cookie.remove('accessToken');
  Cookie.remove('user');
  Cookie.remove('secret');

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
};

export const getUserFromServerCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('idToken='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwtDecode(jwt);
};

export const getUserFromLocalCookie = () => {
  return Cookie.getJSON('user');
};

export const setSecret = (secret) => Cookie.set('secret', secret);

export const checkSecret = (secret) => Cookie.get('secret') === secret;
