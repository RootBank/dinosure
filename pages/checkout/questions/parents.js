import page from '../../../components/page';
import applicationStore from '../../../datastores/application';
import Choice from '../../../components/choice';
import Router from 'next/router';
import Steps from '../../../components/checkout-steps';

const disqualified = () => Router.push({ pathname: '/do-not-qualify', query: { reason: 'parents' } });
const next = () => Router.push('/checkout/questions/previous_insurance');

export default page(({ quote }) =>
  <section className='section'>
    <div className='container has-text-centered'>
      <h1 className='title is-5'>To keep premiums low, we ask that our clients answer the following 4 questions</h1>
    </div>
    <Choice
      instructions='I have children, I am pregnant or my partner is pregnant.'
      onLeft={next} leftOption='Yes'
      onRight={disqualified} rightOption='No'
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
