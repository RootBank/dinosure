import React from 'react';
import Router from 'next/router';

export default class extends React.Component {
  componentDidMount () {
    Router.push('/checkout/profile/name');
  }
  render () { return null; }
}
