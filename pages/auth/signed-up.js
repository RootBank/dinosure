import React from 'react';
import page from '../../components/page';
import Router from 'next/router';
import axios from 'axios';
import { setToken, checkSecret, extractInfoFromHash } from '../../utils/auth';

export default page(class extends React.Component {
  async componentDidMount () {
    const {idToken, accessToken, secret} = extractInfoFromHash();

    if (!checkSecret(secret) || !idToken) {
      console.error('Something happened with the Sign Up request');
    } else {
      const search = window.location.search.replace('?', '');
      const token = search.split('&').map(x => x.split('=')).find(([key, _]) => key === 'id')[1];
      setToken(idToken, accessToken);
      await axios.post('/api/user/signed-up', { token }, {
        headers: { 'Authorization': 'Bearer ' + idToken }
      });
      Router.replace('/my-account');
    }
  }
  render () {
    return null;
  }
});
