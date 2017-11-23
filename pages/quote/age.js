import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import Link from 'next/link';
import quoteStore from '../../datastores/quote';
import Router from 'next/router';

const isValidAge = (value) => value <= 120;
const setAge = (event) => {
  const value = Number((event.target.value + '').replace(/[^\d]/, ''));
  if (isValidAge(value)) {
    quoteStore.update(state => ({ ...state, age: value }));
  }
};

const next = (age) => () => {
  if (age >= 18 && age <= 63) {
    Router.push('/quote/education');
  } else {
    Router.push({ pathname: '/do-not-qualify', query: { reason: 'age' } });
  }
};

export default page(({ quote }) =>
  <section className='section'>
    <div className='columns'>
      <div className='column is-hidden-tablet' />
      <div className='column has-text-centered'>
        {/* Tablet and desktop view */}
        <div className='level is-hidden-mobile'>
          <div className='level-item content title is-3'>
              I am
          <div style={{ margin: '0.6em' }} className='control'>
            <input onChange={setAge} style={{ width: '3em', textAlign: 'center' }} className='input title is-3 is-medium' type='text' placeholder='age' value={quote.age || ''} />
          </div>
              years old
        </div>
        </div>
        {/* Mobile view */}
        <div className='is-hidden-desktop is-hidden-tablet'>
          <h3 className='title is-3'>I am</h3>
          <div className='level'>
            <div style={{ margin: '0.6em' }} className='control level-item'>
              <input onChange={setAge} style={{ width: '3em', textAlign: 'center' }} className='input title is-3 is-medium' type='text' placeholder='age' value={quote.age || ''} />
            </div>
          </div>
          <h3 className='title is-3'>years old</h3>
        </div>
      </div>
      <div className='column is-hidden-tablet' />
    </div>
  </section>,
  {
    footer: ({ quote }) => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link prefetch href='/quote/gender'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <button onClick={next(quote.age || '')} className='button is-primary' disabled={!quote.age}>Next</button>
          </div>
        </div>
      </section>
      <FormFooter step={3} of={6} />
    </div>,
    datastores: { quote: quoteStore }
  }
);
