import page from '../../../components/page';
import applicationStore from '../../../datastores/application';
import Choice from '../../../components/choice';
import Router from 'next/router';
import Steps from '../../../components/checkout-steps';

const disqualified = () => Router.push({ pathname: '/do-not-qualify', query: { reason: 'parents' } });
const next = () => Router.push('/checkout/questions/previous_insurance');

export default page(({ quote }) =>
  <section className='section has-text-centered'>
    <div className='container'>
      <div className='section'>
        <h1 className='title is-5'>The Hero community trusts us to keep their subscriptions as low as possible. These questions help us do it.</h1>
      </div>
    </div>
    <Choice
      onLeft={disqualified} leftOption='No'
      onRight={next} rightOption='Yes'
      instructions='I have children, I am pregnant or my partner is pregnant.'
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
