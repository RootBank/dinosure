import page from '../../../components/page';
import applicationStore from '../../../datastores/application';
import Choice from '../../../components/choice';
import Router from 'next/router';
import Steps from '../../../components/checkout-steps';

const disqualified = () => Router.push({ pathname: '/do-not-qualify', query: { reason: 'island' } });
const next = () => Router.push('/checkout/payment/summary');

export default page(({ quote }) =>
  <section className='section'>
    <Choice
      onLeft={disqualified} leftOption='Yes'
      onRight={next} rightOption='No'
      instructions='Do you ever plan on visiting Isla Nublar?'
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
