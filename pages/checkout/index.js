import React from 'react';
import Router from 'next/router';
import applicationStore from '../../datastores/application';

export default class extends React.Component {
  componentDidMount () {
    applicationStore.update(state => ({ ...state, started: true }));
    Router.push('/checkout/profile/name');
  }
  render () { return null; }
}
