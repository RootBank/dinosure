import Footer from './footer';
import React from 'react';
import authWrapper from './page-auth-wrapper';
import Navbar from './navbar';
export default (Page, { footer: AuxiliaryFooter, getInitialProps } = {}) => authWrapper(class extends React.Component {
  static getInitialProps (ctx) {
    const pageProps = (getInitialProps && getInitialProps(ctx)) || {};
    return { ...pageProps };
  }

  render () {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Navbar user={this.props.user} isAuthenticated={this.props.isAuthenticated} currentPage={process.browser ? window.location.pathname : ''} />
          <Page {...this.props} />
        </div>
        <div>
          { !!AuxiliaryFooter && <AuxiliaryFooter {...this.pageProps} /> }
          <Footer />
        </div>
      </div>
    );
  }
});
