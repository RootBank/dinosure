// import FormFooter from '../../components/form-progress';
import page from '../../components/page';
// import Link from 'next/link';
import React from 'react';
import quoteStore from '../../datastores/quote';
import applicationStore from '../../datastores/application';
import Steps from '../../components/checkout-steps';

export default page(class extends React.Component {
  render () {
    return <div />;
  }
}, {
  footer: () =>
    <section className='section'>
      <Steps currentStep={0} />
    </section>,
  datastores: { quote: quoteStore, application: applicationStore }
});
