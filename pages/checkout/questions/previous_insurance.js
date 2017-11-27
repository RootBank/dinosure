import page from '../../../components/page';
import applicationStore from '../../../datastores/application';
import Choice from '../../../components/choice';
import Router from 'next/router';
import Steps from '../../../components/checkout-steps';

const disqualified = () => Router.push({ pathname: '/do-not-qualify', query: { reason: 'previous_insurance' } });
const next = () => Router.push('/checkout/questions/hospitalised');

export default page(({ quote }) =>
  <section className='section'>
    <Choice
      onLeft={disqualified} leftOption='No'
      onRight={next} rightOption='Yes'
      instructions='I have never applied for life insurance OR if I have, I have never been declined life insurance before, for any health or other reasons.'
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
