import FormFooter from '../../components/form-footer';
import page from '../../components/page';
import Link from 'next/link';
import quoteStore from '../../datastores/quote';

const updateSumAssured = (event) => {
  quoteStore.update(state => ({ ...state, sumAssured: event.target.value }));
};

export default page(({ quote }) =>
  <section className='section'>
    <div className='container content'>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <h3 className='title is-h3'>R {Number(quote.sumAssured || 5000000).toLocaleString().replace(/,/g, ' ')}</h3>
          <input onChange={updateSumAssured} className='slider is-fullwidth is-info' step='500000' min='500000' max='10000000' value={quote.sumAssured || 5000000} type='range' />
          <h5 className='subtitle is-h5'>sum assured</h5>
          <p className='has-text-centered'>
            Please select the sum that will be paid out should your life be terminated by dinosaur.
          </p>
        </div>
        <div className='column' />
      </div>
    </div>
  </section>,
  {
    footer: () => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/quote'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/quote/gender'><button className='button is-primary'>Next</button></Link>
          </div>
        </div>
      </section>
      <FormFooter step={1} of={6} />
    </div>,
    datastores: { quote: quoteStore }
  }
);
