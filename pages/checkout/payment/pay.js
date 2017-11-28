import page from '../../../components/page';
import React from 'react';
import applicationStore from '../../../datastores/application';
import quoteStore from '../../../datastores/quote';
import axios from 'axios';

export default page(class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount () {
    this.setState({ loading: true });
    const { id, firstName, lastName, email } = this.props.application;
    const { quotePackageId } = this.props.quote.result;
    const applicationBody = { id, firstName, lastName, email, quotePackageId };
    try {
      let policy = this.props.application.policyId;
      if (!policy) {
        const { policyId } = (await axios.post('/api/apply', applicationBody)).data;
        policy = policyId;
        applicationStore.update(state => ({ ...state, policyId }));
      }
      const scriptUrl = `/api/card-payment.js?policyId=${policy}`;
      const script = window.document.createElement('script');
      script.async = true;
      script.src = scriptUrl;
      document.body.appendChild(script);
      this.setState({ loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  get formattedPremium () {
    if (this.props.quote.result) {
      const amount = this.props.quote.result.premium;
      return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
    } else {
      return '';
    }
  }

  get formattedSumAssured () {
    const amount = this.props.quote.sumAssured;
    return Number(amount).toLocaleString().replace(/,/g, ' ');
  }

  /*
  get changeLoadingText () {
    setInterval((value) => {
      const loadingText = value;
    }, 1000);
    switch (i) {
      case 0:
        'Fetching rollerblades...'
        break;
      case 1:
        'Fetching rollerblades...'
        break;
      case 2:
        'Fetching rollerblades...'
        break;
      default: 'Creating Application'
    }
  }
  */

  render () {
    return (
      <section className='section'>
        <div className={`pageloader ${this.state.loading ? 'is-active' : ''}`}><span className='title'>Creating application...</span></div>
        <div className='container content'>
          <div className='columns'>
            <div className='column' />
            <div className='column'>
              <div id='root-credit-card-form' data-redirect-url={`${this.props.origin}/policy-issued`} />
            </div>
            <div className='column' />
          </div>
        </div>
      </section>
    );
  }
}, {
  datastores: { quote: quoteStore, application: applicationStore },
  getInitialProps: (ctx) => ({
    origin: process.browser ? window.location.origin : (`${ctx.req.headers.referer.replace(ctx.req.url, '')}`)
  })
});
