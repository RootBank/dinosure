import FormFooter from '../../components/form-footer';
import page from '../../components/page';
import Link from 'next/link';

export default page(() =>
  <section className='section'>
    <div className='columns'>
      <div className='column' />
      <div className='column level has-text-centered'>
        <div className='level-item content title is-3'>
            I make <div style={{margin: '0.6em'}} className='control'>
              <input style={{width: '3em', textAlign: 'center'}} className='input title is-3 is-medium' type='text' placeholder='age' />
            </div>
            per month
        </div>
      </div>
      <div className='column' />
    </div>
  </section>,
  {
    footer: () => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/quote/gender'><button className='button is-primary' disabled>Next</button></Link>
          </div>
        </div>
      </section>
      <FormFooter step={1} of={3} />
    </div>
  }
);
