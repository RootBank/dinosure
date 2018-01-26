import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import Link from 'next/link';
import quoteStore from '../../datastores/quote';

const isValidIncome = (value) => value < 10000000;

const formatIncome = (income) => Number(income).toLocaleString().replace(/,/g, ' ');
const setIncome = (event) => {
  const value = Number(event.target.value.replace(/[^\d]/g, ''));
  if (isValidIncome(value)) {
    quoteStore.update(state => ({ ...state, income: value }));
  }
};

export default page(({ quote }) =>
  <section clßassName='section'>
    <div className='columns'>
      <div className='column is-hidden-tablet is-hidden-mobile' />
      <div className='column level has-text-centered'>
        {/* Desktop and tablet view */}
        <div className='is-hidden-mobile'><div className='level-item content title is-3'>
          I earn <div style={{ margin: '0.6em' }} className='control'>
            <input onChange={setIncome} style={{ width: '7em', textAlign: 'center' }} className='input title is-large' type='text' placeholder='income' value={quote.income ? `R ${formatIncome(quote.income)}` : ''} />
          </div>
          per month
        </div>
        </div>
        {/* Mobile view */}
        <div className='is-hidden-desktop is-hidden-tablet'>
          <h3 className='title is-3'>I earn</h3>
          <input onChange={setIncome} style={{ width: '7em', textAlign: 'center' }} className='input title is-large' type='text' placeholder='income' value={quote.income ? `R ${formatIncome(quote.income)}` : ''} />
          <h3 className='title is-3'>per month</h3>
        </div>
      </div>
      <div className='column is-hidden-tablet is-hidden-mobile' />
    </div>
  </section>,
{
  footer: ({ quote }) => <div>
    <section className='section'>
      <div className='level form-nav'>
        <div className='level-item'>
          <Link prefetch href='/quote/education'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
          <Link prefetch href='/quote/smoking'><button className='button is-primary' disabled={!quote.income || quote.income <= 1000}>Next</button></Link>
        </div>
      </div>
    </section>
    <FormFooter step={5} of={6} />
  </div>,
  datastores: { quote: quoteStore }
}
);
