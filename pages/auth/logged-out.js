import React from 'react';
import Router from 'next/router';

export default class extends React.Component {
  componentDidMount () {
    Router.replace('/');
  }
  render () {
    return null;
  }
}
