import FormFooter from '../../components/form-footer';
import page from '../../components/page';
import Link from 'next/link';

export default page(() =>
  <section className='section'>
    <div className='columns'>
      <div className='column is-hidden-tablet' />
      <div className='column has-text-centered'>
        <div className='level is-hidden-mobile'>
          <div className='level-item content title is-3'>
              I am
          <div style={{ margin: '0.6em' }} className='control'>
            <input style={{ width: '3em', textAlign: 'center' }} className='input title is-3 is-medium' type='text' placeholder='age' />
          </div>
              years old
        </div>
        </div>
        <div className='is-hidden-desktop'>
          <h3 className='title is-3'>I am</h3>
          <div className='level'>
            <div style={{ margin: '0.6em' }} className='control level-item'>
              <input style={{ width: '3em', textAlign: 'center' }} className='input title is-3 is-medium' type='text' placeholder='age' />
            </div>
          </div>
          <h3 className='title is-3'>years old</h3>
        </div>
      </div>
      <div className='column is-hidden-tablet' />
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
