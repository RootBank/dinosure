// import FormFooter from '../../components/form-progress';
// import Link from 'next/link';
import React from 'react';
import Router from 'next/router';

export default class extends React.Component {
  componentDidMount () {
    Router.replace('/checkout/questions/island');
  }

  render () { return null; }
}
