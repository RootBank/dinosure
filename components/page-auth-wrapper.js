import React from 'react';
import * as Utils from '../utils/auth';
import Router from 'next/router';
import isBefore from 'date-fns/fp/isBefore';
// This components wraps pages and handles parsing of authorization tokens
// The parsed tokens are parsed to the provided page as part of its props
export default Page => class extends React.Component {
  static getInitialProps (ctx) {
    const user = process.browser ? Utils.getUserFromLocalCookie() : Utils.getUserFromServerCookie(ctx.req);
    const authToken = process.browser ? Utils.getAuthTokenFromLocalCookie() : Utils.getAuthTokenFromServerCookie(ctx.req);
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
    const isBeforeExpiry = !!user && isBefore(new Date((user.exp || 0) * 1000));

    return {
      ...pageProps,
      user,
      currentUrl: ctx.pathname,
      isAuthenticated: !!user && isBeforeExpiry(new Date()),
      authToken
    };
  }

  constructor (props) {
    super(props);
    this.state = this.props;
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {
    const user = Utils.getUserFromLocalCookie();
    const authToken = Utils.getAuthTokenFromLocalCookie();
    const isBeforeExpiry = !!user && isBefore(new Date((user.exp || 0) * 1000));
    this.setState({ user, isAuthenticated: !!user && isBeforeExpiry(new Date()), authToken });
    window.addEventListener('storage', this.logout, false);
  }

  logout (eve) {
    if (eve.key === 'logout') {
      Router.replace(`./`);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.logout, false);
  }

  render () {
    return (<Page {...this.props} {...this.state} />);
  }
};
