import React from 'react';
import { getUserFromLocalCookie, getUserFromServerCookie } from '../utils/auth';
import Router from 'next/router';

// This components wraps pages and handles parsing of authorization tokens
// The parsed tokens are parsed to the provided page as part of its props
export default Page => class extends React.Component {
  static getInitialProps (ctx) {
    const user = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx.req);
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
    return {
      ...pageProps,
      user,
      currentUrl: ctx.pathname,
      isAuthenticated: !!user
    };
  }

  constructor (props) {
    super(props);
    this.state = this.props;
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {
    const user = getUserFromLocalCookie();
    this.setState({ user, isAuthenticated: !!user });
    window.addEventListener('storage', this.logout, false);
  }

  logout (eve) {
    if (eve.key === 'logout') {
      Router.push(`/?logout=${eve.newValue}`);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.logout, false);
  }

  render () {
    return (<Page {...this.props} {...this.state} />);
  }
};
