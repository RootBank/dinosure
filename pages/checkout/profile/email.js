// import FormFooter from '../../components/form-progress';
import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import quoteStore from '../../../datastores/quote';
import applicationStore from '../../../datastores/application';
import Steps from '../../../components/checkout-steps';

const setEmail = (event) => {
  applicationStore.update(state => ({ ...state, email: event.target.value }));
};

export default page(class extends React.Component {
  render () {
    const application = this.props.application;
    return <section className='section'>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <div className='title is-3'>My email address is</div>
          <div className='columns is-mobile'>
            <div className='column' />
            <div style={{margin: '0.6em'}} className='column'>
              <input style={{ width: '24rem', textAlign: 'center' }} onChange={setEmail} className='input title column is-medium' type='email' placeholder='Email' value={application.email || ''} />
            </div>
            <div className='column' />
          </div>
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
            <Link href='/checkout/profile/id'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/checkout/questions'><button className='button is-primary' disabled={!application.email || application.email.indexOf('@') === -1 || (application.email.indexOf('@') === application.email.length - 1)}>Next</button></Link>
          </div>
        </div>
      </section>
      <section className='section'>
        <Steps currentStep={0} />
      </section>
    </div>,
  datastores: { quote: quoteStore, application: applicationStore }
});
