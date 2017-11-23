// import FormFooter from '../../components/form-progress';
import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import quoteStore from '../../../datastores/quote';
import applicationStore from '../../../datastores/application';
import Steps from '../../../components/checkout-steps';

const isPotentiallyValidIdNumber = (id) => {};
const isValidIdNumber = (id) => {};

const setIdNumber = (event) => {
  applicationStore.update(state => ({ ...state, id: event.target.value }));
};

export default page(class extends React.Component {
  render () {
    const application = this.props.application;
    return <section className='section'>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <div display className='title is-3'>My <img alt='South Africa' style={{height: '0.8em', marginTop: '0.5em', display: 'inline-block'}} src='/static/za-flag.svg' /> Id Number is</div>
          <div className='columns is-mobile'>
            <div className='column' />
            <div style={{margin: '0.6em'}} className='column'>
              <input style={{ width: '13rem', textAlign: 'center' }} onChange={setIdNumber} className='input title column is-large' type='text' placeholder='ID Number' value={application.id || ''} />
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
            <Link href='/checkout/profile/name'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/checkout/profile/email'><button className='button is-primary' disabled={!application.firstName || application.firstName.length === 0 || !application.lastName || application.lastName.length === 0}>Next</button></Link>
          </div>
        </div>
      </section>
      <section className='section'>
        <Steps currentStep={0} />
      </section>
    </div>,
  datastores: { quote: quoteStore, application: applicationStore }
});
