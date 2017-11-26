import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import Link from 'next/link';
import quoteStore from '../../datastores/quote';

const setLastname = (event) => {
  const value = event.target.value.replace(/[^\d]/g, '');
    quoteStore.update(state => ({ ...state, lastname: value }));
};

export default page(({ quote }) =>
  <section className='section'>
    <div className='columns'>
      <div className='column level is-10 is-offset-1 has-text-centered'>
        {/* Desktop and tablet view */}
        <div className='is-hidden-mobile level-item content'>
          <h3 className='title is-3'>My surname is</h3>
          <div style={{margin: '0.6em'}} className='control'>
            <input onChange={setLastname} style={{width: '7em', textAlign: 'center'}} className='input title is-large' type='text' placeholder='Ripper' value={quote.lastname} />
          </div>
        </div>
        {/* Mobile view */}
        <div className='is-hidden-desktop is-hidden-tablet'>
          <h3 className='title is-3'>My surname is</h3>
          <input onChange={setLastname} style={{width: '7em', textAlign: 'center'}} className='input title is-large' type='text' placeholder='Ripper' value={quote.lastname} />
        </div>
      </div>
    </div>
  </section>,
  {
    footer: ({quote}) => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link prefetch href='/quote/name'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link prefetch href='/quote/email'><button className='button is-primary' disabled={false}>Next</button></Link>
          </div>
        </div>
      </section>
      <FormFooter step={4} of={5} />
    </div>,
    datastores: { quote: quoteStore }
  }
);
