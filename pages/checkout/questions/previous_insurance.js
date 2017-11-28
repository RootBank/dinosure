import page from '../../../components/page';
import applicationStore from '../../../datastores/application';
import Choice from '../../../components/choice';
import Router from 'next/router';
import Steps from '../../../components/checkout-steps';

const disqualified = () => Router.push({ pathname: '/do-not-qualify', query: { reason: 'previous_insurance' } });
const next = () => Router.push('/checkout/questions/hospitalised');

export default page(({ quote }) =>
  <section className='section'>
    <div className='columns has-text-centered'>
      <div className='column is-8 is-offset-2'>
        <h1>Question 2</h1>
      </div>
    </div>
    <Choice
      instructions='I have never applied for life insurance OR if I have, I have never been declined life insurance before, for any health or other reasons.'
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
