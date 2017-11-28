import page from '../../../components/page';
import applicationStore from '../../../datastores/application';
import Choice from '../../../components/choice';
import Router from 'next/router';
import Steps from '../../../components/checkout-steps';

const disqualified = () => Router.push({ pathname: '/do-not-qualify', query: { reason: 'hospitalised' } });
const next = () => Router.push('/checkout/questions/future_hospitalisation');

export default page(({ quote }) =>
  <section className='section'>
    <div className='columns has-text-centered'>
      <div className='column is-8 is-offset-2'>
        <h1>Question 3</h1>
      </div>
    </div>
    <Choice
      instructions="In the last 5 years, I haven't been hospitalised for more than 2 days, I haven't taken any medicine for a period longer than 2 weeks and I haven't seen any medical specialist except for my pregnancy."
      onLeft={disqualified} leftOption='No'
      onRight={next} rightOption='Yes'
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
