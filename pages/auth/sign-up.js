import React from 'react';
import { show } from '../../utils/lock';
import page from '../../components/page';
const CONTAINER_ID = 'put-signup-container-here';

class SignUp extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      haveToken: false,
      token: null
    };
  }

  getParameterByName (name, url) {
    // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  componentWillMount () {
    if (!process.browser) {
      return;
    }
    let token = this.getParameterByName('id');
    if (!token) {
      return;
    }

    this.setState({ haveToken: true, token: token });
  }

  componentDidMount () {
    if (!process.browser) {
      return;
    }

    if (this.state.haveToken) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      let auth0Options = {
        allowLogin: false,
        languageDictionary: { title: 'Sign Up' },
        auth: {
          redirectUrl: `${baseUrl}/auth/signed-up?id=${this.state.token}`
        }
      };
      show(CONTAINER_ID, auth0Options);
    }
  }

  render () {
    if (!this.state.haveToken) {
      return <section className='section' >
        <div className='container content'>
          <h1 className='title'>Oh No!</h1>
          <p>
            Something went wrong. Please follow the link contained in the welcome email.
          </p>
        </div>
      </section>;
    }

    return (<div id={CONTAINER_ID} />);
  }
}

export default page(SignUp, {
  getInitialProps: (ctx) => {
    if (process.browser) {

    } else {
      console.log(ctx.req.query);
    }
  }
});
