import Footer from './footer';
import React from 'react';
import authWrapper from './page-auth-wrapper';
import Navbar from './navbar';

export default (Page, { footer: AuxiliaryFooter, getInitialProps, datastores = {} } = { }) => authWrapper(class extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      ...Object.keys(datastores)
          .reduce((prev, key) => ({ ...prev, [key]: datastores[key].state }), {})
    };
  }

  static getInitialProps (ctx) {
    const pageProps = (getInitialProps && getInitialProps(ctx)) || {};
    if (!process.browser) {
      const currentPage = ctx.req.url;
      this.state = { currentPage };
    }
    return { ...pageProps };
  }

  componentDidMount () {
    this.subscriptions = Object.keys(datastores).map(store =>
      datastores[store].subscribe(x => this.setState({ [store]: x }))
    );
    this.setState({ currentPage: window.location.pathname });
  }
  componentWillUnmount () {
    Object.keys(datastores).forEach((key, index) => {
      datastores[key].unsubscribe(this.subscriptions[index]);
    });
  }

  render () {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Navbar user={this.props.user} isAuthenticated={this.props.isAuthenticated} currentPage={this.state.currentPage} />
          <Page {...this.props} {...this.state} />
        </div>
        <div>
          {!!AuxiliaryFooter && <AuxiliaryFooter {...this.props} {...this.state} />}
          <Footer />
        </div>
      </div>
    );
  }
});
