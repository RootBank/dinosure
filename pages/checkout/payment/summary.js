import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import applicationStore from '../../../datastores/application';
import quoteStore from '../../../datastores/quote';
import Steps from '../../../components/checkout-steps';

export default page(class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { accepted: false };
  }

  get formattedPremium () {
    if (this.props.quote.result) {
      const amount = this.props.quote.result.premium;
      return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
    } else {
      return '';
    }
  }

  toggleAccepted () {
    this.setState({ accepted: !this.state.accepted });
  }

  get formattedSumAssured () {
    const amount = this.props.quote.sumAssured;
    return Number(amount).toLocaleString().replace(/,/g, ' ');
  }

  render () {
    const { firstName, lastName, id } = this.props.application;
    return (
      <section className='section'>
        <div className='container content'>
          <div className='columns is-reversed-mobile'>
            <div className='pricing-table column'>
              <div style={{ marginTop: 0 }} className='pricing-plan is-primary'>
                <div className='plan-header'>R {this.formattedSumAssured} cover</div>
                <div className='plan-price'><span className='plan-price-amount'><span className='plan-price-currency'>R</span>{this.formattedPremium}</span>/month</div>
                <div className='plan-items'>
                  <div className='plan-item'>Early Warning Network</div>
                  <div className='plan-item'>Extraction Team</div>
                  <div className='plan-item'>Security Consultants</div>
                  <div className='plan-item'>24 Hour Support</div>
                </div>
                <div className='plan-footer'>
                  <Link prefetch href='/checkout/payment/pay'>
                    <a>
                      <button className='button is-fullwidth' disabled={!this.state.accepted}>
                        <span className='icon'><i className='fa fa-lock' /></span>&nbsp; Pay
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }} className='column content is-two-thirds'>
              <div className='container content'>
                <h1 className='title is-3'>Application Summary</h1>
                <h2 className='subtitle is-5'>accept the terms and conditions to continue</h2>
                I {firstName} {lastName} (ID Number {id}), confirm that:
                <ul>
                  <li>The information in this application is true and correct; and</li>
                  <li>I am aware of no other information which might be relevant to Guardrisk Life Limited’s decision to offer me cover; and</li>
                  <li>I confirm the questions and answers relating to my health as true and correct and I agree to abide by the terms set out in the policy document; and</li>
                  <li>I consent to the exchange of any information between Guardrisk Life Limited and any medical or other institution/Doctor which consent continues even after my death.</li>
                </ul>
                <div className='field'>
                  <input onClick={this.toggleAccepted.bind(this)} className='is-checkradio is-primary' id='i-accept' type='checkbox' name='i-accept' checked={this.state.accepted ? 'checked' : ''} />
                  <label htmlFor='i-accept'>By ticking this box I confirm all of the above.</label>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
    );
  }
}, {
  footer: () =>
    <section className='section'>
      <Steps currentStep={2} />
    </section>,
  datastores: { quote: quoteStore, application: applicationStore }
}
);
