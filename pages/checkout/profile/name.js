// import FormFooter from '../../components/form-progress';
import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import quoteStore from '../../../datastores/quote';
import applicationStore from '../../../datastores/application';
import Steps from '../../../components/checkout-steps';

const setFirstName = (event) => {
  applicationStore.update(state => ({ ...state, firstName: event.target.value }));
};
const setLastName = (event) => {
  applicationStore.update(state => ({ ...state, lastName: event.target.value }));
};

export default page(class extends React.Component {
  render () {
    const application = this.props.application;
    return <section className='section'>
      <div className='columns'>
        <div className='column is-8 is-offset-2 has-text-centered'>
          <div className='title is-3'>My name is</div>
        </div>
      </div>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          {/* Desktop and tablet view */}
          <div className='columns is-mobile'>
            <div className='column' />
            <div style={{margin: '0.6em'}} className='column'>
              <input style={{ width: '14rem', textAlign: 'center' }} onChange={setFirstName} className='input title is-medium' type='text' placeholder='first name' value={application.firstName || ''} />
            </div>
            <div className='column' />
          </div>
          {/* Mobile view */}
          <div className='columns is-mobile'>
            <div className='column' />
            <div style={{margin: '0.6em'}} className='column'>
              <input style={{ width: '14rem', textAlign: 'center' }} onChange={setLastName} className='input title is-medium' type='text' placeholder='last name' value={application.lastName || ''} />
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
            <Link href='/quote/summary'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/checkout/profile/id'><button className='button is-primary' disabled={!application.firstName || application.firstName.length === 0 || !application.lastName || application.lastName.length === 0}>Next</button></Link>
          </div>
        </div>
      </section>
      <section className='section'>
        <Steps currentStep={0} />
      </section>
    </div>,
  datastores: { quote: quoteStore, application: applicationStore }
});
