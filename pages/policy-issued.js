import page from '../components/page';
import React from 'react';
import applicationStore from '../datastores/application';
import quoteStore from '../datastores/quote';

function getParameterByName (name, url) {
  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  if (!url) url = window.location.href;
  name = name.replace(/[[]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default page(class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { render: false };
  }
  componentDidMount () {
    const successful = getParameterByName('successful') === 'true';
    this.setState({ successful, render: true });
    if (successful) {
      applicationStore.clear();
      quoteStore.clear();
    }
  }

  render () {
    if (!this.state.render) {
      return null;
    }

    if (this.state.successful) {
      return <section className='section'>
        <div className='container content'>
          <h1 className='title is-3'>Hooray!</h1>
          <p> You've just been issued a new dinosure policy!
              Please check your email: it contains your policy documents, along with
              instructions on how to minimise your risk of a dinosaur attack.
          </p>
        </div>
      </section>;
    }

    return <section className='section'>
      <div className='container content'>
        <h1 className='title is-3'>Oh no!</h1>
        <p>Something went wrong while processing your payment.</p>
        <a class='wpwl-button wpwl-button-pay' style={{textDecoration: 'none'}} href='/checkout/payment/pay'>Try again</a>
      </div>
    </section>;
  }
});
