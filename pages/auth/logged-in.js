import React from 'react';
import Router from 'next/router';

import { setToken, checkSecret, extractInfoFromHash } from '../../utils/auth';

export default class extends React.Component {
  componentDidMount () {
    const {idToken, accessToken, secret} = extractInfoFromHash();
    if (!checkSecret(secret) || !idToken) {
      console.error('Something happened with the Sign In request');
    } else {
      setToken(idToken, accessToken);
      Router.replace('/my-account');
    }
  }
  render () {
    return null;
  }
}
