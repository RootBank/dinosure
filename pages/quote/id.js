import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import Link from 'next/link';
import quoteStore from '../../datastores/quote';

const setId = (event) => {
  //rewrite this to extract gender, age, etc from Id number

  const value = event.target.value;
  console.log(value);
  quoteStore.update(state => ({ ...state, Id: value }));
};

export default page(({ quote }) =>
  <section className='section'>
    <div className='columns'>
      <div className='column is-10 is-offset-1 has-text-centered'>
        {/* Tablet and desktop view */}
        <div className='level is-hidden-mobile'>
          <div className='level-item content title is-3'>My ID is
          <div style={{ margin: '0.6em' }} className='control'>
            <input onChange={setId} style={{ width: '10em', textAlign: 'center' }} className='input title is-medium' type='text' placeholder='South African ID' value={quote.id || ''} />
          </div>
        </div>
        </div>
        {/* Mobile view */}
        <div className='is-hidden-desktop is-hidden-tablet'>
          <h3 className='title is-3'>My ID is</h3>
          <div className='level'>
            <div style={{ margin: '0.6em' }} className='control level-item'>
              <input onChange={setId} style={{ width: '3em', textAlign: 'center' }} className='input title is-7 is-medium' type='text' placeholder='South African ID' value={quote.id || ''} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>,
  {
    footer: ({ quote }) => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link prefetch href='/quote/underwriting'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link prefetch href='/quote/name'><button className='button is-primary' disabled={false}>Next</button></Link>
          </div>
        </div>
      </section>
      <FormFooter step={2} of={5} />
    </div>,
    datastores: { quote: quoteStore }
  }
);
