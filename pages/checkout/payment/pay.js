import page from '../../../components/page';
import React from 'react';
import applicationStore from '../../../datastores/application';
import quoteStore from '../../../datastores/quote';
import axios from 'axios';

export default page(class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, loaderText: 'Creating Application', error: false };
  }

  async retry() {
    const origin = window.location.origin;
    this.setState({ loading: true, origin, error: false });
    const { id, firstName, lastName, email, cellphone } = this.props.application;
    const { quotePackageId } = this.props.quote.result;
    const applicationBody = { id, firstName, lastName, email, quotePackageId, cellphone };
    try {
      let policy = this.props.application.policyId;
      if (!policy) {
        const { policyId } = (await axios.post('/api/apply', applicationBody)).data;
        policy = policyId;
        applicationStore.update(state => ({ ...state, policyId }));        
      }
      this.setState({ loaderText: 'Loading Payment' });
      const scriptUrl = `/api/card-payment.js?policyId=${policy}`;
      const script = window.document.createElement('script');
      script.async = true;
      script.src = scriptUrl;
      document.body.appendChild(script);

      window.wpwlOptions = {
        onLoaded: () => {
          console.log('onload');

          this.setState({ loading: false });
        }
      };
    } catch (e) {
      let errorMessage = null;
      if(e.response && e.response.data && e.response.data.error) {
        errorMessage = e.response.data.error;
      }
      this.setState({ loading: false, error: true, errorMessage });
    }
  }

  async componentDidMount() {
    this.retry();
  }

  get formattedPremium() {
    if (this.props.quote.result) {
      const amount = this.props.quote.result.premium;
      return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
    } else {
      return '';
    }
  }

  get formattedSumAssured() {
    const amount = this.props.quote.sumAssured;
    return Number(amount).toLocaleString().replace(/,/g, ' ');
  }

  render() {
    return (
      <section className='section'>
        <div className={`pageloader ${this.state.loading ? 'is-active' : ''}`}><span className='title'>{this.state.loaderText}</span></div>
        {this.state.error && <div className='container content'>
          <h1 className='title is-3'>Oh no!</h1>
          <p>Something went wrong while creating your application</p>
          {this.state.errorMessage && <p><pre>{this.state.errorMessage}</pre></p>}
          <a className='wpwl-button wpwl-button-pay' style={{ textDecoration: 'none' }} onClick={this.retry.bind(this)}>Try again</a>
        </div>}
        {!this.state.error && <div className='container content'>
          <div className='columns'>
            <div className='column' />
            <div className='column'>
              <div id='root-credit-card-form' data-redirect-url={`${this.state.origin}/policy-issued`} />
            </div>
            <div className='column' />
          </div>
        </div>}
      </section>
    );
  }
}, {
    datastores: { quote: quoteStore, application: applicationStore }
  });
