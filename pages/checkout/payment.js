// import FormFooter from '../../components/form-progress';
import page from '../../components/page';
// import Link from 'next/link';
import React from 'react';
import applicationStore from '../../datastores/application';
import Steps from '../../components/checkout-steps';

const toggleAccepted = () =>
  applicationStore.update(({accepted = false, ...state}) => ({...state, accepted: !accepted}));

const Tickbox = ({application: {accepted, firstName, lastName, id}}) =>
  <section className='section'>
    <div className='container content'>
      I {firstName} {lastName} (Id number {id}), confirm that:
      <ul>
        <li>The information in this application is true and correct; and</li>
        <li>I am aware of no other information which might be relevant to Guardrisk Life Limited’s decision to offer me cover; and</li>
        <li>I confirm the questions and answers relating to my health as true and correct and I agree to abide by the terms set out in the policy document; and</li>
        <li>I consent to the exchange of any information between Guardrisk Life Limited and any medical or other institution/Doctor which consent continues even after my death.</li>
      </ul>
      <div className='field'>
        <input onClick={toggleAccepted} className='is-checkradio is-primary' id='i-accept' type='checkbox' name='i-accept' checked={accepted ? 'checked' : ''} />
        <label htmlFor='i-accept'>By ticking this box I confirm all of the above.</label>
      </div>
    </div>
  </section>;

export default page(class extends React.Component {
  render () {
    return <Tickbox application={this.props.application} />;
  }
}, {
  footer: () =>
    <section className='section'>
      <Steps currentStep={2} />
    </section>,
  datastores: { application: applicationStore }
});
