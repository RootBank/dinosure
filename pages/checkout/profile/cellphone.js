/* eslint-disable new-cap */
// import FormFooter from '../../components/form-progress';
import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import quoteStore from '../../../datastores/quote';
import applicationStore from '../../../datastores/application';
import Steps from '../../../components/checkout-steps';
import { asYouType, isValidNumber, parse } from 'libphonenumber-js';

const setPhoneNumber = (event) => {
  const cellphone = new asYouType('ZA').input(event.target.value);
  applicationStore.update(state => ({ ...state, cellphone }));
};

const isCellphoneNumberValid = (value) =>
  isValidNumber(parse(value, 'ZA'));

export default page(class extends React.Component {
  render () {
    const application = this.props.application;
    return <section className='section'>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <h3 className='title is-3'>My cellphone number is</h3>
          <div className='columns'>
            <div className='column' />
            <div style={{margin: '0.6em'}} className='column'>
              <input style={{ width: '24rem', textAlign: 'center' }} onChange={setPhoneNumber} className='input title column is-medium' type='text' placeholder='' value={application.cellphone} />
            </div>
            <div className='column' />
          </div>
        </div>
        <div className='column' />
      </div>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <p>This number will be used for official communication only.</p>
        </div>
        <div className='column' />
      </div>
    </section>;
  }
}, {
  footer: ({application}) =>
    <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/checkout/profile/email'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/checkout/questions'><button className='button is-primary' disabled={!isCellphoneNumberValid(application.cellphone)}>Next</button></Link>
          </div>
        </div>
      </section>
      <section className='section'>
        <Steps currentStep={0} />
      </section>
    </div>,
  datastores: { quote: quoteStore, application: applicationStore }
});
