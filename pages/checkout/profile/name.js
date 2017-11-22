// import FormFooter from '../../components/form-progress';
import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import quoteStore from '../../../datastores/quote';
import applicationStore from '../../../datastores/application';
import Steps from '../../../components/checkout-steps';

export default page(class extends React.Component {
  render () {
    return <div />;
  }
}, {
  footer: () =>
    <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/quote/gender'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/quote/education'><button className='button is-primary' disabled>Next</button></Link>
          </div>
        </div>
      </section>
      <section className='section'>
        <Steps currentStep={0} />
      </section>
    </div>,
  datastores: { quote: quoteStore, application: applicationStore }
});
