// import FormFooter from '../../components/form-progress';
import page from '../../components/page';
// import Link from 'next/link';
import React from 'react';
import quoteStore from '../../datastores/quote';
import applicationStore from '../../datastores/application';
import Steps from '../../components/checkout-steps';

const Tickbox = ({ firstName = '', lastName = '', id = '' }) =>
  // Checking if the firstName is set prevents the page from flashing 
  // if the data has not been loaded yet.
  firstName && <section className='section'>
    <div className='container content'>
      I {firstName} {lastName} (Id number {id}), confirm that:
      <ul>
        <li>The information in this application is true and correct; and</li>
        <li>I am aware of no other information which might be relevant to Guardrisk Life Limited’s decision to offer me cover; and</li>
        <li>I confirm the questions and answers relating to my health as true and correct and I agree to abide by the terms set out in the policy document; and</li>
        <li>I consent to the exchange of any information between Guardrisk Life Limited and any medical or other institution/Doctor which consent continues even after my death.</li>
      </ul>
      <div className='field'>
        <input className='is-checkradio is-info' type='checkbox' id='termsAndConditionsCheckbox' name='termsAndConditionsCheckbox' />
        <label htmlFor='termsAndConditionsCheckbox'>By ticking this box I confirm all of the above.</label>
      </div>
    </div>
  </section>;

export default page(class extends React.Component {
  render() {
    const application = this.props.application;
    return <Tickbox {...application} />;
  }
}, {
    footer: () =>
      <section className='section'>
        <Steps currentStep={2} />
      </section>,
    datastores: { quote: quoteStore, application: applicationStore }
  });
