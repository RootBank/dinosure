import page from '../../../components/page';
import applicationStore from '../../../datastores/application';
import Choice from '../../../components/choice';
import Router from 'next/router';
import Steps from '../../../components/checkout-steps';

const disqualified = () => Router.push({ pathname: '/do-not-qualify', query: { reason: 'future_hospitalisation' } });
const next = () => Router.push('/checkout/payment/summary');

export default page(({ quote }) =>
  <section className='section'>
    <div className='columns has-text-centered'>
      <div className='column is-8 is-offset-2'>
        <h1>Question 4</h1>
      </div>
    </div>
    <Choice
      onLeft={disqualified} leftOption='No'
      onRight={next} rightOption='Yes'
      instructions='Other than childbirth or pregnancy, I am not planning on seeing any medical professional in the next 8 weeks.'
    />
  </section>,
  {
    footer: () =>
      <section className='section'>
        <Steps currentStep={1} />
      </section>,
    datastores: { application: applicationStore }
  }
);
